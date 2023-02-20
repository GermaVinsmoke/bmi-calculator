import React from 'react';
import './App.css';
import styled from '@emotion/styled/macro';
import {library} from '@fortawesome/fontawesome-svg-core';
import {faEye, faEyeSlash} from '@fortawesome/free-solid-svg-icons';
import {getGlobal} from "reactn";
import {getAuthToken} from "./service/requests";

library.add(faEye, faEyeSlash);

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 650px;
  position:fixed;
  top:0;
  bottom:0;
  left:0;
  right:0;
`;

// Generic function to take form data and encode it for requests
export const urlEncodeData = (data) => {
    let urlEncodedData = '',
        urlEncodedDataPairs = [];

    for (let input of data) {
        urlEncodedDataPairs.push(encodeURIComponent(input.key) + '=' + encodeURIComponent(input.value));
    }

    // Combine the pairs into a single string and replace all %-encoded spaces to
    // the '+' character; matches the behavior of browser form submissions.
    urlEncodedData = urlEncodedDataPairs.join('&').replace(/%20/g, '+');

    return urlEncodedData;
};

export const AutoOnboard = () => {
    const baseURL = getGlobal('host');
    let authToken = null;
    let oemList = [];
    let loading = false;
    let data = [];
    let userID = "";
    const requiredFields = [
        'oec_id',
        'dealer_code',
        'dealer_name',
        'address',
        //'phone_number',
        //'contact_name',
        //'contact_email',
        'city',
        'state',
        'zip',
        'oem'
    ];

// retrieve the data from the form and bundle it into an easily readable
// and accessible array of objects.
    const collectData = () => {
        data = [];
        const inputs = document.querySelectorAll('#onboardingForm input');

        let requireErrors = [];

        for (const input of inputs) {
            // need to check if the input value has a name property because of the select search box
            if (input.hasAttribute('name')) {
                let name = input.getAttribute('name');

                // determine if the field in question is a required field then hide any existing errors. If it
                // doesn't have any data then it to the list of fields that need an error message
                if (requiredFields.includes(name)) {
                    if (name === 'oem') {
                        document.getElementById('oemSearch').classList.remove('is-invalid');
                    } else {
                        input.classList.remove('is-invalid');
                    }
                    let errorId = name + '_error';
                    document.getElementById(errorId).classList.add('hidden');

                    if (input.value === '') {
                        requireErrors.push(name);
                    }
                }

                data.push({key: name, value: input.value});
            }
        }
        data.push({key: 'username', value: document.getElementById('username').value});
        data.push({key: 'user_id', value: userID});

        if (requireErrors.length > 0) {
            displayRequireErrors(requireErrors);
            data = [];
        }
    }

// take the list of fields that don't have data and make the "required" errors appear
    const displayRequireErrors = fields => {
        for (const field of fields) {
            let input;
            let errorId;

            if (field === 'oem') {
                input = document.getElementById('oemSearch');
                errorId = 'oem_error';
            } else {
                input = document.getElementById(field);
                errorId = input.getAttribute('name') + '_error';
            }

            input.classList.add('is-invalid');
            document.getElementById(errorId).classList.remove('hidden');
        }
    }



// GET request --- get oem list to populate oem dropdown
    async function getOemList() {
        let url = baseURL + '/api/GetData/list_oem';
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + authToken
            }
        })

        let json = await response.json();
        oemList = json.data;
    }

// function called on page load, retrieve the authorization token for later use and the
// list of oems to populate the dropdown
    async function getInitialData() {
        //setloading();
        //await getAuthToken()
        await getOemList();
        populateOemResults();
        //setloading();
    }

// disable inputs while data is loading
    const setloading = () => {
        loading = !loading;
        let inputs = document.querySelectorAll('input');
        for (let input of inputs) {
            input.disabled = loading;
        }

        let buttons = document.querySelectorAll('button');
        for (let btn of buttons) {
            btn.disabled = loading;
        }
    }

// take the list of oems and populate the search list with them
    const populateOemResults = () => {
        const oemResults = document.getElementById('oemResults');
        for (let i = 0; i < oemList.length; i++) {
            let dealer = document.createElement('p');
            let value = oemList[i].oem.trim().toLowerCase();
            dealer.setAttribute('data-value', value);
            dealer.innerHTML = oemList[i].oem;
            dealer.addEventListener('click', event => { selectOem(event); });
            oemResults.appendChild(dealer);
        }

        // set the width of the oemResults list to the width of the search bar
        const oemSearch = document.getElementById('oemSearch');
        const oemSearchStyle = window.getComputedStyle(oemSearch);
        oemResults.style.width = oemSearchStyle.getPropertyValue('width');
    }

// display selected oem in the search bar, add the value of selected oem to the hidden input
    const selectOem = event => {
        let selectedOem = document.getElementById('oemSelectedValue');
        let oemSearch = document.getElementById('oemSearch');
        selectedOem.value = event.target.dataset.value;
        oemSearch.value = event.target.innerHTML;
    }

// POST request --- check if similar dealerships exist
    async function checkExistingDealership() {
        // hide the suggested dealer list & remove dealers from it
        document.getElementById('dealershipListTitle').style.display = 'none';
        let dealershipList = document.getElementById('dealershipList');
        dealershipList.style.display = 'none';
        while (dealershipList.firstChild) {
            dealershipList.removeChild(dealershipList.firstChild);
        }

        // collect the data, encode it and send it
        collectData();

        // if all the data is present
        if (data.length > 0) {
            // disable input fields
            //setloading();
            let urlEncodedData = urlEncodeData(data);

            let url = baseURL + '/api/GetData/check_existing_dealership';

            const response = await fetch(url, {
                method: 'POST',
                body: urlEncodedData,
                headers: {
                    'Authorization': 'Bearer ' + authToken,
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            });

            let json = await response.json();
            // setloading();

            // If dealers came back from the api, suggest them in the list.
            if (json.data.length > 0) {
                createSuggestedDealersList(json.data);
                document.getElementById('submit').style.display = "none";
                document.getElementById('createDealer').style.display = "inline-block";
            }
            else {
                document.getElementById('submit').style.display = "none";
                document.getElementById('createDealer').style.display = "inline-block";
                document.getElementById('noMatches').style.display = "inline-block";
                //createDealer();
            }
        }
    }

// Create the table containing the list of similar dealers
    const createSuggestedDealersList = data => {
        document.getElementById('dealershipListTitle').style.display = 'block';
        let dealershipList = document.getElementById('dealershipList');
        dealershipList.style.display = "block";

        addHeaders();
        let body = addBody();
        for (const dealer of data) {
            addRow(dealer, body);
        }
    }

// Adding the body element to the table
    const addBody = () => {
        let table = document.getElementById('dealershipList');
        return table.createTBody();
    }

// Adding the headers to the table
    const addHeaders = () => {
        const headers = [
            'OEC ID',
            'Dealer Code',
            'Summit Code',
            'Dealer Name',
            'Phone Number',
            'Contact Name',
            'Contact Email',
            'Address',
            'City',
            'State',
            'Zip'
        ];

        let table = document.getElementById('dealershipList');
        let tableHeader = table.createTHead();
        let headerRow = tableHeader.insertRow(0);

        for (let i = 0; i < headers.length; i++) {
            let cell = headerRow.insertCell(i);
            cell.innerHTML = headers[i];
        }
    }

// Create table rows
    const addRow = (dealer, body) => {
        let row = body.insertRow(0);

        const fields = [
            dealer.oec_id,
            dealer.dealer_code,
            dealer.summit_code,
            dealer.dealership_name,
            dealer.phone_number,
            dealer.contact_name,
            dealer.contact_email,
            dealer.address,
            dealer.dealer_city,
            dealer.dealer_state,
            dealer.zip
        ];

        for (let i = 0; i < fields.length; i++) {
            let cell = row.insertCell(i);
            cell.innerHTML = fields[i];
        }
    }

// POST request --- send the form data
    async function createDealer() {
        collectData();
        ////setloading();

        let urlEncodedData = urlEncodeData(data);

        let url = baseURL + '/api/GetData/add_dealership';
        const response = await fetch(url, {
            method: 'POST',
            body: urlEncodedData,
            headers: {
                'Authorization': 'Bearer ' + authToken,
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });

        let json = await response.json();

        if (json.status === true) {
            alert('Dealer with Summit ID ' + json.data.summit_code + ' created!');
            clearFields();
        } else {
            alert('An Error Occurred');
        }

        //setloading();
    }

// called by the Cancel button, get all input fields and remove their values,
// effectively wiping the form clean.
    const clearFields = () => {
        const inputs = document.querySelectorAll('#onboardingForm input');

        for (let input of inputs) {
            if (input.type !== 'checkbox') {
                input.value = '';
                const name = input.getAttribute('name');
                if (requiredFields.includes(name)) {
                    if (name === 'oem') {
                        document.getElementById('oemSearch').classList.remove('is-invalid');
                    } else {
                        input.classList.remove('is-invalid');
                    }

                    let errorId = name + '_error';
                    document.getElementById(errorId).classList.add('hidden');
                }
            } else {
                input.value = 0;
                input.checked = false;
            }
            if (loading) {
                //setloading();
            }
        }

        document.getElementById('submit').style.display = 'inline-block';
        document.getElementById('createDealer').style.display = 'none';
        document.getElementById('noMatches').style.display = "none";
        document.getElementById('dealershipListTitle').style.display = 'none';
        document.getElementById('dealershipList').style.display = 'none';
        document.querySelector('#dealershipList thead').remove();
        document.querySelector('#dealershipList tbody').remove();
    }

// function created to be able to pass a custom parameter to the searchForOems filter
    const oemSearchHelper = searchValue => {
        return function(object) {
            let oem = object.oem.trim().toLowerCase();
            return oem.includes(searchValue);
        }
    }

// called by the 'input' event listener, this takes user input from the oemSearch element,
// compares it to the oemList and changes what's visible in the oemResults div based on it
    const searchForOems = searchValue => {
        let filteredList = [];
        let searchString = searchValue.trim().toLowerCase();
        let filteredOems = oemList.filter(oemSearchHelper(searchString));

        for (const oemObject of filteredOems) {
            let value = oemObject.oem.trim().toLowerCase();
            filteredList.push(value);
        }

        const individualOemResults = document.querySelectorAll('#oemResults p');
        for (let result of individualOemResults) {
            if (filteredList.includes(result.dataset.value)) {
                result.style.display = 'block';
            } else {
                result.style.display = 'none';
            }
        }
    }

// add the event listeners to the search select box, made a separate function for it
// so that I wouldn't have to select elements a bunch of times.
    const addOemSearchListeners = () => {
        let oemSearch = document.getElementById('oemSearch');
        let oemResults = document.getElementById('oemResults');

        // when you click on the search box, show the list of oems & apply the filter
        oemSearch.addEventListener('focus', event => {
            oemResults.style.display = 'block';
            searchForOems(event.target.value);
        });

        // as you type in the search box, apply the filter
        oemSearch.addEventListener('input', event => {
            searchForOems(event.target.value);
        });

        // this one was kind of weird, the page seems to register the blur event first which would
        // hide the oem list before the click event on the option could happen. needed to set
        // the blur event on a short timer to give the browser time to process the option click event
        oemSearch.addEventListener('blur', event => {
            setTimeout(() => {
                oemResults.style.display = 'none';

                const individualOemResults = document.querySelectorAll('#oemResults p');
                for (let result of individualOemResults) {
                    result.style.display = 'block'
                }
            }, 100)
        });
    }

// Call GET request for oem-list
    async function getData () {
        await getInitialData();
        addOemSearchListeners();

        let checkboxes = document.querySelectorAll('[type="checkbox"]');
        for (let checkbox of checkboxes) {
            checkbox.addEventListener('click', event => {
                event.target.value = event.target.value === "1" ? "0" : "1";
            });
        }
    }

    async function login() {
        await getAuthToken();
        if (authToken === undefined) {
            alert("Authentication failed");
            document.getElementById("formContainer").style.display = "none";
        } else {
            alert("Logged in successfully");
            await getData();
            document.getElementById("formContainer").style.display = "block";
            document.getElementById("login-div").style.display = "none";
            document.getElementById("logout-div").style.display = "block";
        }
    }

    function logout () {
        authToken = '';
        document.getElementById("formContainer").style.display = "none";
        document.getElementById("logout-div").style.display = "none";
        document.getElementById("login-div").style.display = "block";
    }
    /*
    // event listeners
    */

    document.addEventListener('DOMContentLoaded', event => {
        document.getElementById("logout-div").style.display = "none";
    });

    document.getElementById('login-button').addEventListener('click', event => {
        login().then(r => {});
    });

    document.getElementById('logout-button').addEventListener('click', event => {
        logout();
        clearFields();
        alert("Logged out");
    });

// when the submit button is clicked, check if dealerships with the input data
// already exist
    document.getElementById('submit').addEventListener('click', event => {
        checkExistingDealership().then(r => {});
    });

// when the cancel button is clicked, remove values from all input fields
    document.getElementById('cancel').addEventListener('click', event => {
        clearFields();
    });

    document.getElementById('createDealer').addEventListener('click', event => {
        createDealer().then(r => {});
    });
}
export default urlEncodeData;