// TODO write proper typings and contribute them to dt

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

// err should be PouchDB.Core.Error, but it's not properly defined yet
interface PouchDB {
  plugin(plugin: any): void;
  sync(pouch: PouchDB, opts: any): any;
  getUser(name: string, opts?: any, callback?: (err: any, res: any) => void): any;
  putUser(name: string, opts?: any, callback?: (err: any, res: any) => void): any;
  login(name: string, password: string, opts?: any, callback?: (err: any, res: any) => void): any;
  signup(name: string, password: string, opts?: any, callback?: (err: any, res: any) => void): any;
  getSession(callback: (err: any, res: any) => void): any;
}

interface ReduxResetOptions {
  type?: string;
  data?: string;
}

declare module "redux-reset" {
  function reduxReset(options?: ReduxResetOptions): any;
  export default reduxReset;
}
