declare namespace ReduxPouchdb {
  function persistentStore(db: any): any;
}

declare module "redux-pouchdb" {
  export = ReduxPouchdb;
}
