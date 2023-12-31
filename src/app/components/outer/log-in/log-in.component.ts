import {Component} from '@angular/core';
import {AuthenticationService} from "../../authentication/authentication.service";
import {LoginRequest} from "./login-request";
import {User} from "../../domain/user";
import {HttpResponse} from "@angular/common/http";
import {Router} from "@angular/router";
import {environment} from "../../../../environments/environment";
import {NotifierService} from "angular-notifier";

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent {

  constructor(private authenticationService: AuthenticationService,
              private notifier: NotifierService,
              private router: Router) {
  }

  public onLogin(loginRequest: LoginRequest): void {

    this.authenticationService.login(loginRequest).subscribe({

      next: (loginResponse: HttpResponse<User>) => {
        const token = loginResponse.headers.get("JWT-TOKEN");
        this.authenticationService.saveTokenToLocalCache(token);
        this.authenticationService.saveUserToLocalCache(<User>loginResponse.body);
        this.router.navigateByUrl(environment.path.root)
          .then(() => window.location.reload())
      },
      error: err => {
        console.error(err);
        this.notifier.notify('error', "Logowanie nieudane - sprawdź maila oraz hasło")
      }
    })
  }
}
