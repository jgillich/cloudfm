import {Track, Action} from "../interfaces";

export const INSERT_TRACK = "INSERT_TRACK";
export const REMOVE_TRACK = "REMOVE_TRACK";
export const UPDATE_TRACK = "UPDATE_TRACK";

export interface TrackAction extends Action {
  track: Track;
};
