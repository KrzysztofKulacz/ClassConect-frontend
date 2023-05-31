import {Role} from "./role";

export interface User {

  userId: string
  username: string;
  email: string;
  role: Role;
  authorities: string[];
  creationDate: Date;

}
