import { createStore, applyMiddleware, compose } from "redux"
import { persistentStore } from 'redux-pouchdb'
import rootReducer from "../reducers"
import * as PouchDB from "pouchdb";
import * as createLogger from "redux-logger"

const db = new PouchDB("cloudfm");

const applyMiddlewares = applyMiddleware(

  // has to be last
  (createLogger as any)()
);

const createStoreWithMiddleware = compose(
  applyMiddlewares
)(createStore);

export default function configureStore(initialState) {
  return createStoreWithMiddleware(
    rootReducer,
    initialState
  )
}
