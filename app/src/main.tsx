/// <reference path="../typings/browser.d.ts"/>
/// <reference path="./main.d.ts"/>

require("core-js/shim");

import * as React from "react";
import {render} from "react-dom";
import {browserHistory} from "react-router";
import {syncHistoryWithStore} from "react-router-redux";
import {Root} from "./components";
import configureStore from "./store/configureStore";
import {resumeSession} from "./actions";

// https://github.com/Microsoft/TypeScript/issues/7270
(React as any).__spread = Object.assign;

const store = configureStore({
  backends: [],
  tracks: [],
});
const history = syncHistoryWithStore(browserHistory, store);

const container = document.createElement("div");
container.id = "cloudfm";

render(
  <Root store={store} history={history}/>,
  container
);

document.body.appendChild(container);

store.dispatch(resumeSession());
