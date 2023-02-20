import {React} from 'react';
import './App.css';
import ReactDOM, {render} from "react-dom";
import {BrowserRouter, Route} from "react-router-dom";
import {Login} from "./containers/Login";
import {AppHub} from "./containers/AppHub";
import {PSXLink} from "./containers/PSXLink";
import {getGlobal, setGlobal} from "reactn";
import {state} from "./service/defaultGlobalState";

export const App = () => {

    return(
            <BrowserRouter>
                <div id="browserRouter">
                    <Route exact path="/" container={<Login state={getGlobal(state)}/>} key="Login" />
                    <Route exact path="/AppHub" container={AppHub} key="AppHub" />
                    <Route exact path="/PSXLink/AutoOnboard" container={PSXLink} key="PSXLink" />
                </div>
            </BrowserRouter>
    );
};

//mount app
ReactDOM.render(
    document.getElementById("root"),
    <App/>
);





