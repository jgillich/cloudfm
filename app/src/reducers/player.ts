import {PlayerState} from "../interfaces";
import {Action, PlayerAction} from "../actions";

const playerReducer =
(state: PlayerState = {playing: false, playlist: []}, action: PlayerAction) => {
  switch (action.type) {
    case Action.PlayTrack:
      state.playlist.push(action.track);
      return Object.assign({}, state, {playing: true, track: action.track});
    case Action.PausePlayer:
      return Object.assign({}, state, {playing: false});
    default:
      return state;
  };
};

export default playerReducer;
