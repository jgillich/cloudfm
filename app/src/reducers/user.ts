import {User} from "../interfaces";
import {Action, UserAction} from "../actions";

const userReducer = (state: User = {logged_in: false}, action: UserAction) => {
  switch (action.type) {
    case Action.LoginUser:
      return Object.assign({}, state, action.user, {logged_in: true});
    case Action.SignupUser:
      return Object.assign({}, state, action.user);
    case Action.UpdateUser:
      return Object.assign({}, state, action.user);
    default:
      return state;
  };
};

export default userReducer;
