interface PouchMiddleware {
  (a: any): any;
}

declare var PouchMiddleware: PouchMiddleware;

declare module "pouch-redux-middleware" {
  export = PouchMiddleware;
}
