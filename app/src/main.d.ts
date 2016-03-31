declare namespace ReactHyperscriptHelpers {

  function h1(text: string, children?: Array<JSX.Element>): JSX.Element;

  function div(children?: Array<JSX.Element>): JSX.Element;

  function ul(children?: Array<JSX.Element>): JSX.Element;

  function li(text?: string, children?: Array<JSX.Element>): JSX.Element;

  function h(a: any, b?: any, c?: any): JSX.Element;
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
