import * as PouchDB from "pouchdb";
import schema from "./schema";

(PouchDB as any).plugin(require("pouchdb-authentication"));

const db: any = new PouchDB("cloudfm");

db.setMaxListeners(50);

export default db;
