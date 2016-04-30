import {PlayerState} from "../interfaces";
import {Action, PlayerAction} from "../actions";

const playerReducer =
(state: PlayerState = {playing: false, playlist: []}, action: PlayerAction) => {
  switch (action.type) {
    case Action.PlayTrack:
      return Object.assign({}, state, {
        playing: true,
        track: action.track,
        trackIndex: state.playlist.push(action.track) - 1,
      });
    case Action.PausePlayer:
      return Object.assign({}, state, {playing: false});
    case Action.ForwardPlayer:
      if(state.track) {
        let nextTrack = state.playlist[state.trackIndex + 1];
        if(nextTrack) {
          return Object.assign({}, state, {
            track: nextTrack,
            trackIndex: state.trackIndex + 1,
          });
        }
      }
      return state;
    case Action.BackwardPlayer:
      if(state.track) {
        let previousTrack = state.playlist[state.trackIndex - 1];
        if(previousTrack) {
          return Object.assign({}, state, {
            track: previousTrack,
            trackIndex: state.trackIndex - 1,
          });
        }
      }
      return state;
    default:
      return state;
  };
};

export default playerReducer;
