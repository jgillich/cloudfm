import * as React from "react";
import {StatelessComponent} from "react";
import {
  AppContainer,
  LoginContainer, SignupContainer,
  CollectionContainer, AlbumListContainer, AlbumItemContainer,
  SettingsContainer, UserSettingsContainer, BackendSettingsContainer,
} from "../components";
import {
  Router as ReactRouter, IndexRoute, IndexRedirect, Route,
} from "react-router";
import {ReactRouterReduxHistory} from "react-router-redux";

interface RouterProps {
  history: ReactRouterReduxHistory;
};

export const Router: StatelessComponent<RouterProps> = ({history}) => (
  <ReactRouter history={history}>
    <Route path="/" component={AppContainer}>
      <IndexRedirect to="/collection" />
      <Route path="/login" component={LoginContainer}/>
      <Route path="/signup" component={SignupContainer} />
      <Route path="/collection" component={CollectionContainer}>
        <IndexRoute component={AlbumListContainer}/>
        <Route path="artist/:id" component={AlbumListContainer}/>
        <Route path="album/:id" component={AlbumItemContainer}/>
      </Route>
      <Route path="/settings" component={SettingsContainer}>
        <IndexRoute component={UserSettingsContainer}/>
        <Route path="user" component={UserSettingsContainer}/>
        <Route path="backends" component={BackendSettingsContainer}/>
      </Route>
    </Route>
  </ReactRouter>
);
