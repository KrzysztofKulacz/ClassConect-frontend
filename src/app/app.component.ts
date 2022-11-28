import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {fader} from "./components/animations/route-animations";
import {AuthenticationService} from "./components/auth/authentication.service";
import {environment} from "../environments/environment";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    fader
  ]
})
export class AppComponent implements OnInit{

  public isLoggedIn = false;

  constructor(private router: Router, private authenticationService: AuthenticationService) {
  }

  ngOnInit(): void {
    this.isLoggedIn = this.authenticationService.isUserLogged();
    if (!this.isLoggedIn){
      this.router.navigateByUrl(environment.path.outer.login)
    }
  }


}
