/// <reference path="../typings/browser.d.ts"/>
/// <reference path="./main.d.ts"/>

require("core-js/shim");

import * as React from "react";
import {render} from "react-dom";
import {browserHistory} from "react-router";
import {syncHistoryWithStore} from "react-router-redux";
import {Provider} from "react-redux";
import {Router} from "./components";
import configureStore from "./store/configureStore";
import {resumeSession} from "./actions";

const store = configureStore();
const history = syncHistoryWithStore(browserHistory, store);

const container = document.createElement("div");
container.id = "cloudfm";

render(
  <Provider store={store}>
    <Router history={history}/>
  </Provider>,
  container
);

document.body.appendChild(container);

store.dispatch(resumeSession());
