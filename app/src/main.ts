/// <reference path='../typings/browser.d.ts'/>
/// <reference path='./main.d.ts'/>

import * as React from "react";
import { render } from 'react-dom'
import { browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import Root from './containers/Root'
import configureStore from './store/configureStore'
import { h } from "react-hyperscript-helpers";

const store = configureStore({})
const history = syncHistoryWithStore(browserHistory, store)

render(
  h(Root, { store: store, history: history }),
  document.body
);
