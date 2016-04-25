import * as PouchDB from "pouchdb";

/* tslint:disable:no-any */
(PouchDB as any).plugin(require("pouchdb-authentication"));
const db: any = new PouchDB("cloudfm");
/* tslint:enable */

db.setMaxListeners(50);

export default db;
