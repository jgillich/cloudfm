import {Track} from "../interfaces";
import {INSERT_TRACK, REMOVE_TRACK, UPDATE_TRACK, TrackAction} from "../actions";

const trackReducer = (state: Track[] = [], action: TrackAction) => {
  switch (action.type) {
    case INSERT_TRACK:
      return [ ...state, action.track ];
    case REMOVE_TRACK:
      return state.filter(t => t._id != action.track._id);
    case UPDATE_TRACK:
      return state.map(t => t._id == action.track._id && action.track || t);
    default:
      return state;
  };
};

export default trackReducer;
