import * as PouchDB from "pouchdb";

PouchDB.plugin(require("pouchdb-authentication"));

export default new PouchDB("cloudfm");
