import * as React from "react";
import {StatelessComponent} from "react";
import {Route, IndexRoute} from "react-router";
import {App} from "./";
import {Login, Signup, Settings, Collection} from "../containers";
import {Router as ReactRouter} from "react-router";

export const Router: StatelessComponent<any> = ({history}) => (
  <ReactRouter history={history}>
    <Route path="/" component={App}>
      <IndexRoute component={Login}/>
      <Route path="/login" component={Login}/>
      <Route path="/signup" component={Signup} />
      <Route path="/collection" component={Collection} />
      <Route path="/settings" component={Settings} />
    </Route>
  </ReactRouter>
);
