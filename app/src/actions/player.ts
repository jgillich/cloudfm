import {Action} from "./";
import {Track} from "../interfaces";

export interface PlayerAction {
  type: Action;
  track: Track;
};

export function playTrack(track: Track): PlayerAction {
  return {
    type: Action.PlayTrack,
    track,
  };
}
