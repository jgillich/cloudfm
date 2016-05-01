/// <reference path="../typings/browser.d.ts"/>
/// <reference path="./main.d.ts"/>

require("core-js/shim");

import * as React from "react";
import {render} from "react-dom";
import {browserHistory} from "react-router";
import {syncHistoryWithStore} from "react-router-redux";
import {Provider} from "react-redux";
import {Router} from "./components";
import createStore from "./store/createStore";
import db from "./store/db";
import {resumeSession} from "./actions";

let initialState = {
  albums: [],
  artists: [],
  tracks: [],
};

db.allDocs({
  include_docs: true,
}, (err, res) => {
  if(err) {
    return console.error(err.error);
  }

  res.rows.forEach(({doc}) => {
    switch (doc.type) {
      case "album":
        initialState.albums.push(doc);
        break;
      case "artist":
        initialState.artists.push(doc);
        break;
      case "track":
        initialState.tracks.push(doc);
        break;
      default:
        break;
    }
  });

  const store = createStore(initialState);

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

});

