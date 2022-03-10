import {Component, Input, OnInit} from '@angular/core';
import {FormGroup} from "@angular/forms";
import {FormStates} from "../auth-form.component";
import {AppFormValidationService} from "../../services/app-form-validation.service";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-submit-button',
  templateUrl: './submit-button.component.html',
  styleUrls: ['./submit-button.component.scss']
})
export class SubmitButtonComponent implements OnInit {
  private readonly _submitButtonNameSelector: {[key in FormStates]: string} = {
    [FormStates.logIn]: "Войти",
    [FormStates.signUp]: "Зарегистрироваться"
  }

  public get submitButtonName(): string{
    return this._submitButtonNameSelector[this.formState];
  }

  @Input() authForm: FormGroup;
  @Input() formState: FormStates;
  @Input() validService: AppFormValidationService;



  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  public async submit() {
    if (this.formState === FormStates.logIn) {
      const wasPassed = await this.authService.authWithPassword({
        login: this.authForm.value[this.validService.login.name],
        password: this.authForm.value[this.validService.password.name]
      });

      if (wasPassed)
        this.router.navigate(["main_window"]);
      else {
        alert("Неверный логин или пароль");
      }
    } else if(this.formState === FormStates.signUp){
      const wasPassed = await this.authService.register({
        login: this.authForm.value[this.validService.login.name],
        password: this.authForm.value[this.validService.password.name],
        firstName: this.authForm.value[this.validService.firstName.name],
        secondName: this.authForm.value[this.validService.secondName.name]
      });
    }
  }

}
