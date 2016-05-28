import {Action} from "./";
import {Dispatch} from "redux";
import * as PouchDB from "pouchdb";
import db from "../store/db";
import {User} from "../interfaces";
import {push} from "react-router-redux";

export interface UserAction {
  type: Action;
  user: User;
};

export function updateUser(user: User): (dispatch: Dispatch) => void {
  return function(dispatch: Dispatch): void {
    const userDb = getUserDb(user.name);
    const metadata = {backends: user.backends, email: user.email};

    userDb.putUser(user.name, {metadata: metadata},
      (err, response) => {
        if(err) {
          console.error(err);
          return dispatch({error: err.error, type: Action.AddError});
        }

        dispatch({type: Action.UpdateUser, user});
      });
  };
}

export function resumeSession(callback: (loggedIn: boolean) => void):
  (dispatch: Dispatch) => void {
  return function(dispatch: Dispatch): void {
    const allUsersDb = getAllUsersDb();

    allUsersDb.getSession((err, response) => {
      if(!err && response.userCtx.name) {
        const userDb = getUserDb(response.userCtx.name);
        db.sync(userDb, {live: true, retry: true})
          .on("error", console.error.bind(console));

        allUsersDb.getUser(response.userCtx.name, (err, user) => {
          if(err) {
            console.error(err);
            callback(false);
            return dispatch({error: err.name, type: Action.AddError});
          }

          listenUser(user, dispatch);
          dispatch({type: Action.LoginUser, user: user});
          callback(true);
        });
      } else {
        callback(false);
      }
    });
  };
}

export function loginUser(user: User, redirectTo: string): (dispatch: Dispatch) => void {
  return function(dispatch: Dispatch): void {
    const userDb = getUserDb(user.name);

    userDb.login(user.name, user.password, (err, response) => {
      if(err) {
        console.error(err);
        return dispatch({error: err.error, type: Action.LoginUser});
      }

      userDb.getUser(user.name, (err, user) => {
        if(err) {
          console.error(err);
          return dispatch({error: err.error, type: Action.AddError});
        }

        db.sync(userDb, {live: true, retry: true})
          .on("error", console.error.bind(console));

        listenUser(user, dispatch);
        dispatch({type: Action.LoginUser, user: user});
        dispatch(push(redirectTo));
      });
    });
  };
}

export function signupUser(user: User, redirectTo: string): (dispatch: Dispatch) => void {
  return function(dispatch: Dispatch): void {
    const userDb = getUserDb(user.name);
    userDb.signup(user.name, user.password,
      {metadata: { email: user.email, backends: []}},
      (err, response) => {
        if(err) {
          console.error(err);
          return dispatch({error: err.error, type: Action.AddError});
        }

        dispatch({type: Action.SignupUser, user});
        dispatch(loginUser(user, redirectTo));
      });
  };
}

function listenUser(user: User, dispatch: Dispatch): void {
  (getAllUsersDb() as any).changes({
    live: true,
    since: 'now',
    include_docs: true,
    doc_ids: [user._id],
  }).on('change', function(change) {
    dispatch({type: Action.UpdateUser, user: change.doc});
  });
}

function getAllUsersDb(): PouchDB {
  const remoteUrl = process.env.DATABASE_URL + "/_users";
  return new PouchDB(remoteUrl, {skip_setup: true});

}

function getUserDb(name: string): PouchDB {
  const dbUrl = process.env.DATABASE_URL + "/userdb-" + toHex(name);
  return new PouchDB(dbUrl, {skip_setup: true});
}

function toHex(str: string): string {
  let result = "";
  for(let i = 0; i < str.length; i++) {
    result += str.charCodeAt(i).toString(16);
  }
  return result;
}
