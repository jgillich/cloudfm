import { Track, Action } from "../interfaces";

export const PLAY_TRACK = "PLAY_TRACK";

export interface PlayerAction extends Action {
  track: Track;
};

export function playTrack(track: Track): PlayerAction {
  return {
    type: PLAY_TRACK,
    track,
  };
}
