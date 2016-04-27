import {Doc} from "./";

export interface Track extends Doc {
  album: string;
  artist: string;
  name: string;
  number: number;
  uris: string[];
}
