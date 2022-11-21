import {Component} from '@angular/core';
import {RegisterRequest} from "./register-request";
import {Role} from "../domain/role";
import {RegisterService} from "./register.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {

  public rolesValues = Object.values(Role)
  public rolesKeys = Object.keys(Role)


  constructor(private registerService: RegisterService) {
  }

  public onRegister(registerRequest: RegisterRequest): void {

    this.registerService.register(registerRequest).subscribe({
      next: () => {
        console.log("Next has been completed")
      },
      error: err => console.error(err),
      complete: () => console.log("Everything has been completed")
    });

  }
}
