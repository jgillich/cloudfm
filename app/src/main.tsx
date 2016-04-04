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

[1, 2, 3, 4, 5].forEach(no => store.dispatch(TracksActions.addTrack({
  album: "test"+ no,
  artist: "test"+ no,
  number: no,
  title: "test" + no,
  uri: "test" + no,
})));

render(
  <Root store={store} history={history}/>,
  document.body
);
