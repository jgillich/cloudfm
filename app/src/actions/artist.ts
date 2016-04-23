import {Action} from "./";
import {Artist} from "../interfaces";

export interface ArtistAction {
  type: Action;
  artist: Artist;
};
