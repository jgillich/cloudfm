import {Track} from "../interfaces";

export interface PlayerState {
  playing: boolean;
  track?: Track;
  playlist: Track[];
};
