import { createStore, applyMiddleware, compose } from "redux"
import { persistentStore } from 'redux-pouchdb'
import rootReducer from "../reducers"
import * as PouchDB from "pouchdb";
import * as createLogger from "redux-logger"

const db = new PouchDB("cloudfm");

const applyMiddlewares = applyMiddleware(

  // HAS TO BE LAST MIDDLEWARE
  (createLogger as any)()
);

const createStoreWithMiddleware = compose(
  applyMiddlewares,
  persistentStore(db)
)(createStore);

export default function configureStore(initialState) {
  return createStoreWithMiddleware(
    rootReducer,
    initialState
  )
}
