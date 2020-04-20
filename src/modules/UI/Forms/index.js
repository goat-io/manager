import React, {Fragment} from 'react';
import {Route} from 'react-router-dom';

// Forms

import FormElementsLayouts from "./Elements/Layouts";
import FormElementsControls from "./Elements/Controls";
import FormElementsValidation from "./Elements/Validation";

// Layout

import AppHeader from '../../../layout/Header';
import AppSidebar from '../../../layout/SideBar';
import AppFooter from '../../../layout/Footer';

const Forms = ({match}) => (
    <Fragment>
        <AppHeader/>
        <div className="app-main">
            <AppSidebar/>
            <div className="app-main__outer">
                <div className="app-main__inner">

                    {/* Form Elements */}

                    <Route path={`${match.url}/controls`} component={FormElementsControls}/>
                    <Route path={`${match.url}/layouts`} component={FormElementsLayouts}/>
                    <Route path={`${match.url}/validation`} component={FormElementsValidation}/>

                </div>
                <AppFooter/>
            </div>
        </div>
    </Fragment>
);

export default Forms;