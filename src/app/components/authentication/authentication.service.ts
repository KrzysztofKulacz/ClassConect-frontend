import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from "@angular/common/http";
import {Router} from "@angular/router";
import {LoginRequest} from "../outer/log-in/login-request";
import {Observable} from "rxjs";
import {User} from "../domain/user";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private httpClient: HttpClient,
              private router: Router) {
  }

  public login(loginRequest: LoginRequest): Observable<HttpResponse<User>> {
    return this.httpClient.post<User>(environment.backendApi.loginUrl, loginRequest, {observe: 'response'})
  }

  public isUserLogged(): boolean {

    let token = this.getTokenFromLocalCache();

    if (token == null) {
      return false;
    }

    return true;
  }

  public saveTokenToLocalCache(token: string | null): void {
    localStorage.setItem(environment.auth.tokenKey, <string>token);
  }

  public saveUserToLocalCache(user: User): void {
    localStorage.setItem(environment.auth.userKey, JSON.stringify(user));
  }

  public getTokenFromLocalCache(): string | null {
    return localStorage.getItem(environment.auth.tokenKey);
  }

  public getUserFromLocalCache(): User {
    return JSON.parse(<string>localStorage.getItem(environment.auth.userKey));
  }

  public removeTokenFromLocalCache(): void {
    localStorage.removeItem(environment.auth.tokenKey);
  }

  public removeUserFromLocalCache(): void {
    localStorage.removeItem(environment.auth.userKey)
  }

  public logOut(): void {

    this.removeTokenFromLocalCache();
    this.removeUserFromLocalCache();
    this.router.navigateByUrl(environment.path.outer.login);

  }
}
