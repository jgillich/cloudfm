import {Action} from "./";
import {Track} from "../interfaces";

export interface TrackAction {
  type: Action;
  track: Track;
};
