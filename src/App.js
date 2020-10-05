import React from "react";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import { Provider } from "react-redux";
import { applyMiddleware } from "redux";

import reducer from "./reducer";
import { createStore } from "redux";

import NavBar from "./components/Nav";

import AuthRoute from "./components/AuthRoute";

import HomePage from "./pages/HomePage";
import LoginPage from "./pages/Login";

import { appMiddleware } from "./middlewares/app";
import { apiMiddleware } from "./middlewares/core";

import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import 'primeflex/primeflex.css';

const createStoreWithMiddleware = applyMiddleware(
  appMiddleware,
  apiMiddleware
)(createStore);

const store = createStoreWithMiddleware(reducer);

const IndexPage = () => (
  <>
    {/* <h3>Welcome to the App</h3> */}
  </>
);

export default function App() {
  return (
    <Provider store={store}>
      <Router>
        <NavBar />
        <div>
          <Switch>
            <AuthRoute path="/login" type="guest">
              <LoginPage />
            </AuthRoute>
            <AuthRoute path="/home" render={HomePage} type="private" />
            {/* <AuthRoute path="/my-account" type="private">
              <MyAccount />
            </AuthRoute> */}
            <Route path="/" render={IndexPage} />
          </Switch>
        </div>
      </Router>
    </Provider>
  );
}
