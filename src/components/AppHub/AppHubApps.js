import React from "react";
import {Route, Router} from "wouter";
import {PSXLink} from "../../containers/PSXLink";
import {Container} from "../../AutoOnboard";

export const AppHubApps = () => {
        return <Container>
            <h3>Applications for Admin Control:</h3><br/>
            <button onClick={
                <Router>
                    <Route path="/PSXLink" container={PSXLink}/>
                </Router>}
                    type="button" className="btn btn-primary btn-lg">PSXLink Auto Onboard
            </button>
        </Container>;
}
