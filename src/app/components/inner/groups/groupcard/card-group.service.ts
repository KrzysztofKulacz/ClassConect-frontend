import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, Subject as RxSubject} from "rxjs";
import {environment} from "../../../../../environments/environment";
import {Group} from "../group";

@Injectable({
  providedIn: 'root'
})
export class CardGroupService {

  public groupRemover = new RxSubject<Group>();

  constructor(private httpClient: HttpClient) {
  }

  public deleteGroup(groupId: string): Observable<void> {
    return this.httpClient.delete<void>(environment.backendApi.deleteGroup, {
      params: {
        groupId: groupId
      }
    })
  }

  public removeUserFromGroup(groupId: string, userId: string): Observable<Group> {
    return this.httpClient.get<Group>(environment.backendApi.removeUserFromGroup, {
      params: {
        groupId: groupId,
        userId: userId
      }
    })
  }
}
