import React from "react";
import { createBrowserHistory } from "history";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./Home";
import OverView from "./OverView";

const hist = createBrowserHistory();

const routes = () => (
  <Router history={hist}>
    <Route exact path="/" component={Home} />
    <Route exact path="/overview" component={OverView} />
  </Router>
);
export default routes;
