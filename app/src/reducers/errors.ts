import {Action, ErrorAction} from "../actions";

const errorsReducer = (state = [], action: ErrorAction) => {
  const {type, error} = action;

  if(type === Action.ResetError) {
    return [];
  } else if(error) {
    state.push(action.error);
  }

  return state;
};

export default errorsReducer;
