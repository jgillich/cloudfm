function errorReducer(state = null, action) {
  const {type, error} = action;

  if(type == "RESET_ERROR") {
    return null;
  } else if (error) {
    return action.error;
  }

  return state;
}

export default errorReducer;
