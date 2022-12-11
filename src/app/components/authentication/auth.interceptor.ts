import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AuthenticationService} from "./authentication.service";
import {environment} from "../../../environments/environment";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authenticationService: AuthenticationService) {
  }

  intercept(request: HttpRequest<unknown>, httpHandler: HttpHandler): Observable<HttpEvent<any>> {

    if (request.url.includes(environment.backendApi.loginUrl) || request.url.includes(environment.backendApi.registerUrl)) {
      return httpHandler.handle(request);
    }

    const cloneRequest = request.clone({
      headers: request.headers.set('Authorization', `Bearer ${this.authenticationService.getTokenFromLocalCache()}`)
    })

    return httpHandler.handle(cloneRequest);
  }
}
