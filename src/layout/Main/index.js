/*eslint-disable */
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import React, { Suspense, lazy, Fragment } from "react";
import { ToastContainer } from "react-toastify";

const Dashboards = lazy(() => import("../../modules/UI/Dashboards"));
const Widgets = lazy(() => import("../../modules/UI/Widgets"));
const Elements = lazy(() => import("../../modules/UI/Elements"));
const Components = lazy(() => import("../../modules/UI/Components"));
const Charts = lazy(() => import("../../modules/UI/Charts"));
const Forms = lazy(() => import("../../modules/UI/Forms"));
const Tables = lazy(() => import("../../modules/UI/Tables"));
const ResourceBuilder = lazy(() => import("../../modules/Forms"));
const Authentication = lazy(() => import("../../modules/Auth/Auth"));
const Environment = lazy(() => import("../../modules/Env/Environment"));
const Databases = lazy(() => import("../../modules/Database/Database"));

const AppMain = () => {
  return (
    <Fragment>
      {/* Resources */}

      <Suspense
        fallback={
          <div className="loader-container">
            <div className="loader-container-inner">
              <h6 className="mt-5">
                Loading...
                <small>Wait for the resource builder to load</small>
              </h6>
            </div>
          </div>
        }
      >
        <Route path="/forms/:id*" component={ResourceBuilder} />
      </Suspense>

      {/* Authentication */}
      <Suspense
        fallback={
          <div className="loader-container">
            <div className="loader-container-inner">
              <h6 className="mt-5">
                Loading...
                <small>Wait for the resource builder to load</small>
              </h6>
            </div>
          </div>
        }
      >
        <Route path="/authentication" component={Authentication} />
      </Suspense>

      {/* Databases */}
      <Suspense
        fallback={
          <div className="loader-container">
            <div className="loader-container-inner">
              <h6 className="mt-5">
                Loading...
                <small>Wait for the resource builder to load</small>
              </h6>
            </div>
          </div>
        }
      >
        <Route path="/databases" component={Databases} />
      </Suspense>

      {/* Environment */}
      <Suspense
        fallback={
          <div className="loader-container">
            <div className="loader-container-inner">
              <h6 className="mt-5">
                Loading...
                <small>Wait for the resource builder to load</small>
              </h6>
            </div>
          </div>
        }
      >
        <Route path="/environment" component={Environment} />
      </Suspense>
      {/* Components */}

      <Suspense
        fallback={
          <div className="loader-container">
            <div className="loader-container-inner">
              <h6 className="mt-5">
                Please wait while we load all the Components examples
                <small>
                  Because this is a demonstration we load at once all the
                  Components examples. This wouldn't happen in a real live app!
                </small>
              </h6>
            </div>
          </div>
        }
      >
        <Route path="/components" component={Components} />
      </Suspense>

      {/* Forms */}

      <Suspense
        fallback={
          <div className="loader-container">
            <div className="loader-container-inner">
              <h6 className="mt-5">
                Please wait while we load all the Forms examples
                <small>
                  Because this is a demonstration we load at once all the Forms
                  examples. This wouldn't happen in a real live app!
                </small>
              </h6>
            </div>
          </div>
        }
      >
        <Route path="/formsui" component={Forms} />
      </Suspense>

      {/* Charts */}

      <Suspense
        fallback={
          <div className="loader-container">
            <div className="loader-container-inner">
              <h6 className="mt-3">
                Please wait while we load all the Charts examples
                <small>
                  Because this is a demonstration we load at once all the Charts
                  examples. This wouldn't happen in a real live app!
                </small>
              </h6>
            </div>
          </div>
        }
      >
        <Route path="/charts" component={Charts} />
      </Suspense>

      {/* Tables */}

      <Suspense
        fallback={
          <div className="loader-container">
            <div className="loader-container-inner">
              <h6 className="mt-5">
                Please wait while we load all the Tables examples
                <small>
                  Because this is a demonstration we load at once all the Tables
                  examples. This wouldn't happen in a real live app!
                </small>
              </h6>
            </div>
          </div>
        }
      >
        <Route path="/tables" component={Tables} />
      </Suspense>

      {/* Elements */}

      <Suspense
        fallback={
          <div className="loader-container">
            <div className="loader-container-inner">
              <h6 className="mt-3">
                Please wait while we load all the Elements examples
                <small>
                  Because this is a demonstration we load at once all the
                  Elements examples. This wouldn't happen in a real live app!
                </small>
              </h6>
            </div>
          </div>
        }
      >
        <Route path="/elements" component={Elements} />
      </Suspense>

      {/* Dashboard Widgets */}

      <Suspense
        fallback={
          <div className="loader-container">
            <div className="loader-container-inner">
              <h6 className="mt-3">
                Please wait while we load all the Dashboard Widgets examples
                <small>
                  Because this is a demonstration we load at once all the
                  Dashboard Widgets examples. This wouldn't happen in a real
                  live app!
                </small>
              </h6>
            </div>
          </div>
        }
      >
        <Route path="/widgets" component={Widgets} />
      </Suspense>

      {/* Dashboards */}

      <Suspense
        fallback={
          <div className="loader-container">
            <div className="loader-container-inner">
              <h6 className="mt-3">
                Please wait while we load all the Dashboards examples
                <small>
                  Because this is a demonstration, we load at once all the
                  Dashboards examples. This wouldn't happen in a real live app!
                </small>
              </h6>
            </div>
          </div>
        }
      >
        <Route path="/dashboards" component={Dashboards} />
      </Suspense>

      <Route
        exact
        path="/"
        render={() => <Redirect to="/dashboards/basic" />}
      />
      <ToastContainer />
    </Fragment>
  );
};

export default AppMain;
