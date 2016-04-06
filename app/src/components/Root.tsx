import * as React from "react";
import { StatelessComponent } from "react";
import { Provider } from "react-redux";
import { Router } from "./";

export const Root: StatelessComponent<any> = ({ store, history }) => (
  <Provider store={store}>
    <Router history={history}/>
  </Provider>
);
