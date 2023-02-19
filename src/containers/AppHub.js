import React from "react";
import {AppHubApps} from "src/components/AppHub/AppHubApps";
import {Container} from "../App";
const AppHub = () => {
    return (
        <Container>
            <AppHubApps
                applications={"PSXLink"}
            />
        </Container>
    );
};
export default AppHub;

export class AppHub {
}