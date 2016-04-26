import {Action} from "./";

export interface ErrorAction {
  type: Action;
  error: string;
};
