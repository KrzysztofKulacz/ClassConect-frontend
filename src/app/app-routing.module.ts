import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RegisterComponent} from "./components/outer/register/register.component";
import {LogInComponent} from "./components/outer/log-in/log-in.component";
import {environment} from "../environments/environment";

const routes: Routes = [

  {
    path: '',
    pathMatch: 'full',
    redirectTo: environment.path.outer.login,
  },
  {
    path: environment.path.outer.login,
    component: LogInComponent,
    data: {
      animation: 'fader'
    }
  },
  {
    path: environment.path.outer.register,
    component: RegisterComponent,
    data: {
      animation: 'fader'
    }
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
