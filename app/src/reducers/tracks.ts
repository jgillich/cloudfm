import {Track} from "../interfaces";
import {Action, TrackAction} from "../actions";

function tracksReducer(state: Track[] = [], action: TrackAction): Track[] {
  switch (action.type) {
    case Action.InsertTrack:
      return [ ...state, action.track ];
    case Action.RemoveTrack:
      return state.filter(t => t._id !== action.track._id);
    case Action.UpdateTrack:
      return state.map(t => t._id === action.track._id ? action.track : t);
    default:
      return state;
  };
};

export default tracksReducer;
