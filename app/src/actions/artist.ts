import {Artist, Action} from "../interfaces";

export const INSERT_ARTIST = "INSERT_ARTIST";
export const REMOVE_ARTIST = "REMOVE_ARTIST";
export const UPDATE_ARTIST = "UPDATE_ARTIST";

export interface ArtistAction extends Action {
  artist: Artist;
};
