import { Component, OnInit } from '@angular/core';
import {fader} from "../animations/route-animations";
import {RouterOutlet} from "@angular/router";

@Component({
  selector: 'app-outer',
  templateUrl: './outer.component.html',
  styleUrls: ['./outer.component.css'],
  animations: [
    fader
  ]
})
export class OuterComponent {
  title = 'registerlogin';

  constructor() { }

  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }

}
