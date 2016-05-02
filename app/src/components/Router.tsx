import * as React from "react";
import {Store} from "redux";
import {StatelessComponent} from "react";
import {
  AppContainer,
  LoginContainer, SignupContainer,
  CollectionContainer, AlbumListContainer, AlbumItemContainer,
  SettingsContainer, UserSettingsContainer, BackendSettingsContainer,
} from "../components";
import {
  Router as ReactRouter, IndexRoute, IndexRedirect, Route, RouterState,
  RedirectFunction,
} from "react-router";
import {ReactRouterReduxHistory} from "react-router-redux";
import {resumeSession} from "../actions";

function requireAuth(store: Store):
  (nextState: RouterState, replace: RedirectFunction, cb: Function) => void {
  return (nextState, replace, cb) => {
    let { user } = store.getState();

    if(!user.loggedIn) {
      store.dispatch(resumeSession((loggedIn) => {
        if(loggedIn) {
          cb();
        } else {
          replace({
            pathname: "/login",
            query: { redirectTo: nextState.location.pathname },
          });
          cb();
        }
      }));
    } else {
      cb();
    }
  };
}

interface RouterProps {
  history: ReactRouterReduxHistory;
  store: Store;
};

export const Router: StatelessComponent<RouterProps> = ({history, store}) => (
  <ReactRouter history={history}>
    <Route path="/" component={AppContainer}>
      <IndexRedirect to="/collection"/>
      <Route path="/login" component={LoginContainer}/>
      <Route path="/signup" component={SignupContainer} />
      <Route path="/collection" component={CollectionContainer}
        onEnter={requireAuth(store)}>
        <IndexRoute component={AlbumListContainer}/>
        <Route path="artist/:id" component={AlbumListContainer}/>
        <Route path="album/:id" component={AlbumItemContainer}/>
      </Route>
      <Route path="/settings" component={SettingsContainer}
        onEnter={requireAuth(store)}>
        <IndexRoute component={UserSettingsContainer}/>
        <Route path="user" component={UserSettingsContainer}/>
        <Route path="backends" component={BackendSettingsContainer}/>
      </Route>
    </Route>
  </ReactRouter>
);
