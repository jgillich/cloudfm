import {Action} from "./";
import * as PouchDB from "pouchdb";
import db from "../store/db";
import {push} from "react-router-redux";
import {User} from "../interfaces";

export interface UserAction {
  type: Action;
  user: User;
  status?: string;
};

export function updateUser(user: User): UserAction {
  return {
    type: Action.UpdateUser,
    user: user,
  };
}

export function resumeSession() {
  return function (dispatch) {
    const remoteUrl = process.env.DATABASE_URL + "/_users";
    const remoteDb: any = new (PouchDB as any)(remoteUrl, {skip_setup: true});

    remoteDb.getSession((err, response) => {
      if (!err && response.userCtx.name) {
        const userDb = getUserDb(response.userCtx.name);
        db.sync(userDb, {live: true, retry: true})
          .on("error", console.error.bind(console));

        dispatch({
          type: Action.LoginUser,
          user: response.userCtx,
        });
        dispatch(push("/collection"));
      }
    });
  };
}

export function loginUser(user: User) {
  return function (dispatch) {
    const userDb = getUserDb(user.name);

    userDb.login(user.name, user.password, (err, response) => {
        if (err) {
          console.error(err);
          return dispatch({error: err.name, type: Action.LoginUser});
        }

        db.sync(userDb, {live: true, retry: true})
          .on("error", console.error.bind(console));
        dispatch({type: Action.LoginUser, user});
        dispatch(push("/collection"));
      });
  };
}

export function signupUser(user: User) {
  return function (dispatch) {
    const userDb = getUserDb(user.name);
    userDb.signup(user.name, user.password, {metadata: {email: user.email}}, (err, response) => {
        if (err) {
          console.error(err);
          return dispatch({error: err.name, type: Action.SignupUser});
        }

        dispatch({type: Action.SignupUser, user});
        dispatch(loginUser(user));
    });
  };
}

function getUserDb(name: string): any {
  let dbUrl = process.env.DATABASE_URL + "/userdb-" + toHex(name);
  return new (PouchDB as any)(dbUrl, {skip_setup: true});
}

function toHex(str: string): string {
  let result = "";
  for (let i=0; i<str.length; i++) {
    result += str.charCodeAt(i).toString(16);
  }
  return result;
}
