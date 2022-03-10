import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from "@angular/forms";
import { FormStates } from "../auth-form.component";
import { AppFormValidationService } from "../../services/app-form-validation.service";
import { AuthService } from "../../services/auth.service";
import { Router } from "@angular/router";

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
  public validService: AppFormValidationService;

  public get submitButtonName(): string {
    return this._submitButtonNameSelector[this.formState];
  }

  private readonly _submitButtonNameSelector: { [key in FormStates]: string } = {
    [FormStates.logIn]: "Войти",
    [FormStates.signUp]: "Зарегистрироваться"
  };

  constructor(private _authService: AuthService, private _router: Router) {
  }

  public async submit(): Promise<void> {
    if (this.formState === FormStates.logIn) {
      const wasPassed: boolean = await this._authService.authWithPassword({
        login: this.authForm.value[this.validService.login.name],
        password: this.authForm.value[this.validService.password.name]
      });

      if (wasPassed) {
        this._router.navigate(["main_window"]);
      } else {
        alert("Неверный логин или пароль");
      }
    } else if (this.formState === FormStates.signUp) {
      await this._authService.register({
        login: this.authForm.value[this.validService.login.name],
        password: this.authForm.value[this.validService.password.name],
        firstName: this.authForm.value[this.validService.firstName.name],
        secondName: this.authForm.value[this.validService.secondName.name]
      });
    }
  }

}
