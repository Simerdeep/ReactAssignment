import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

ReactDOM.hydrate(
  <Router>
    <React.StrictMode>
    <Switch>
      <Route path="/">
        <App />
      </Route>
    </Switch>
    </React.StrictMode>
  </Router>
  ,
  document.getElementById("root")
);