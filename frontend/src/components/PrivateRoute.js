import React from "react";
import { Route, Redirect } from "react-router-dom";

const PrivateRouteUser = ({ component: Component, ...rest }) => {
  const auth = JSON.parse(localStorage.getItem('state'));
  let isAuthenticated = auth && auth.isAuthenticated ? true : false;
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated === true ? (
          <Component {...props} />
        ) : (
          <Redirect to="/signin" />
        )
      }
    />
  );
};

export default PrivateRouteUser;
