import { Track, Action } from "../interfaces";

export const ADD_TRACK = "ADD_TRACK";

export interface TrackAction extends Action {
  track: Track;
};

export function addTrack(store, track: Track) {
  store.dispatch({
    type: ADD_TRACK,
    track,
  });
}
