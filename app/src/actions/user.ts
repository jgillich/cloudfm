import {Action} from "./";
import {Dispatch} from "redux";
import * as PouchDB from "pouchdb";
import db from "../store/db";
import {push} from "react-router-redux";
import {User} from "../interfaces";

export interface UserAction {
  type: Action;
  user: User;
};

export function updateUser(user: User): (dispatch: Dispatch) => void {
  return function (dispatch: Dispatch): void {
    const userDb = getUserDb(user.name);
    const metadata = {backends: user.backends, email: user.email};

    userDb.putUser(user.name, {metadata: metadata},
      (err, response) => {
      if (err) {
        console.error(err);
        return dispatch({error: err.error, type: Action.AddError});
      }

      dispatch({type: Action.UpdateUser, user});
    });
  };
}

export function resumeSession(): (dispatch: Dispatch) => void {
  return function (dispatch: Dispatch): void {
    const remoteUrl = process.env.DATABASE_URL + "/_users";
    const allUsersDb = new PouchDB(remoteUrl, {skip_setup: true});

    allUsersDb.getSession((err, response) => {
      if (!err && response.userCtx.name) {
        const userDb = getUserDb(response.userCtx.name);
        db.sync(userDb, {live: true, retry: true})
          .on("error", console.error.bind(console));

        allUsersDb.getUser(response.userCtx.name, (err, response) => {
          if (err) {
            console.error(err);
            return dispatch({error: err.name, type: Action.AddError});
          }

          dispatch({type: Action.LoginUser, user: response});
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
          return dispatch({error: err.error, type: Action.LoginUser});
        }

        userDb.getUser(user.name, (err, response) => {
          if (err) {
            console.error(err);
            return dispatch({error: err.error, type: Action.AddError});
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
        return dispatch({error: err.error, type: Action.AddError});
      }

      dispatch({type: Action.SignupUser, user});
      dispatch(loginUser(user));
    });
  };
}

function getUserDb(name: string): PouchDB {
  const dbUrl = process.env.DATABASE_URL + "/userdb-" + toHex(name);
  return new PouchDB(dbUrl, {skip_setup: true});
}

function toHex(str: string): string {
  let result = "";
  for (let i=0; i<str.length; i++) {
    result += str.charCodeAt(i).toString(16);
  }
  return result;
}
