import { AfterContentInit, Component } from '@angular/core';
import { FormGroup } from "@angular/forms";
import { Location } from "@angular/common";
import { Router } from "@angular/router";
import { FormControlsExtension } from "../../../view-models/form-validation/form-validation-model";
import { FormControlExtension } from "../../../view-models/form-validation/form-control-extension";

export enum FormStates {
    logIn,
    signUp
}

@Component({
    selector: 'app-auth-form',
    templateUrl: './auth-form.component.html',
    styleUrls: ['./auth-form.component.scss'],
    providers: [FormControlsExtension]
})
export class AuthFormPageComponent implements AfterContentInit {
    public formState: FormStates = FormStates.logIn;
    public authFormControlExtensions: FormControlExtension[];
    public readonly authForm: FormGroup;

    private readonly _loginFormControlExtensions: FormControlExtension[] =
        [this.validService.login, this.validService.password];

    private readonly _signupFormControlExtensions: FormControlExtension[] =
        [this.validService.firstName, this.validService.secondName];


    constructor(
        public validService: FormControlsExtension,
        private _location: Location,
        private _router: Router,
    ) {
        this.authForm = new FormGroup({
            [this.validService.login.name]: this.validService.login,
            [this.validService.password.name]: this.validService.password
        });
        this.authFormControlExtensions = this._loginFormControlExtensions.slice();
    }

    public ngAfterContentInit(): void {
        const selector: { [key: string]: FormStates } = {
            "login": FormStates.logIn,
            "signup": FormStates.signUp
        };
        const url: string = this._router.url.slice(1).split("/").pop();
        if (url in selector && this.formState !== selector[url]) {
            this.onChangeModeClick();
        }
    }

    public onChangeModeClick(): void {
        const formStatesCount: number = Object.keys(FormStates).length / 2;
        this.formState = (this.formState + 1) % formStatesCount;
        this.handleFormControls();
    }

    public handleFormControls(): void {
        const selectHandler: { [key in FormStates]: () => void } = {
            [FormStates.logIn]: () => {
                this.removeControls(this._signupFormControlExtensions);
                this.authFormControlExtensions = this._loginFormControlExtensions.slice();
                //Если использовать router вместо location, то сбрасываются значения полей формы и вызывается
                //метод onDestroy
                this._location.go("auth/login");
            },
            [FormStates.signUp]: () => {
                this.addControls(this._signupFormControlExtensions);
                this.authFormControlExtensions.push(...this._signupFormControlExtensions);
                this._location.go("auth/signup");
                // this._router.createUrlTree(["signup"]);
            }
        };
        selectHandler[this.formState]();
    }

    private addControls(formControlExtensions: FormControlExtension[]): void {
        formControlExtensions.forEach((formControlExtension: FormControlExtension) =>
            this.authForm.addControl(
                formControlExtension.name, formControlExtension
            ));
    }

    private removeControls(formControlExtensions: FormControlExtension[]): void {
        formControlExtensions.forEach((formControlExtension: FormControlExtension) =>
            this.authForm.removeControl(formControlExtension.name));
    }

}
