import { Action } from "../interfaces";
import * as PouchDB from "pouchdb";
import db from "../store/db";
import { push } from "react-router-redux";

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
    const { name, password, metadata } = action.user;
    const remoteUrl = process.env.DATABASE_URL + "/userdb-" + toHex(name);
    const remoteDb: any = new PouchDB(remoteUrl, {skip_setup: true});

    /* TODO reuse existing session
    remoteDb.getSession(function (err, response) {
      console.log(err, response)
      if (err) {

        // network error
      } else if (!response.userCtx.name) {
        // nobody"s logged in
      } else {
        console.log(response.userCtx.name);
        // response.userCtx.name is the current user
      }
    });*/

    switch (action.type) {
      case LOGIN_USER:
        remoteDb.login(name, password, function (err, response) {
          if (err) {
            dispatch(Object.assign({}, action, {status: "error", error: err.name}));
          } else {
            db.sync(remoteDb, {live: true, retry: true})
              .on("error", console.error.bind(console));
            dispatch(push("/collection"));
          }
        });
        break;
      case SIGNUP_USER:
        remoteDb.signup(name, password, { metadata }, function (err, response) {
         if (err) {
           dispatch(Object.assign({}, action, {status: "error", error: err.name}));
         } else {
           // signup succeeded, let"s login
           dispatch(loginOrSignup(Object.assign({}, action, {type: LOGIN_USER})));
         }
       });
       break;
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
