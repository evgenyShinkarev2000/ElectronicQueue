import {Component, OnInit} from '@angular/core';
import {FormGroup} from "@angular/forms";
import {AppFormValidationService} from "../services/app-form-validation.service";

enum SubmitButtonStates {
  LogIn,
  SignUp
}

@Component({
  selector: 'app-entry-window',
  templateUrl: './entry-window.component.html',
  styleUrls: ['./entry-window.component.scss'],
  providers: [AppFormValidationService]
})
export class EntryWindowComponent implements OnInit {

  public signForm: FormGroup;
  public submitButtonName: string = "войти";
  public submitButtonPossibleStates = SubmitButtonStates;
  public submitButtonState: SubmitButtonStates = SubmitButtonStates.LogIn;
  private readonly submitButtonNameSelector: { [key in SubmitButtonStates]: string } = {
    [SubmitButtonStates.LogIn]: "Войти",
    [SubmitButtonStates.SignUp]: "Зарегистрироваться"
  }

  constructor(public validationService: AppFormValidationService) {
    this.signForm = new FormGroup({
      [validationService.login.formControlName]: validationService.login.formControl,
      [validationService.password.formControlName]: validationService.password.formControl
    });
  }

  ngOnInit(): void {
  }

  public submit() {
  }

  public ChangeMode() {
    if (this.submitButtonState === this.submitButtonPossibleStates.SignUp) {
      this.submitButtonState = this.submitButtonPossibleStates.LogIn;
      this.signForm.removeControl(this.validationService.firstName.formControlName);
      this.signForm.removeControl(this.validationService.secondName.formControlName);
    } else {
      this.submitButtonState = this.submitButtonPossibleStates.SignUp;
      this.signForm.addControl(this.validationService.firstName.formControlName, this.validationService.firstName.formControl);
      this.signForm.addControl(this.validationService.secondName.formControlName, this.validationService.secondName.formControl);
    }

    this.submitButtonName = this.submitButtonNameSelector[this.submitButtonState];
  }
}
