import {Doc, Backend} from "./";

export interface User extends Doc {
  name?: string;
  password?: string;
  email?: string;
  backends?: Backend[];
}
