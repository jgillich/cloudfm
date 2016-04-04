import { Track } from "../interfaces";
import { ADD_TRACK, TrackAction } from "../actions";

const trackReducer = (state: Track[] = [], action: TrackAction) => {
  switch (action.type) {
    case ADD_TRACK:
      return [
        ...state,
        action.track,
      ];
    default:
      return state;
  };
};

export default trackReducer;
