import {Track} from "../interfaces";

export interface PlayerState {
  playing: boolean;
  track?: Track;
  trackIndex?: number;
  playlist: Track[];
};
