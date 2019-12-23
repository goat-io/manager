import React, { Fragment } from "react";
import { Route } from "react-router-dom";

// Charts

import ChartsChartJs from "./ChartJs/";

// Layout

import AppHeader from "../../../layout/Header";
import AppSidebar from "../../../layout/SideBar";
import AppFooter from "../../../layout/Footer";

const Charts = ({ match }) => (
  <Fragment>
    <AppHeader />
    <div className="app-main">
      <AppSidebar />
      <div className="app-main__outer">
        <div className="app-main__inner">
          {/* Charts */}

          <Route path={`${match.url}/chartjs`} component={ChartsChartJs} />
        </div>
        <AppFooter />
      </div>
    </div>
  </Fragment>
);

export default Charts;
