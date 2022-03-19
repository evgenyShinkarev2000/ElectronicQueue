import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AuthenticationPassedMockComponent } from './authentication-passed-mock/authentication-passed-mock.component';
import { HttpClientModule } from "@angular/common/http";
import { JwtModule } from "@auth0/angular-jwt";
import { AuthFormPageComponent } from './auth-form/auth-form.page.component';
import { SubmitButtonComponent } from './auth-form/submit-button/submit-button.component';
import { ChangeModeButtonComponent } from './auth-form/change-mode-button/change-mode-button.component';
import { FormControlComponent } from './auth-form/form-control/form-control.component';
import { NgxPermissionsModule } from "ngx-permissions";
import {
    UserFunctionMockComponent
} from './authentication-passed-mock/user-function-mock/user-function-mock.component';
import {
    OperatorFunctionMockComponent
} from './authentication-passed-mock/operator-function-mock/operator-function-mock.component';
import {
    AdminFunctionMockComponent
} from './authentication-passed-mock/admin-function-mock/admin-function-mock.component';
import { ErrorPageComponent } from "./error/error.page.component";
import { LocalStorageManagerService } from "./services/local-storage-manager.service";
import { MainWindowComponent } from "./main-window/main-window.page.component";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

const components: any[] = [AppComponent,
    AuthenticationPassedMockComponent,
    AuthFormPageComponent,
    SubmitButtonComponent,
    ChangeModeButtonComponent,
    FormControlComponent,
    UserFunctionMockComponent,
    OperatorFunctionMockComponent,
    AdminFunctionMockComponent,
    ErrorPageComponent,
    MainWindowComponent];


@NgModule({
    declarations: components,
    imports: [

        BrowserModule,
        AppRoutingModule,
        ReactiveFormsModule,
        FormsModule,
        HttpClientModule,
        JwtModule.forRoot({
            config: {
                tokenGetter: () => LocalStorageManagerService.tokenGetter(),
                allowedDomains: ["localhost:44315"],
                disallowedRoutes: []
            }
        }),
        NgxPermissionsModule.forRoot(),
        NgbModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
