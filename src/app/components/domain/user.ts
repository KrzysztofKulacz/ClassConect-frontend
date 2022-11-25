import {Role} from "./role";

export interface User {

  username: string;
  email: string;
  role: Role;
  authorities: string[];
  creationDate: Date;

}
