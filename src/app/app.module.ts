import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AuthenticationPassedMockComponent} from './authentication-passed-mock/authentication-passed-mock.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {AuthService} from "./services/auth.service";
import {JwtModule} from "@auth0/angular-jwt";
import {AuthFormComponent} from './auth-form/auth-form.component';
import {SubmitButtonComponent} from './auth-form/submit-button/submit-button.component';
import {ChangeModeButtonComponent} from './auth-form/change-mode-button/change-mode-button.component';
import {FormControlComponent} from './auth-form/form-control/form-control.component';
import {NgxPermissionsModule} from "ngx-permissions";
import { UserFunctionMockComponent } from './authentication-passed-mock/user-function-mock/user-function-mock.component';
import { OperatorFunctionMockComponent } from './authentication-passed-mock/operator-function-mock/operator-function-mock.component';
import { AdminFunctionMockComponent } from './authentication-passed-mock/admin-function-mock/admin-function-mock.component';


@NgModule({
  declarations: [
    AppComponent,
    AuthenticationPassedMockComponent,
    AuthFormComponent,
    SubmitButtonComponent,
    ChangeModeButtonComponent,
    FormControlComponent,
    UserFunctionMockComponent,
    OperatorFunctionMockComponent,
    AdminFunctionMockComponent
  ],
  imports: [

    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    JwtModule.forRoot({
      config:{
        tokenGetter: () => localStorage.getItem("auth-token"),
        allowedDomains: [ "localhost:44315"],
        disallowedRoutes: []
      }
    }),
    NgxPermissionsModule.forRoot()
  ],
  providers:[],
  bootstrap: [AppComponent]
})
export class AppModule { }
