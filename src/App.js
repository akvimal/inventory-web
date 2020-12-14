import React from "react";
import "./App.css";
import HomePage from "./pages/HomePage";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Device from "./pages/device";
import Company from "./pages/company";

export default function App() {
  return (
    <Router>
      <div className="app-container">
        <HomePage />

        <Switch>
          <Route path="/device" component={Device} />
          <Route path="/company" component={Company} />
          <Route path="/search" />
        </Switch>
      </div>
    </Router>
  );
}
