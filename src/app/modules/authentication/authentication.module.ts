import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthenticationRoutingModule } from './authentication-routing.module';
import { AuthFormPageComponent } from "./auth-form/auth-form.page.component";
import { SubmitButtonComponent } from "./auth-form/submit-button/submit-button.component";
import { ChangeModeButtonComponent } from "./auth-form/change-mode-button/change-mode-button.component";
import { FormControlComponent } from "./auth-form/form-control/form-control.component";
import { AuthenticationPageComponent } from "./authentication.page.component";
import { ReactiveFormsModule } from "@angular/forms";


@NgModule({
    declarations: [
        AuthenticationPageComponent,
        AuthFormPageComponent,
        SubmitButtonComponent,
        ChangeModeButtonComponent,
        FormControlComponent,
        AuthenticationPageComponent,
    ],
    imports: [
        CommonModule,
        AuthenticationRoutingModule,
        ReactiveFormsModule
    ]
})
export class AuthenticationModule {
}
