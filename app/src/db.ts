import * as PouchDB from "pouchdb";

PouchDB.plugin(require("pouchdb-authentication"));

let instances = {};

export function getLocalDb(username: string): PouchDB {
  let dbUrl = toDbName(username);
  if(!instances[dbUrl]) {
    instances[dbUrl] = new PouchDB(dbUrl);
  }
  return instances[dbUrl];
}

export function getRemoteDb(username: string): PouchDB {
  let dbUrl = `${process.env.DATABASE_URL}/${toDbName(username)}`;
  if(!instances[dbUrl]) {
    instances[dbUrl] = new PouchDB(dbUrl);
  }
  return instances[dbUrl];
}

export function getUsersDb(): PouchDB {
  let dbUrl = `${process.env.DATABASE_URL}/_users`;
  if(!instances[dbUrl]) {
    instances[dbUrl] = new PouchDB(dbUrl);
  }
  return instances[dbUrl];
}

function toDbName(username: string): string {
  return "userdb-" + toHex(username);
}

function toHex(str: string): string {
  let result = "";
  for(let i = 0; i < str.length; i++) {
    result += str.charCodeAt(i).toString(16);
  }
  return result;
}
