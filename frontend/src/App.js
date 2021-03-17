import React from "react";
import "./App.css";

import {  CssBaseline } from "@material-ui/core";

import MainRoute from "./components/MainRoute";




function App() {

  return (
    <div>
        <MainRoute />
      <CssBaseline />
    </div>
  );
}

export default App;
