import {Component} from '@angular/core';
import {RouterOutlet} from "@angular/router";
import {fader} from "./components/animations/route-animations";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    fader
  ]
})
export class AppComponent {
  title = 'registerlogin';
  isLoggedIn = false;

}
