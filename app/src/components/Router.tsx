import * as React from "react";
import {StatelessComponent} from "react";
import {Route, IndexRoute} from "react-router";
import {App} from "./";
import {Login, Signup, Settings, Collection, Discover} from "../containers";
import {Router as ReactRouter} from "react-router";
import {ReactRouterReduxHistory} from "react-router-redux";

interface RouterProps {
  history: ReactRouterReduxHistory;
};

export const Router: StatelessComponent<RouterProps> = ({history}) => (
  <ReactRouter history={history}>
    <Route path="/" component={App}>
      <IndexRoute component={Login}/>
      <Route path="/login" component={Login}/>
      <Route path="/signup" component={Signup} />
      <Route path="/collection" component={Collection} />
      <Route path="/discover" component={Discover} />
      <Route path="/settings" component={Settings} />
    </Route>
  </ReactRouter>
);
