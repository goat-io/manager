import React, { Fragment } from "react";
import { Route } from "react-router-dom";

// DASHBOARDS

import BasicDashboard from "./Basic/";

// Layout

import AppHeader from "../../../layout/Header";
import AppSidebar from "../../../layout/SideBar";
import AppFooter from "../../../layout/Footer";

const Dashboards = ({ match }) => (
  <Fragment>
    <AppHeader />
    <div className="app-main">
      <AppSidebar />
      <div className="app-main__outer">
        <div className="app-main__inner">
          <Route path={`${match.url}/basic`} component={BasicDashboard} />
        </div>
        <AppFooter />
      </div>
    </div>
  </Fragment>
);

export default Dashboards;
