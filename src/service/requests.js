import unfetch from 'unfetch';
import AppHub from "../containers/AppHub";
import {Switch, Route, Link, useRoute, Router} from "wouter";

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

export const login = () => {

};

export async function updateState(response) {
    const data = await response.json();
    if (response.status === 200) GlobalUpdate.setNewestState(data);
    else {
        throw new Error(data.error)
    }
}

