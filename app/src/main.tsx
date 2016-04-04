/// <reference path="../typings/browser.d.ts"/>
/// <reference path="./main.d.ts"/>

import * as React from "react";
import { render } from "react-dom";
import { browserHistory } from "react-router";
import { syncHistoryWithStore } from "react-router-redux";
import Root from "./components/Root";
import configureStore from "./store/configureStore";
import * as TracksActions from "./actions/tracks";

const store = configureStore({});
const history = syncHistoryWithStore(browserHistory, store);

store.dispatch(TracksActions.addTrack({
  album: "" + Math.random(),
  artist: "" + Math.random(),
  number: Math.random() * 10,
  title: "" + Math.random(),
  uri: "" + Math.random(),
  _id: "" + Math.random(),
}));

render(
  <Root store={store} history={history}/>,
  document.body
);
