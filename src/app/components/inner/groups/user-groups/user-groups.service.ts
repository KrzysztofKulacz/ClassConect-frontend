import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Group} from "../group";
import {environment} from "../../../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class UserGroupsService {

  constructor(private httpClient: HttpClient) {
  }
  //todo change to id
  public getUserGroups(userMail: string): Observable<Group[]> {
    return this.httpClient.get<Group[]>(environment.backendApi.getAllUserGroups,{
      params:{
        email: userMail
      }
    })
  }
}
