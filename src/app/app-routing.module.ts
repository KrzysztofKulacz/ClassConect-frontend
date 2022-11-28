import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RegisterComponent} from "./components/outer/register/register.component";
import {LogInComponent} from "./components/outer/log-in/log-in.component";
import {environment} from "../environments/environment";
import {GroupsComponent} from "./components/inner/groups/groups.component";
import {ProfileComponent} from "./components/inner/profile/profile.component";
import {InnerComponent} from "./components/inner/inner.component";

const routes: Routes = [

  {
    path: environment.path.root,
    component: GroupsComponent,
    data: {
      animation: 'fader'
    }
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
    },
  },
  {
    path: environment.path.inner.landing,
    pathMatch: 'full',
    component: InnerComponent,
    data: {
      animation: 'fader'
    },
  },
  {
    path: environment.path.inner.groups,
    pathMatch: 'full',
    component: GroupsComponent,
    data: {
      animation: 'fader'
    },
  },
  {
    path: environment.path.inner.profile,
    pathMatch: 'full',
    component: ProfileComponent,
    data: {
      animation: 'fader'
    },
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
