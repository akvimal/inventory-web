import React from "react";
import { useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom";

export const ProtectedRoute = ({ component: Component, ...rest }) => {
  const isAuth = useSelector((state) => state.authReducer.isAuth);
  if (isAuth) {
    return <Route {...rest} render={(props) => <Component {...props} />} />;
  } else {
    return <Redirect to={{ pathname: "/" }} />;
  }
};
