import React, { Fragment } from "react";
import { Route } from "react-router-dom";

// Dashboard Widgets

import WidgetsChartBoxes from "./ChartBoxes/";

// Layout
import AppHeader from "../../../layout/Header";
import AppSidebar from "../../../layout/SideBar";
import AppFooter from "../../../layout/Footer";

const Widgets = ({ match }) => (
  <Fragment>
    <AppHeader />
    <div className="app-main">
      <AppSidebar />
      <div className="app-main__outer">
        <div className="app-main__inner">
          {/* Widgets */}

          <Route
            path={`${match.url}/dashboard-boxes`}
            component={WidgetsChartBoxes}
          />
        </div>
        <AppFooter />
      </div>
    </div>
  </Fragment>
);

export default Widgets;
