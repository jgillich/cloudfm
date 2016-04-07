import * as PouchDB from "pouchdb";
import schema from "./schema";

(PouchDB as any).plugin(require("pouchdb-authentication"));
(PouchDB as any).plugin(require("relational-pouch"));

const db: any = new PouchDB("cloudfm");

db.setSchema(schema);

// View functions are converted to string, but we still need to define
// emit or TypeScript won't compile this
function emit(a: any, b?: any) {}

const views = schema.map(type => ({ [type.plural]: makeViews(type.plural) }))
                    .reduce((p, c) => Object.assign(p, c), {});

function makeViews(type: string) {
  const prefix = type + "_";
  return {
    all: {
      map: function(doc) { if(doc.id.startsWith(prefix)) { emit(doc._id); } }.toString(),
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
