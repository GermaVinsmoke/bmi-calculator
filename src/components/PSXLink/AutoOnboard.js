import React from "react";
import "../../AutoOnboard";
import "../../App.css";
import {Container} from "../../AutoOnboard";

export const AutoOnboard = () => {
    return <Container>
        <body>
            <div className="container">
                <div className="inner-container">
                    <div id="login-box">
                        <div id="login-div">
                            <br>
                                <label>Please log in:</label><br/>
                                <input id="username" name="username" type="text" className="form-control text-input"
                                       placeholder="Email/Username" aria-label="username"
                                       aria-describedby="button-addon2"
                                       value=""/>
                                <input id="password" name="password" type="password"
                                       className="form-control text-input"
                                       placeholder="Password" aria-label="password"
                                       aria-describedby="button-addon2"
                                       value="">
                                    <button id="login-button" className="btn btn-primary">Login</button>
                                    <br>
                                        <label id="wrong-creds"/>
                                    </br>
                                </input>
                            </br>
                        </div>
                        <div id="logout-div">
                            <label>You are logged in</label><br>
                            <button id="logout-button" className="btn btn-primary">Logout</button>
                        </br>
                        </div>
                    </div>
                    <div className="logo" style="text-align: center; padding-bottom: 20px"><img
                        src="images/psxlink_ao.jpg"
                        alt="PSXLink Automated Onboarding"
                        style="height: 200px;"/>
                    </div>
                    <div id="formContainer" style="display: none">
                        <form id="onboardingForm" method="POST">
                            <div className="row">
                                <div className="col-md-6">
                                    <fieldset className="bottom-pad bottom-margin">
                                        <legend> Basic Dealer Information</legend>
                                        <div className="input-group mb-3">
                                            <input id="oec_id" name="oec_id" type="text"
                                                   className="form-control text-input"
                                                   placeholder="OEC ID ex. 123-456-789" aria-label="OEC ID"
                                                   aria-describedby="button-addon2" value=""/>
                                            <div id="oec_id_error" className="invalid-feedback hidden">Please
                                                fill out
                                                this field
                                            </div>
                                            <input id="dealer_code" name="dealer_code" type="text"
                                                   className="form-control text-input" placeholder="Dealer Code"
                                                   aria-label="Dealer Code" aria-describedby="button-addon2"
                                                   value=""/>
                                            <div id="dealer_code_error"
                                                 className="invalid-feedback hidden">Please
                                                fill out this field
                                            </div>
                                            <input id="dealer_name" name="dealer_name" type="text"
                                                   className="form-control text-input"
                                                   placeholder="Dealer Name"
                                                   aria-label="Dealer Name" aria-describedby="button-addon2"
                                                   value=""/>
                                            <div id="dealer_name_error"
                                                 className="invalid-feedback hidden">Please fill out
                                                this field
                                            </div>
                                            <input id="phone_number" name="phone_number" type="text"
                                                   className="form-control text-input"
                                                   placeholder="Phone Number" aria-label="Phone Number"
                                                   aria-describedby="button-addon2" value=""/>
                                            <div id="phone_number_error"
                                                 className="invalid-feedback hidden">Please fill out
                                                this
                                                field
                                            </div>
                                            <input id="contact_name" name="contact_name" type="text"
                                                   className="form-control text-input"
                                                   placeholder="Contact Name"
                                                   aria-label="Contact Name"
                                                   aria-describedby="button-addon2" value=""/>
                                            <div id="contact_name_error"
                                                 className="invalid-feedback hidden">Please fill
                                                out
                                                this field
                                            </div>
                                            <input id="contact_email" name="contact_email"
                                                   type="text"
                                                   className="form-control text-input"
                                                   placeholder="Contact Email"
                                                   aria-label="Contact Email"
                                                   aria-describedby="button-addon2" value=""/>
                                            <div id="contact_email_error"
                                                 className="invalid-feedback hidden">Please
                                                fill out
                                                this field
                                            </div>
                                            <input id="address" name="address" type="text"
                                                   className="form-control text-input"
                                                   placeholder="Address"
                                                   aria-label="Address"
                                                   aria-describedby="button-addon2"
                                                   value=""/>
                                            <div id="address_error"
                                                 className="invalid-feedback hidden">Please
                                                fill
                                                out this field
                                            </div>
                                            <input id="city" name="city" type="text"
                                                   className="form-control text-input"
                                                   placeholder="City" aria-label="City"
                                                   aria-describedby="button-addon2"
                                                   value=""/>
                                            <div id="city_error"
                                                 className="invalid-feedback hidden">Please
                                                fill out this field
                                            </div>
                                            <input id="state" name="state"
                                                   type="text"
                                                   className="form-control text-input"
                                                   placeholder="State"
                                                   aria-label="State"
                                                   aria-describedby="button-addon2"
                                                   value=""/>
                                            <div id="state_error"
                                                 className="invalid-feedback hidden">Please
                                                fill out this field
                                            </div>
                                        </div>
                                        <div id="searchSelect">
                                            <input id="oemSearch" placeholder="OEM Search..."
                                                   className="form-control"> <i
                                            className="fa fa-solid fa-sort-down"></i>
                                            <div id="oem_error" className="invalid-feedback hidden">Please
                                                select an
                                                OEM
                                            </div>
                                            <div id="oemResults">
                                                <input id="oemSelectedValue" name="oem" hidden></input>
                                            </div></input>
                                        </div>
                                        <div className="input-group-append top-pad align-right">
                                            <button id="submit" className="btn btn-info" type="button">Create
                                            </button>
                                            <button id="createDealer" className="btn btn-info" type="button">Confirm
                                                &
                                                Create
                                            </button>
                                        </div>
                                        <div className="input-group-append top-pad align-left">
                                            <button id="cancel" className="btn btn-danger" type="button">Cancel
                                            </button>
                                        </div>
                                    </fieldset>

                                    <fieldset>
                                        <legend> PSXLink Options</legend>
                                        <legend> Preferences</legend>
                                        <div className="checkbox checkbox-first">
                                            <input name="gst_dealer" id="checkbox0" type="checkbox" value={0}/>
                                            <label htmlFor="checkbox0"> GST Dealer </label>
                                        </div>
                                        <div className="checkbox">
                                            <input name="retail_override" id="checkbox1" type="checkbox" value={0}/>
                                            <label htmlFor="checkbox1"> Retail Override </label>
                                        </div>
                                        <div className="checkbox checkbox-primary">
                                            <input name="transaction_switch" id="checkbox2" type="checkbox" value={0}/>
                                            <label htmlFor="checkbox2"> Transaction Switch </label>
                                        </div>
                                        <legend> Products</legend>
                                        <div className="checkbox checkbox-success">
                                            <input name="repair_link" id="checkbox3" type="checkbox" value={0}/>
                                            <label htmlFor="checkbox3"> RepairLink </label>
                                        </div>
                                        <div className="checkbox checkbox-info">
                                            <input name="collision_link" id="checkbox4" type="checkbox" value={0}/>
                                            <label htmlFor="checkbox4"> CollisionLink </label>
                                        </div>
                                        <div className="checkbox checkbox-warning">
                                            <input name="marketing" id="checkbox5" type="checkbox" value={0}/>
                                            <label htmlFor="checkbox5"> Digital Marketing </label>
                                        </div>
                                        <div className="checkbox checkbox-danger">
                                            <input name="b2b_crm" id="checkbox6" type="checkbox" value={0}/>
                                            <label htmlFor="checkbox6"> B2B CRM Opportunities </label>
                                        </div>
                                    </fieldset>
                                </div>
                            </div>
                            <div>
                                <h7 id="dealershipListTitle">One or more dealerships similar to this one already
                                    exist:
                                </h7>
                                <h7 id="noMatches">No current Dealerships match the above data.</h7>
                                <table id="dealershipList" className="bottom-margin"></table>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </body>
    </Container>
};

