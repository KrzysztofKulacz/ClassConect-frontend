import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {User} from "../../../domain/user";
import {AuthenticationService} from "../../../authentication/authentication.service";
import {AddGroupRequest} from "./add-group-request";
import {Observable, Subject as RxSubject} from "rxjs";
import {environment} from "../../../../../environments/environment";
import {Group} from "../group";

@Injectable({
  providedIn: 'root'
})
export class AddGroupService {

  private loggedUser: User;
  public groupPusher = new RxSubject<Group>();

  constructor(private httpClient: HttpClient,
              private authenticationService: AuthenticationService) {
    this.loggedUser = authenticationService.getUserFromLocalCache();
  }

  public addGroup(addGroupRequest: AddGroupRequest): Observable<Group> {
    addGroupRequest.memberEmail = this.loggedUser.email;
    return this.httpClient.post<Group>(environment.backendApi.addGroupUrl, addGroupRequest)
  }
}
