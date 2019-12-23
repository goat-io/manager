import React, { ComponentClass } from "react";
import ReactDOM from "react-dom";
import "./assets/base.css";
import App from "./modules/Main";
import * as serviceWorker from "./serviceWorker";
import configureGoat from "./config/goat";
import { HashRouter } from "react-router-dom";
import "./styles.scss";
configureGoat();

const rootElement = document.getElementById("root");

const renderApp = (Component: ComponentClass) => {
  ReactDOM.render(
    <HashRouter>
      <Component />
    </HashRouter>,
    rootElement
  );
};

renderApp(App);

if (module.hot) {
  module.hot.accept("./_Router", () => {
    const NextApp = require("./_Router").default;
    renderApp(NextApp);
  });
}
serviceWorker.unregister();
