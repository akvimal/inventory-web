import React from "react";
import "./App.css";
import HomePage from "./pages/HomePage";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import Device from "./pages/device";
import Company from "./pages/company";
import Search from "./pages/search";
import { Login } from "./pages/Login";
import { useSelector } from "react-redux";
import {ProtectedRoute} from "./components/ProtectedRoute"

export default function App() {
  const isLogged = useSelector((state) => state.authReducer.isAuth);
  return (
    <Router>
      <Switch>
      {isLogged ? (
        <div className="app-container">
          <HomePage />
            <Redirect to="/device" />
            <ProtectedRoute path="/device" component={Device} />
            <ProtectedRoute path="/company" component={Company} />
            <ProtectedRoute path="/search" component={Search} />
        </div>
      ) : (
        <>
            <Redirect to="/login" />
            <Route path="/" component={Login} />
        </>
      )}
      </Switch>
    </Router>
  );
}
