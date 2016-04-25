import * as React from "react";
import {StatelessComponent} from "react";
import {Store} from "redux";
import {Provider} from "react-redux";
import {Router} from "./";
import {ReactRouterReduxHistory} from "react-router-redux";

interface RootProps {
  store: Store;
  history: ReactRouterReduxHistory;
};

export const Root: StatelessComponent<RootProps> = ({store, history}) => (
  <Provider store={store}>
    <Router history={history}/>
  </Provider>
);
