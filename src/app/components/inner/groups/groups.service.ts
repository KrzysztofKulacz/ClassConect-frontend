import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Group} from "./group";
import {environment} from "../../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class GroupsService {

  constructor(private httpClient: HttpClient) {
  }

  public getAllGroups(): Observable<Group[]>{
    return this.httpClient.get<Group[]>(environment.backendApi.getAvailableGroups);
  }

}
