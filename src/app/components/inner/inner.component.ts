import {Component, OnInit, ViewChild} from '@angular/core';
import {MatSidenav} from "@angular/material/sidenav";
import {delay, filter} from 'rxjs/operators';
import {BreakpointObserver} from '@angular/cdk/layout';
import {NavigationEnd, Router, RouterOutlet} from '@angular/router';
import {UntilDestroy, untilDestroyed} from '@ngneat/until-destroy';
import {fader} from "../animations/route-animations";
import {environment} from "../../../environments/environment";
import {AuthenticationService} from "../authentication/authentication.service";
import {User} from "../domain/user";
import {Role} from "../domain/role";

@UntilDestroy()
@Component({
  selector: 'app-inner',
  templateUrl: './inner.component.html',
  styleUrls: ['./inner.component.css'],
  animations: [
    fader
  ]
})
export class InnerComponent implements OnInit {

  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;

  user!: User
  roleKeys = Object.keys(Role)
  roleValues = Object.values(Role)

  constructor(private observer: BreakpointObserver,
              private router: Router,
              private authenticationService: AuthenticationService) {
  }

  ngOnInit(): void {
    this.user = this.authenticationService.getUserFromLocalCache();
  }

  ngAfterViewInit() {
    this.observer
      .observe(['(max-width: 800px)'])
      .pipe(delay(1), untilDestroyed(this))
      .subscribe((res) => {
        if (res.matches) {
          this.sidenav.mode = 'over';
          this.sidenav.close();
        } else {
          this.sidenav.mode = 'side';
          this.sidenav.open();
        }
      });

    this.router.events
      .pipe(
        untilDestroyed(this),
        filter((e) => e instanceof NavigationEnd)
      )
      .subscribe(() => {
        if (this.sidenav.mode === 'over') {
          this.sidenav.close();
        }
      });
  }

  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }

  public onLogout(): void {
    this.authenticationService.logOut();
    this.router.navigateByUrl(environment.path.root)
      .then(() => window.location.reload())
  }


}
