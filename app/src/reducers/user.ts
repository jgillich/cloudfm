import {Action, UserAction} from "../actions";

const userReducer = (state = {}, action: UserAction) => {
  switch (action.type) {
    case Action.LoginUser:
      return Object.assign({}, state, {user: action.user});
    case Action.SignupUser:
      return Object.assign({}, state, {user: action.user});
    default:
      return state;
  };
};

export default userReducer;
