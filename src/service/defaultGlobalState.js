import React from "react";
import {getGlobal, setGlobal} from "reactn";

export const initializeGlobalState = () => {
    // initial global  state
    // for later use, this can be extended
    // also, to see state at any time, console.log(getGlobal())
    let state =
                {
                    // default global state values here
                    //"token": null,
                    "localhost":"localhost:3000",
                    "development": "devstep1.psxcellerator.com",
                    "production": "step1.psxcellerator.com",
                };
    // to access global json state, example:
    // getGlobal().token
    return (setGlobal(state));
}
let state;
export default state = getGlobal();
