import {LOGIN_USER, SIGNUP_USER, UserAction} from "../actions";

const userReducer = (state = {}, action: UserAction) => {
  switch (action.type) {
    case LOGIN_USER:
      return Object.assign({}, state, {user: action.user});
    case SIGNUP_USER:
      return Object.assign({}, state, {user: action.user});
    default:
      return state;
  };
};

export default userReducer;
