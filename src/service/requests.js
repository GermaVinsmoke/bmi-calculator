import unfetch from 'unfetch';
import {Switch, Route, Link, useRoute, Router} from "wouter";
import {getGlobal, setGlobal} from "reactn";
import urlEncodeData from "../AutoOnboard";

export async function authenticate (email, password)
{
    let response = await unfetch('/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({email, password})
    });
    let data = response.json();
    if (response.status === 200) {

        return data;
    }
    else {
        throw new Error(response.statusText)
    }
}
// Retrieve the authorization token for later use
export async function getAuthToken() {
    let username = document.getElementById('username').value;
    let password = document.getElementById('password').value;
    // TODO make dynamic
    let baseURL = "localhost:3000";
    let url = baseURL + '/api/GetData/get_token';
    let data = [
        {key: 'username', value: username},
        {key: 'password', value: password}
    ]

    let urlEncodedData = urlEncodeData(data);

    const response = await fetch(url, {
        method: 'POST',
        body: urlEncodedData,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    });

    let json = await response.json();
    setGlobal("authToken", json.token).then(r => {});
    setGlobal("userID", json.user_id).then(r => {});
}


export default getAuthToken();

