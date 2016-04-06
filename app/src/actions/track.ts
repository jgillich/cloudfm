import { Track, Action } from "../interfaces";

export const ADD_TRACK = "ADD_TRACK";

export interface TrackAction extends Action {
  track: Track;
};

export function addTrack(track: Track): TrackAction {
  return {
    type: ADD_TRACK,
    track,
  };
}
