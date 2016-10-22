import {Action} from "./";
import {Dispatch} from "redux";
import {getLocalDb, getRemoteDb, getUsersDb} from "../db";
import {User} from "../interfaces";
import {push} from "react-router-redux";

export interface UserAction {
  type: Action;
  user: User;
};

export function getUser(user: User): (dispatch: Dispatch<UserAction>) => void {
  return function(dispatch: Dispatch<UserAction>): void {
    const remoteDb = getRemoteDb(user.name);

    remoteDb.getUser(user.name, (err, user) => {
      if(err) {
        console.error(err);
        return dispatch({error: err.error, type: Action.AddError});
      }

      dispatch({type: Action.UpdateUser, user});
    });
  };
}

export function updateUser(user: User): (dispatch: Dispatch<UserAction>) => void {
  return function(dispatch: Dispatch<UserAction>): void {
    const remoteDb = getRemoteDb(user.name);
    const metadata = {backends: user.backends, email: user.email};

    remoteDb.putUser(user.name, {metadata: metadata},
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
  (dispatch: Dispatch<UserAction>) => void {
  return function(dispatch: Dispatch<UserAction>): void {
    const usersDb = getUsersDb();

    usersDb.getSession((err, response) => {
      if(!err && response.userCtx.name) {
        const remoteDb = getRemoteDb(response.userCtx.name);
        const localDb = getLocalDb(response.userCtx.name);
        localDb.sync(remoteDb, {live: true, retry: true})
          .on("error", console.error.bind(console));

        usersDb.getUser(response.userCtx.name, (err, user) => {
          if(err) {
            console.error(err);
            callback(false);
            return dispatch({error: err.name, type: Action.AddError});
          }

          dispatch({type: Action.LoginUser, user: user});
          callback(true);
        });
      } else {
        callback(false);
      }
    });
  };
}

export function loginUser(user: User, redirectTo: string): (dispatch: Dispatch<UserAction>) => void {
  return function(dispatch: Dispatch<UserAction>): void {
    const remoteDb = getRemoteDb(user.name);

    remoteDb.login(user.name, user.password, (err, response) => {
      if(err) {
        console.error(err);
        return dispatch({error: err.error, type: Action.LoginUser});
      }

      remoteDb.getUser(user.name, (err, user) => {
        if(err) {
          console.error(err);
          return dispatch({error: err.error, type: Action.AddError});
        }

        const localDb = getLocalDb(user.name);
        localDb.sync(remoteDb, {live: true, retry: true})
          .on("error", console.error.bind(console));

        dispatch({type: Action.LoginUser, user: user});
        dispatch(push(redirectTo));
      });
    });
  };
}

export function signupUser(user: User, redirectTo: string): (dispatch: Dispatch<UserAction>) => void {
  return function(dispatch: Dispatch<UserAction>): void {
    const usersDb = getUsersDb();
    usersDb.signup(user.name, user.password,
      {metadata: {backends: [], email: user.email}},
      (err, response) => {
        if(err) {
          console.error(err);
          return dispatch({error: err, type: Action.AddError});
        }

        dispatch({type: Action.SignupUser, user});
        dispatch(loginUser(user, redirectTo));
      });
  };
}

