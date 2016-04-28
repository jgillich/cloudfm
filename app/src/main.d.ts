// TODO write proper typings and contribute them to dt

interface PouchMiddleware {
  (a: any): any;
}

declare var PouchMiddleware: PouchMiddleware;

declare module "pouch-redux-middleware" {
  export = PouchMiddleware;
}

interface ReactReduxForm {
  modelReducer(a: any, b?: any): any;
  formReducer(a: any, b?: any): any;
  Field(a: any): any;
  Form(a: any): any;
  actions(a: any): any;
  modeled(a: any, b: any): any;
}

declare var ReactReduxForm: ReactReduxForm;

declare module "react-redux-form" {
  export = ReactReduxForm;
}

interface ReactHowler {
  (a: any, b?: any): any;
}

declare var ReactHowler: ReactHowler;

declare module "react-howler" {
  export = ReactHowler;
}
