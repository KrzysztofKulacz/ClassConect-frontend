import {Injectable} from '@angular/core';
import {User} from "../domain/user";
import {AuthenticationService} from "../authentication/authentication.service";

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {

  private readonly loggedUser: User;

  constructor(private authenticationService: AuthenticationService) {
    this.loggedUser = this.authenticationService.getUserFromLocalCache();
  }

  public canAddGroup(): boolean {
    return this.loggedUser.authorities.includes("ADD_GROUP")
  }

  public canDeleteGroup(groupAdmin: string): boolean {

    let isLoggedUsersGroup = this.loggedUser.userId === groupAdmin;
    let hasDeleteAuthority = this.loggedUser.authorities.includes("DELETE_OWN_GROUPS");

    return isLoggedUsersGroup && hasDeleteAuthority;
  }
}
