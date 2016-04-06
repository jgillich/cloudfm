import * as PouchDB from "pouchdb";

// TODO remove: PR with callback-less contructor has been submitted to dtd
//const remoteDb = new (PouchDB as any)(process.env.DATABASE_URL + "/user_db%2Fjgillich", {skip_setup: true});
const db = new PouchDB("cloudfm");

// FIXME PouchDB.sync needs typings
//(localDb as any).sync(remoteDb, {live: true, retry: true})
//  .on('error', console.log.bind(console));

export default db;
