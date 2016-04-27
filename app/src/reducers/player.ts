import {PlayerState} from "../interfaces";
import {Action, PlayerAction} from "../actions";

const playerReducer =
(state: PlayerState = {playing: false}, action: PlayerAction) => {
  switch (action.type) {
    case Action.PlayTrack:
      return {playing: true, track: action.track};
    case Action.PausePlayer:
      return {playing: false, track: state.track};
    default:
      return state;
  };
};

export default playerReducer;
