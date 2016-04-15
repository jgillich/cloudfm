import {Doc} from "./";

export interface Track extends Doc  {
  album: number;
  artist: number;
  name: string;
  number: number;
  uri: string;
}
