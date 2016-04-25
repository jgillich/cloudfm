import {Action} from "./";
import {Dispatch} from "redux";
import * as PouchDB from "pouchdb";
import db from "../store/db";
import {push} from "react-router-redux";
import {User} from "../interfaces";

export interface UserAction {
  type: Action;
  user: User;
  status?: string;
};

export function updateUser(user: User): (dispatch: Dispatch) => void {
  return function (dispatch: Dispatch): void {
    const userDb = getUserDb(user.name);
    const metadata = {backends: user.backends, email: user.email};

    userDb.putUser(user.name, {metadata: metadata},
      (err, response) => {
      if (err) {
        console.error(err);
        return dispatch({error: err.name, type: Action.UpdateUser});
      }

      dispatch({type: Action.UpdateUser, user});
    });
  };
}

export function resumeSession(): (dispatch: Dispatch) => void {
  return function (dispatch: Dispatch): void {
    const remoteUrl = process.env.DATABASE_URL + "/_users";
    /* tslint:disable:no-any */
    const remoteDb = new (PouchDB as any)(remoteUrl, {skip_setup: true});
    /* tslint:enable */

    remoteDb.getSession((err, response) => {
      if (!err && response.userCtx.name) {
        const userDb = getUserDb(response.userCtx.name);
        db.sync(userDb, {live: true, retry: true})
          .on("error", console.error.bind(console));

        remoteDb.getUser(response.userCtx.name, (err, response) => {
          if (err) {
            console.error(err);
            return dispatch({error: err.name, type: Action.LoginUser});
          }

          dispatch({type: Action.LoginUser, user: response});
          dispatch(push("/collection"));
        });
      } else {
        dispatch(push("/login"));
      }
    });
  };
}

export function loginUser(user: User): (dispatch: Dispatch) => void {
  return function (dispatch: Dispatch): void {
    const userDb = getUserDb(user.name);

    userDb.login(user.name, user.password, (err, response) => {
        if (err) {
          console.error(err);
          return dispatch({error: err.name, type: Action.LoginUser});
        }

        userDb.getUser(user.name, (err, response) => {
          if (err) {
            console.error(err);
            return dispatch({error: err.name, type: Action.LoginUser});
          }

          db.sync(userDb, {live: true, retry: true})
            .on("error", console.error.bind(console));

          dispatch({type: Action.LoginUser, user: response});
          dispatch(push("/collection"));
        });
      });
  };
}

export function signupUser(user: User): (dispatch: Dispatch) => void {
  return function (dispatch: Dispatch): void {
    const userDb = getUserDb(user.name);
    userDb.signup(user.name, user.password, {metadata: {email: user.email}},
      (err, response) => {
      if (err) {
        console.error(err);
        return dispatch({error: err.name, type: Action.SignupUser});
      }

      dispatch({type: Action.SignupUser, user});
      dispatch(loginUser(user));
    });
  };
}

/* tslint:disable:no-any */
function getUserDb(name: string): any {
  let dbUrl = process.env.DATABASE_URL + "/userdb-" + toHex(name);
  return new (PouchDB as any)(dbUrl, {skip_setup: true});
}
/* tslint:enable */

function toHex(str: string): string {
  let result = "";
  for (let i=0; i<str.length; i++) {
    result += str.charCodeAt(i).toString(16);
  }
  return result;
}
