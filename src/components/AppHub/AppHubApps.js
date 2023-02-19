import React from "react";
import {Route, Router} from "wouter";
import {PSXLink} from "../../containers/PSXLink";
const AppHubApps = () => {

    return (
        <>
            <h3>Applications for Admin Control:</h3><br/>
            <button onClick={<Router>
                <Route path="/PSXLink" container={PSXLink}/>
            </Router>} type="button" className="btn btn-primary btn-lg">{props.applications[0]}</button>
        </>
    );
};
export default AppHubApps;

export class AppHubApps {
}