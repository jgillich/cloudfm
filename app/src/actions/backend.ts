import * as uuid from "node-uuid";

export const INSERT_BACKEND = "INSERT_BACKEND";
export const REMOVE_BACKEND = "REMOVE_BACKEND";
export const UPDATE_BACKEND = "UPDATE_BACKEND";

export function insertBackend(backend) {
  return {
    backend: Object.assign({}, backend, {_id: uuid.v4(), type: "backend"}),
    type: INSERT_BACKEND,
  };
}
