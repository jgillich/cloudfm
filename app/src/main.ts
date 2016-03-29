/// <reference path="../typings/browser.d.ts"/>
/// <reference path="./main.d.ts"/>

import * as React from "react";
import { render } from "react-dom"
import { browserHistory } from "react-router"
import { syncHistoryWithStore } from "react-router-redux"
import { h } from "react-hyperscript-helpers";
import Root from "./components/Root"
import configureStore from "./store/configureStore"

const store = configureStore({})
const history = syncHistoryWithStore(browserHistory, store)

render(
  h(Root, { store: store, history: history }),
  document.body
);
