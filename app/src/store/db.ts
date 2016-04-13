import * as PouchDB from "pouchdb";

(PouchDB as any).plugin(require("pouchdb-authentication"));

const db: any = new PouchDB("cloudfm");

db.setMaxListeners(50);

export default db;
