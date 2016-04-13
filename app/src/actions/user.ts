import {Action} from "../interfaces";
import * as PouchDB from "pouchdb";
import db from "../store/db";
import {push} from "react-router-redux";

export const LOGIN_USER = "LOGIN_USER";
export const SIGNUP_USER = "SIGNUP_USER";

export interface UserAction extends Action {
  user: {
    name: string;
    password: string;
    email: string;
  };
  status?: string;
};

export function resumeSession() {
  return function (dispatch) {
    const remoteUrl = process.env.DATABASE_URL + "/_users";
    const remoteDb: any = new (PouchDB as any)(remoteUrl, {skip_setup: true});

    remoteDb.getSession(function (err, response) {
      if (!err && response.userCtx.name) {
        const userDb: any = new (PouchDB as any)(userDbUrl(response.userCtx.name), {skip_setup: true});
        db.sync(userDb, {live: true, retry: true})
          .on("error", console.error.bind(console));

        dispatch({
          type: LOGIN_USER,
          user: response.userCtx,
        });
        dispatch(push("/collection"));
      }
    });
  };
}

export function loginUser(user) {
  return loginOrSignup({
    type: LOGIN_USER,
    user,
  });
}

export function signupUser(user) {
  return loginOrSignup({
    type: SIGNUP_USER,
    user,
  });
}

function loginOrSignup(action: UserAction) {
  return function (dispatch) {
    const {name, password, email} = action.user;
    const userDb: any = new (PouchDB as any)(userDbUrl(name), {skip_setup: true});

    if(action.type == LOGIN_USER) {
      userDb.login(name, password, function (err, response) {
        if (err) {
          return dispatch(Object.assign({}, action, {error: err.name}));
        }

        db.sync(userDb, {live: true, retry: true})
          .on("error", console.error.bind(console));
        dispatch(Object.assign({}, action));
        dispatch(push("/collection"));
      });
    } else if(action.type == SIGNUP_USER) {
      userDb.signup(name, password, {metadata: {email}}, function (err, response) {
        if (err) {
          return dispatch(Object.assign({}, action, {error: err.name}));
        }
        dispatch(Object.assign({}, action));

        // signup succeeded, let's login
        dispatch(loginOrSignup(Object.assign({}, action, {type: LOGIN_USER})));
      });
    }
  };
}

function userDbUrl(name: string): string {
  return process.env.DATABASE_URL + "/userdb-" + toHex(name);
}

function toHex(str) {
  let result = "";
  for (let i=0; i<str.length; i++) {
    result += str.charCodeAt(i).toString(16);
  }
  return result;
}
