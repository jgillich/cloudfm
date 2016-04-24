import {Doc} from "./";

export interface User extends Doc {
  name?: string;
  password?: string;
  email?: string;
  backends?: any;
}
