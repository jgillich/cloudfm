import * as React from "react";
import { StatelessComponent } from "react";
import { Route } from "react-router";
import { App } from "./App";
import { Authentication } from "../containers";
import { Router as ReactRouter } from "react-router";

export const Router: StatelessComponent<any> = ({ history }) => (
  <ReactRouter history={history}>
    <Route path="/" component={Authentication}/>
    <Route path="app" component={App} />
  </ReactRouter>
);
