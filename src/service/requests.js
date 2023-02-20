import unfetch from 'unfetch';
import {Switch, Route, Link, useRoute, Router} from "wouter";
import {getGlobal, setGlobal} from "reactn";
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
async function getAuthToken() {
    let username = document.getElementById('username').value;
    let password = document.getElementById('password').value;
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
    const authToken = setGlobal("authToken", json.token).then(r => {});;
    const user_id = setGlobal("userID", json.user_id).then(r => {});
}

