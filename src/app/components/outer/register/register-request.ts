import {Role} from "../../domain/role";

export interface RegisterRequest {

   username: string;
   password: string;
   email: string;
   role: Role;

}
