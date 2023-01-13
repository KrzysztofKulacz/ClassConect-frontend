import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../../../environments/environment";
import {Subject as RxSubject} from "rxjs";
import {Group} from "../group";

@Injectable({
  providedIn: 'root'
})
export class DeleteGroupService {

  public groupRemover = new RxSubject<Group>();

  constructor(private httpClient: HttpClient) {
  }

  public deleteGroup(groupId: string): Observable<void>{
    return this.httpClient.delete<void>(environment.backendApi.deleteGroup,{
      params:{
        groupId: groupId
      }
    })
  }
}
