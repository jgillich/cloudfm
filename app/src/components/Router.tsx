import * as React from "react";
import {StatelessComponent} from "react";
import {Route, IndexRoute} from "react-router";
import {App, Collection} from "./";
import {Login, Signup} from "../containers";
import {Router as ReactRouter} from "react-router";

export const Router: StatelessComponent<any> = ({history}) => (
  <ReactRouter history={history}>
    <Route path="/" component={App}>
      <IndexRoute component={Login}/>
      <Route path="/signup" component={Signup} />
      <Route path="/collection" component={Collection} />
    </Route>
  </ReactRouter>
);
