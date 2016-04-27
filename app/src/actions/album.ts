import {Action} from "./";
import {Album} from "../interfaces";

export interface AlbumAction {
  type: Action;
  album: Album;
};
