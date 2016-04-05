import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "../reducers";
import * as createLogger from "redux-logger";
import * as PouchDB from "pouchdb";
import * as PouchMiddleware from "pouch-redux-middleware";

export default function configureStore(initialState) {
  const tracksDb = new PouchDB("tracks");

  // FIXME PouchDB.sync needs typings
  (PouchDB as any).sync(
    "tracks",
    process.env.DATABASE_URL + "/tracks",
    {live: true, retry: true}
  );

  // FIXME warning: variable 'store' used before declaration
  /* tslint:disable:no-use-before-declare */
  const pouchMiddleware = PouchMiddleware({
    actions: {
      insert: doc => store.dispatch({track: doc, type: "ADD_TRACK"}),
      remove: doc => {},
      update: doc => {},
    },
    db: tracksDb,
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
