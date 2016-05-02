import {Doc} from "./";

export type Backend = FileBackend | JamendoBackend;

export interface FileBackend extends Doc {
  machine_id: string;
  paths: string[];
}

export function isFileBackend(backend: Backend): backend is FileBackend {
  return backend.type === "file";
}

export interface JamendoBackend extends Doc {
  user_name: string;
}

export function isJamendoBackend(backend: Backend): backend is JamendoBackend {
  return backend.type === "jamendo";
}
