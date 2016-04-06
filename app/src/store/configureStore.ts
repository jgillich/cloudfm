import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "../reducers";
import * as createLogger from "redux-logger";
import * as PouchMiddleware from "pouch-redux-middleware";
import db from "./db";

export default function configureStore(initialState) {
  // FIXME warning: variable 'store' used before declaration
  /* tslint:disable:no-use-before-declare */
  const pouchMiddleware = PouchMiddleware({
    actions: {
      insert: doc => store.dispatch({track: doc, type: "ADD_TRACK"}),
      remove: doc => {},
      update: doc => {},
    },
    db: db,
    path: "/tracks",
  });

  const applyMiddlewares = applyMiddleware(
    pouchMiddleware,
    // has to be last
    (createLogger as any)()
  );

  const createStoreWithMiddleware = compose(
    applyMiddlewares
  )(createStore);

  let store = createStoreWithMiddleware(
    rootReducer,
    initialState
  );

  return store;
};
