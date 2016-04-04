import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "../reducers";
import * as createLogger from "redux-logger";
import * as PouchDB from "pouchdb";
import * as PouchMiddleware from "pouch-redux-middleware";

export default function configureStore(initialState) {
  const db = new PouchDB("cloudfm");

  // FIXME warning: variable 'store' used before declaration
  /* tslint:disable:no-use-before-declare */
  const pouchMiddleware = PouchMiddleware({
      actions: {
        insert: doc => store.dispatch({track: doc, type: "ADD_TRACK"}),
        remove: doc => {},
        update: doc => {},
      },
      path: "/tracks",
      db,
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
