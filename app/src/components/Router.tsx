import * as React from "react";
import { StatelessComponent } from "react";
import { Route, IndexRoute } from "react-router";
import { App, Collection } from "./";
import { Authentication, VisibleTrackList } from "../containers";
import { Router as ReactRouter } from "react-router";

export const Router: StatelessComponent<any> = ({ history }) => (
  <ReactRouter history={history}>
    <Route path="/" component={App}>
      <IndexRoute component={Authentication}/>
      <Route path="/collection" component={Collection} />
    </Route>
  </ReactRouter>
);
