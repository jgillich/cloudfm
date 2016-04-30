import {Action} from "./";
import {Track} from "../interfaces";

export interface PlayerAction {
  type: Action;
  track?: Track;
};

export enum PlayerState {
  Playing,
  Paused
};

export function playTrack(track: Track): PlayerAction {
  return {
    type: Action.PlayTrack,
    track,
  };
}

export function forwardPlayer(): PlayerAction {
  return {
    type: Action.ForwardPlayer,
  };
};

export function backwardPlayer(): PlayerAction {
  return {
    type: Action.BackwardPlayer,
  };
};

export function pausePlayer(): PlayerAction {
  return {
    type: Action.PausePlayer,
  };
};
