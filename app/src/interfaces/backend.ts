import {Doc} from "./";

export interface FsBackend extends Doc {
  owner: string;
  paths: string[];
}
