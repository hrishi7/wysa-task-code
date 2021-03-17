import React from "react";
import { Route, Redirect } from "react-router-dom";

const PublicRouteUser = ({ component: Component, ...rest }) => {
  const auth = JSON.parse(localStorage.getItem('state'));
  let isAuthenticated =auth && auth.isAuthenticated ? true : false;
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated === false ? (
          <Component {...props} />
        ) : (
          <Redirect to="/screen" />
        )
      }
    />
  );
};

export default PublicRouteUser;
