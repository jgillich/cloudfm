import * as PouchDB from "pouchdb";

PouchDB.plugin(require("pouchdb-authentication"));
const db = new PouchDB("cloudfm");

export default db;
