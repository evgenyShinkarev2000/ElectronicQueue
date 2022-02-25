import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EntryWindowComponent } from './entry-window/enrty-window.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { SignInFormComponent } from './entry-window/sign-in-form/sign-in-form.component';
import { LogInFormComponent } from './entry-window/log-in-form/log-in-form.component';

@NgModule({
  declarations: [
    AppComponent,
    EntryWindowComponent,
    SignInFormComponent,
    LogInFormComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
