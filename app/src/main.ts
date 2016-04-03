/// <reference path="../typings/browser.d.ts"/>
/// <reference path="./main.d.ts"/>

import * as React from "react";
import { render } from "react-dom"
import { browserHistory } from "react-router"
import { syncHistoryWithStore } from "react-router-redux"
import { h } from "react-hyperscript-helpers";
import Root from "./components/Root"
import configureStore from "./store/configureStore"
import * as CollectionActions from "./actions/collection"

const store = configureStore({})
const history = syncHistoryWithStore(browserHistory, store)

store.dispatch(CollectionActions.addTrack({
  title: "test",
  artist: "test",
  album: "test",
  number: 1,
  uri: "test"
}))

render(
  h(Root, { store: store, history: history }),
  document.body
);
