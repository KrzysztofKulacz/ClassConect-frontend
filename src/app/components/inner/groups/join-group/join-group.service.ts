import {Injectable} from '@angular/core';
import {JoinGroupRequest} from "./join-group-request";
import {Observable} from "rxjs";
import {Group} from "../group";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../../environments/environment";
import {User} from "../../../domain/user";
import {AuthenticationService} from "../../../authentication/authentication.service";

@Injectable({
  providedIn: 'root'
})
export class JoinGroupService {

  private loggedUser: User;

  constructor(private httpClient: HttpClient,
              private authenticationService: AuthenticationService) {
    this.loggedUser = authenticationService.getUserFromLocalCache();

  }

  public joinGroup(joinGroupRequest: JoinGroupRequest): Observable<Group> {
    joinGroupRequest.userMail = this.loggedUser.email
    return this.httpClient.post<Group>(environment.backendApi.joinGroupUrl, joinGroupRequest)
  }
}
