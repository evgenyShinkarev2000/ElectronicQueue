import { Component, Input } from '@angular/core';
import { FormGroup } from "@angular/forms";
import { FormStates } from "../auth-form.page.component";
import { AuthService } from "../../../../services/authentication/auth.service";
import { Router } from "@angular/router";
import { FormControlsExtensionModel } from "../../../../view-models/form-validation/form-controls-extension-model";
import { HttpErrorResponse } from "@angular/common/http";

@Component({
    selector: 'app-submit-button',
    templateUrl: './submit-button.component.html',
    styleUrls: ['./submit-button.component.scss']
})
export class SubmitButtonComponent {
    @Input()
    public authForm: FormGroup;
    @Input()
    public formState: FormStates;
    @Input()
    public validService: FormControlsExtensionModel;

    public get submitButtonName(): string {
        return this._submitButtonNameSelector[this.formState];
    }

    private readonly _submitButtonNameSelector: { [key in FormStates]: string } = {
        [FormStates.logIn]: "Войти",
        [FormStates.signUp]: "Зарегистрироваться"
    };

    constructor(private _authService: AuthService, private _router: Router) {
    }

    public submit(): void {
        if (this.formState === FormStates.logIn) {
            this._authService.logIn({
                login: this.authForm.value[this.validService.login.name],
                password: this.authForm.value[this.validService.password.name]
            }).subscribe((wasPassed: boolean) => {
                if (wasPassed) {
                    this._router.navigate(["main_window"]);
                } else {
                    alert("Неверный логин или пароль");
                }
            }, (error: HttpErrorResponse) => {
                console.log("ошибка пролетела в submit, этого быть не должно");
                console.log(error);
            });

            // const result = await this._authService.logIn({
            //     login: this.authForm.value[this.validService.login.name],
            //     password: this.authForm.value[this.validService.password.name]
            // });
            //
            // if (result){
            //     this._router.navigate(["main_window"]);
            // } else{
            //     alert("Неверный логин или пароль");
            // }

        } else if (this.formState === FormStates.signUp) {
            this._authService.signUp({
                login: this.authForm.value[this.validService.login.name],
                password: this.authForm.value[this.validService.password.name],
                firstName: this.authForm.value[this.validService.firstName.name],
                secondName: this.authForm.value[this.validService.secondName.name]
            });
        }
    }

}
