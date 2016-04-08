import * as PouchDB from "pouchdb";
import schema from "./schema";

(PouchDB as any).plugin(require("pouchdb-authentication"));

const db: any = new PouchDB("cloudfm");

// View functions are converted to string, but we still need to define
// emit or TypeScript won't compile this
function emit(a: any, b?: any) {}

const views = schema.map(type => ({[type.plural]: makeViews(type.plural)}))
                    .reduce((p, c) => Object.assign(p, c), {});

function makeViews(type: string) {
  return {
    all: {
      map: function(doc) {
        if(doc.type == type) {
          emit(doc._id);
        }
      }.toString(),
    },
  };
}

Object.keys(views).forEach((key) => {
  db.put({
    _id: "_design/" + key,
    views: views[key],
  });
});

export default db;
