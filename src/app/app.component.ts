import {Component} from '@angular/core';
import {Router} from "@angular/router";
import {fader} from "./components/animations/route-animations";
import {AuthenticationService} from "./components/auth/authentication.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    fader
  ]
})
export class AppComponent {

  public isLoggedIn = false;

  constructor(private router: Router, private authenticationService: AuthenticationService) {
    this.isLoggedIn = authenticationService.isUserLogged()
  }
}
