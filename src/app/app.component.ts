import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {fader} from "./components/animations/route-animations";
import {environment} from "../environments/environment";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    fader
  ]
})
export class AppComponent implements OnInit {
  title = 'registerlogin';
  isLoggedIn = true;

  constructor(private router: Router) {
  }


  ngOnInit(): void {
    if (this.isLoggedIn) {
      this.router.navigateByUrl(environment.path.inner.groups)
    }else {
      this.router.navigateByUrl(environment.path.outer.login)
    }

  }
}
