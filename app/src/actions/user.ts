import { Action } from "../interfaces";

export const LOGIN_USER = "LOGIN_USER";
export const SIGNUP_USER = "SIGNUP_USER";

export interface UserAction extends Action {
  user: {
    name: string;
    password: string;
    metadata?: {
      email: string;
    }
  }
};

export function loginUser(user): UserAction {
  return {
    type: LOGIN_USER,
    user,
  };
}

export function signupUser(user): UserAction {
  return {
    type: LOGIN_USER,
    user,
  };
}
