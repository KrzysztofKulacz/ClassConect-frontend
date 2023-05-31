import {Component} from '@angular/core';
import {RegisterRequest} from "./register-request";
import {Role} from "../../domain/role";
import {RegisterService} from "./register.service";
import {NotifierService} from "angular-notifier";
import {Router} from "@angular/router";
import {environment} from "../../../../environments/environment";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {

  public rolesValues = Object.values(Role)
  public rolesKeys = Object.keys(Role)


  constructor(private registerService: RegisterService, private notifierService: NotifierService,
              private router: Router) {
  }

  public onRegister(registerRequest: RegisterRequest): void {

    this.registerService.register(registerRequest).subscribe({
      next: () => {
        console.log("Next has been completed")
      },
      error: err => console.error(err),
      complete: () => console.log("Everything has been completed")
    });

    this.notifierService.notify('success', 'Rejestracaj się powiodła, sprawdz email' );
    this.router.navigateByUrl(environment.path.outer.login);
  }
}
