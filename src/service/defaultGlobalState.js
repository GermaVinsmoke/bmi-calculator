import React from "react";
import ReactDOM from "react-dom";
import {getGlobal, setGlobal} from "reactn";
import {App} from "../index";

export const state = () => {
    // initial global  state
    // for later use, this can be extended
    // also, to see state at any time, console.log(getGlobal(state))
    let state =
        {
            "state":
                {
                    // default global state values here
                    //"token": null,
                }
        };
    // to access global json state, example:
    // getGlobal("state").token
    return (state |> setGlobal(state)).then(r => {});
};

ReactDOM.render(
    <App state={getGlobal(state)} />,
    document.getElementById("root")
);