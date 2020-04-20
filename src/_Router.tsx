import React from "react";
import { Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import AppMain from "./layout/Main";
// import Login from "../../modules/Login";
// <Route path="/login" component={Login} />
const App = () => {
  return (
    <>
      <Route exact path="/" component={AppMain} />
      <ToastContainer />
    </>
  );
};

export default App;
