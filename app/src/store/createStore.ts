import {createStore, applyMiddleware, compose } from "redux";
import {Store} from "redux";
import rootReducer from "../reducers";
import * as createLogger from "redux-logger";
import thunkMiddleware from "redux-thunk";
import {routerMiddleware } from "react-router-redux";
import {browserHistory } from "react-router";
import reduxReset from "redux-reset";
import pouchSync from "./pouchSync";

export default function (): Store<any> {

  const applyMiddlewares = applyMiddleware(
    thunkMiddleware,
    routerMiddleware(browserHistory),
    pouchSync([
      ["track", "tracks"],
      ["artist", "artists"],
      ["album", "albums"],
    ]),
    (createLogger)()
  );

  const createStoreWithMiddleware = (compose as any)(
    applyMiddlewares,
    reduxReset({data: "state"})
  )(createStore);

  return createStoreWithMiddleware(
    rootReducer
  );
};
