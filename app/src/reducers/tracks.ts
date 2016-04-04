import * as TracksActions from "../actions/tracks";

const tracksReducer = (state = [], action: any) => {
  switch (action.type) {
    case TracksActions.ADD_TRACK:
      return [
        ...state,
        action.track,
      ];
    default:
      return state;
  };
};

export default tracksReducer;
