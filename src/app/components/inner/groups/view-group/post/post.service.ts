import { Injectable } from '@angular/core';
import {User} from "../../../../domain/user";
import {Observable, Subject as RxSubject} from "rxjs";
import {Post} from "./post";
import {HttpClient} from "@angular/common/http";
import {AuthenticationService} from "../../../../authentication/authentication.service";
import {AddPostRequest} from "../add-post/add-post-request";
import {environment} from "../../../../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private loggedUser: User;
  public postPusher = new RxSubject<Post>()

  constructor(private httpClient: HttpClient,
              private authenticationService: AuthenticationService) {
    this.loggedUser = authenticationService.getUserFromLocalCache();
  }

  public addPost(addPostRequest: AddPostRequest): Observable<Post>{
    addPostRequest.userId = this.loggedUser.userId
    return this.httpClient.post<Post>(environment.backendApi.addPostUrl,addPostRequest)
  }

  public deletePost(postId: string):Observable<void>{
    return this.httpClient.delete<void>(environment.backendApi.deletePostUrl,{
      params:{
        postId:postId
      }
    })
  }

  public editPost(post: Post): Observable<Post>{
    return this.httpClient.put<Post>(environment.backendApi.editPost,post)
  }
}
