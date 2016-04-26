import {createStore, applyMiddleware, compose } from "redux";
import {Store} from "redux";
import rootReducer from "../reducers";
import * as createLogger from "redux-logger";
import thunkMiddleware from "redux-thunk";
import * as PouchMiddleware from "pouch-redux-middleware";
import {routerMiddleware } from "react-router-redux";
import {browserHistory } from "react-router";
import schema from "./schema";
import db from "./db";

/* tslint:disable:no-any */
export default function configureStore(initialState: any = {}): Store {
  /* tslint:enable */
  let store;

  const pouchMiddleware = PouchMiddleware(
    schema.map(type => ({
        actions: {
          insert: (doc): void => {
            if(doc.type === type.singular) {
              store.dispatch({
                [type.singular]: doc,
                type: "INSERT_" + type.singular.toUpperCase(),
              });
            }
          },
          remove: (doc): void => {
            if(doc.type === type.singular) {
              store.dispatch({
                [type.singular]: doc,
                type: "REMOVE_" + type.singular.toUpperCase(),
              });
            }
          },
          update: (doc): void => {
            if(doc.type === type.singular) {
              store.dispatch({
                [type.singular]: doc,
                type: "UPDATE_" + type.singular.toUpperCase(),
              });
            }
          },
        },
        changeFilter: (doc): boolean => doc.type === type.singular,
        db: db,
        path: `/${type.plural}`,
    })));

  const applyMiddlewares = applyMiddleware(
    pouchMiddleware,
    thunkMiddleware,
    routerMiddleware(browserHistory),
    (createLogger)()
  );

  const createStoreWithMiddleware = compose(
    applyMiddlewares
  )(createStore);

  store = createStoreWithMiddleware(
    rootReducer,
    initialState
  );

  return store;
};
