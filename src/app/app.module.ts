import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FlexLayoutModule} from "@angular/flex-layout";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatCardModule} from "@angular/material/card";
import {MatFormFieldModule} from "@angular/material/form-field";
import {RegisterComponent} from './components/outer/register/register.component';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatMenuModule} from "@angular/material/menu";
import {MatInputModule} from "@angular/material/input";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {MatTableModule} from "@angular/material/table";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {MatOptionModule} from "@angular/material/core";
import {MatSelectModule} from "@angular/material/select";
import {RouterModule} from "@angular/router";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {MatDividerModule} from "@angular/material/divider";
import {LogInComponent} from "./components/outer/log-in/log-in.component";
import {OuterComponent} from "./components/outer/outer.component";
import { InnerComponent } from './components/inner/inner.component';
import {MatSidenavModule} from "@angular/material/sidenav";
import { GroupsComponent } from './components/inner/groups/groups.component';
import { ProfileComponent } from './components/inner/profile/profile.component';

@NgModule({
  declarations: [
    AppComponent,
    LogInComponent,
    RegisterComponent,
    OuterComponent,
    InnerComponent,
    GroupsComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatToolbarModule,
    MatInputModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatTableModule,
    MatSlideToggleModule,
    MatSelectModule,
    MatOptionModule,
    RouterModule,
    HttpClientModule,
    MatDividerModule,
    MatSidenavModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
