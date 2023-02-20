import React from "react";
import {Container} from "../AutoOnboard";
import {AppHubApps} from "../components/AppHub/AppHubApps";
export const AppHub = () => {
    return <Container>
        <AppHubApps
            applications={"PSXLink"}
        ></AppHubApps>
    </Container>;
};

