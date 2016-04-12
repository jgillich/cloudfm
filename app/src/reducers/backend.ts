import {INSERT_BACKEND, REMOVE_BACKEND, UPDATE_BACKEND} from "../actions";

const backendReducer = (state = [], action) => {
  switch (action.type) {
    case INSERT_BACKEND:
      return [ ...state, action.backend ];
    case REMOVE_BACKEND:
      return state.filter(b => b._id !== action.backend._id);
    case UPDATE_BACKEND:
      return state.map(b => b._id === action.backend._id ? action.backend : b);
    default:
      return state;
  };
};

export default backendReducer;
