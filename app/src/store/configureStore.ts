import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "../reducers";
import * as createLogger from "redux-logger";
//import PouchMiddleware from "pouch-redux-middleware";
import * as TracksActions from "../actions/tracks";
import * as PouchDB from "pouchdb";
const PouchMiddleware = require("pouch-redux-middleware");

export default function configureStore(initialState) {
  const db = new PouchDB("cloudfm");

  const pouchMiddleware = PouchMiddleware({
      path: '/tracks',
      db,
      actions: {
        //remove: doc => store.dispatch({type: TracksActions.ADD_TRACK, id: doc._id}),
        insert: doc => store.dispatch({type: TracksActions.ADD_TRACK, track: doc}),
        //update: doc => store.dispatch({type: TracksActions.UPDATE_TODO, todo: doc}),
      }
    })

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
