import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from "../../auth/authentication.service";
import {LoginRequest} from "./login-request";
import {User} from "../../domain/user";
import {HttpResponse} from "@angular/common/http";
import {Router} from "@angular/router";
import {environment} from "../../../../environments/environment";

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent {

  constructor(private authenticationService: AuthenticationService,
              private router: Router) { }

  onLogin(loginRequest: LoginRequest): void {

    this.authenticationService.login(loginRequest).subscribe({

      next: (loginResponse: HttpResponse<User>) => {
        console.log(loginResponse);
        const token = loginResponse.headers.get("JWT-TOKEN");
        this.authenticationService.saveTokenToLocalCache(token);
        this.authenticationService.saveUserToLocalCache(<User>loginResponse.body);
        this.router.navigateByUrl(environment.path.inner.landing);
      },
      error: err => console.error(err)
    })

  }
}
