declare namespace ReactHyperscriptHelpers {
  function h1(text: string): JSX.Element;
  function h(a: any, b: any): JSX.Element;
  function h(a: any, b: any, c: any): JSX.Element;
}

declare module "react-hyperscript-helpers" {
  export = ReactHyperscriptHelpers;
}

declare namespace ReduxPouchdb {
  function persistentStore(db: any): any;
}

declare module "redux-pouchdb" {
  export = ReduxPouchdb;
}
