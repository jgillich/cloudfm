import {Doc} from "./";

export type Backend = FsBackend | JamendoBackend;

export interface FsBackend extends Doc {
  machine_id: string;
  paths: string[];
}
export interface JamendoBackend extends Doc {
  jamendo_id: number;
}
