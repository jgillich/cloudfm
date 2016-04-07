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
    metadata?: {
      email: string;
    }
  };
  status?: string;
};

export function resumeSession() {
  return function (dispatch) {
    const remoteUrl = process.env.DATABASE_URL + "/_users";
    const remoteDb: any = new PouchDB(remoteUrl, {skip_setup: true});

    remoteDb.getSession(function (err, response) {
      if (!err && response.userCtx.name) {
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
    const {name, password, metadata} = action.user;
    const remoteUrl = process.env.DATABASE_URL + "/userdb-" + toHex(name);
    const remoteDb: any = new PouchDB(remoteUrl, {skip_setup: true});

    if(action.type == LOGIN_USER) {
      remoteDb.login(name, password, function (err, response) {
        if (err) {
          return dispatch(Object.assign({}, action, {error: err.name}));
        }

        db.sync(remoteDb, {live: true, retry: true})
          .on("error", console.error.bind(console));
        dispatch(Object.assign({}, action));
        dispatch(push("/collection"));
      });
    } else if(action.type == SIGNUP_USER) {
      remoteDb.signup(name, password, {metadata}, function (err, response) {
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

function toHex(str) {
  let result = "";
  for (let i=0; i<str.length; i++) {
    result += str.charCodeAt(i).toString(16);
  }
  return result;
}
