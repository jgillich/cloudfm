import {Store} from "redux";
import {getLocalDb} from "../db";

let listeners = [];

// Types is a tuple with [singular, plural]
export default function pouchSync(types: string[][]) {
    return (store) => {
        let {user} = store.getState();

        return next => action => {
          let result = next(action);
          let state = store.getState();
          if(state.user !== user) {
            user = state.user;
            if(listeners.length) {
              listeners.forEach(l => l.cancel());
            }
            let db = getLocalDb(user.name);
            reinitializeStore(store, db, types);
            listeners = types.map(t => listen(store, db, t));
          }
          return result;
        };
    };
};

function listen(store: Store, db: any, type: string[]): void {
    return db.changes({
        include_docs: true,
        live: true,
        since: "now",
    }).on("change", change => {
        if (change.doc.type !== type[0]) {
            return;
        }
        let actionType = change.deleted ? "DELETE" :
            store.getState()[type[1]].some(d => d._id === change.doc._id)
            ? "UPDATE" : "INSERT";
        store.dispatch({
            type: `${actionType}_${type[0].toUpperCase()}`,
            [type[0]]: change.doc,
        });
    });
}

// Replaces the current store with the new user data
// When the store is initialized the first time, we don't know the username
// because sign in has not happened yet.
function reinitializeStore(store: Store, db: PouchDB, types: string[][]): void {
  let emptyState = {};
  types.forEach(t => emptyState[t[1]] = []);

  let state = Object.assign(store.getState(), emptyState);

  db.allDocs({
    include_docs: true,
  }, (err, res) => {
    if(err) {
      return console.error(err.error);
    }

    res.rows.forEach(({doc}) => {
      let foundType = types.find(t => t[0] === doc.type);
      if(foundType) {
        state[foundType[1]].push(doc);
      }
    });

    store.dispatch({
      state: state,
      type: "RESET",
    });
  });

}
