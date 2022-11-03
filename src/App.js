import React from "react";
import { useSelector } from "react-redux";
import { BrowserRouter as Router, Redirect, Route, Switch } from "react-router-dom";
import "./App.css";
import { ProtectedRoute } from "./components/ProtectedRoute";
import Company from "./pages/company";
import Device from "./pages/device";
import HomePage from "./pages/HomePage";
import { Login } from "./pages/Login";
import Master from "./pages/Master";
import Search from "./pages/search";
import Farms from './pages/setup/farm/farms';

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
            <ProtectedRoute path="/master" component={Master} />
            <ProtectedRoute path="/farm" component={Farms} />
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
