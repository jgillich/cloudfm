import {PLAY_TRACK, PlayerAction} from "../actions";

const playerReducer = (state = {}, action: PlayerAction) => {
  switch (action.type) {
    case PLAY_TRACK:
      return action.track;
    default:
      return state;
  };
};

export default playerReducer;
