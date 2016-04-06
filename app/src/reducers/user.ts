import { LOGIN_USER, SIGNUP_USER, UserAction } from "../actions";
import db from "../store/db";

const userReducer = (state = {}, action: UserAction) => {
  switch (action.type) {
    case LOGIN_USER:
      return state;
    case SIGNUP_USER:
      return state;
    default:
      return state;
  };
};

export default userReducer;
