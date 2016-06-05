import * as PouchDb from "pouchdb";
import {Dispatch, Store} from "redux";
import {getLocalDb} from "../db";

let listeners = [];

// Types is a tuple with [singular, plural]
export default function pouchSync(types: string[][]) {
    return ({getState, dispatch}) => {
        let {user} = getState();

        return next => action => {
          let result = next(action);
          let state = getState();
          if(state.user !== user) {
            user = state.user;
            if(listeners.length) {
              listeners.forEach(l => l.cancel());
            }
            let db = getLocalDb(user.name);
            reinitializeStore(state, db, dispatch, types);
            listeners = types.map(t => listen(db, t[0], dispatch));
          }
          return result;
        };
    };
};

function listen(db: any, type: string, dispatch: Dispatch) {
    return db.changes({
        include_docs: true,
        live: true,
        since: "now",
    }).on("change", change => {
        if (change.doc.type !== type) {
            return;
        }
        let actionType = change.deleted ? "DELETE" :
            db.allDocs().some(d => d._id == change.doc._id) ? "UPDATE" : "INSERT";
        dispatch({
            type: `${actionType}_${type.toUpperCase()}`,
            [type]: change.doc,
        });
    });
}

// Replaces the current store with the new user data
// When the store is initialized the first time, we don't know the username
// because sign in has not happened yet.
function reinitializeStore(state: any, db: PouchDB, dispatch: Dispatch, types: string[][]): void {
  let emptyState = {};
  types.forEach(t => emptyState[t[1]] = []);

  state = Object.assign(state, emptyState);

  db.allDocs({
    include_docs: true,
  }, (err, res) => {
    if(err) {
      return console.error(err.error);
    }

    res.rows.forEach(({doc}) => {
      let foundType = types.find(t => t === doc.type);
      if(foundType) {
        state[foundType[1]].push(doc);
      }
    });

    dispatch({
      state: state,
      type: "RESET",
    });
  });

}
