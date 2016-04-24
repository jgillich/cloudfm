import {User} from "../interfaces";
import {Action, UserAction} from "../actions";

const userReducer = (state: User = {}, action: UserAction) => {
  state.backends = state.backends || [];
  console.log(state);
  switch (action.type) {
    case Action.LoginUser:
      return Object.assign({}, state, action.user);
    case Action.SignupUser:
      return Object.assign({}, state, action.user);
    case Action.UpdateUser:
      return Object.assign({}, state, action.user);
    default:
      return state;
  };
};

export default userReducer;
