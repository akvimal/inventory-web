import React from "react";
import "./App.css";
import HomePage from "./pages/HomePage";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import Device from "./pages/device";
import Company from "./pages/company";
import Search from "./pages/search";

export default function App() {
  return (
    <Router>
      <div className="app-container">
      <HomePage />
        <Switch>
          <Route exact path='/'>
           <Redirect to="/device" />
        </Route>
          <Route path="/device" component={Device} />
          <Route path="/company" component={Company} />
          <Route path="/search" component={Search} />
        </Switch>
      </div>
    </Router>
  );
}
