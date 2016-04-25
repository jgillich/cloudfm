import {Action} from "../actions";

const errorReducer = (state = null, action: {type: Action, error: string}) => {
  const {type, error} = action;

  if(type == Action.ResetError) {
    return null;
  } else if (error) {
    return action.error;
  }

  return state;
};

export default errorReducer;
