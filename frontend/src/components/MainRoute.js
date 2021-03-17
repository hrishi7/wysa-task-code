import * as React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import SignIn from "./authentication/SignIn";
import SignUp from "./authentication/SignUp";

import Screen from "./screens/Screen";

import PrivateRouteUser from "./PrivateRoute";
import PublicRoute from "./PublicRoute";
import { makeStyles } from "@material-ui/core";


const useStyles = makeStyles({
  appMain: {
    paddingLeft: "260px",
    width: "100%",
  },
});

export default function MainRoute() {
  const classes = useStyles();



  return (
    <Router>
     
      <div className={classes.appMain}>
        <div style={{ minHeight: "500px", position: "relative" }}>
          <Switch>
            <PublicRoute exact path="/signin" component={SignIn} />
            <PublicRoute exact path="/signup" component={SignUp} />
            <PrivateRouteUser
              exact
              path="/"
              component={Screen}
            />
            <PrivateRouteUser
              exact
              path="/screen"
              component={Screen}
            />
          
          </Switch>
        </div>
      </div>
    </Router>
  );
}
