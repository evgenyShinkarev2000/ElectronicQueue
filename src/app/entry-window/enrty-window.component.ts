import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AppFormValidationService} from "../services/app-form-validation.service";

enum SubmitButtonStates{
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
  private submitButtonNameSelector: {[key in SubmitButtonStates]: string} = {
    [SubmitButtonStates.LogIn]: "Войти",
    [SubmitButtonStates.SignUp]: "Зарегистрироваться"
  }

  constructor(public validationService: AppFormValidationService) {
    this.signForm = new FormGroup({
      login: validationService.getLoginValidator(),
      password: validationService.getPasswordValidator()
    });
  }

  ngOnInit(): void {
  }

  public submit(){}
  public ChangeMode(){
    if (this.submitButtonState === this.submitButtonPossibleStates.SignUp) {
      this.submitButtonState = this.submitButtonPossibleStates.LogIn;
      this.signForm.removeControl("firstName");
      this.signForm.removeControl("secondName");
    }
    else {
      this.submitButtonState = this.submitButtonPossibleStates.SignUp;
      this.signForm.addControl("firstName", this.validationService.getFirstNameValidator());
      this.signForm.addControl("secondName", this.validationService.getSecondNameValidator());
    }

    this.submitButtonName = this.submitButtonNameSelector[this.submitButtonState];
  }

}
