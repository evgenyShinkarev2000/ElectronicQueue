import {Injectable} from '@angular/core';
import {FormControl, Validator, Validators} from "@angular/forms";
import {publish} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AppFormValidationService {
  public loginFormControl: FormControl;
  public passwordFormControl: FormControl;
  public firstNameFormControl: FormControl;
  public secondNameFormControl: FormControl;

  constructor() {
  }

  public getFirstNameValidator(): FormControl {
    this.firstNameFormControl = new FormControl(null, [Validators.required]);
    return this.firstNameFormControl;
  }

  public isFirstNameInvalid(): boolean {
    return this.isFormControlInvalid(this.firstNameFormControl);
  }

  public isFirstNameEmpty(): boolean {
    return this.isError(this.firstNameFormControl, "required");
  }

  public getSecondNameValidator(): FormControl {
    this.secondNameFormControl = new FormControl(null, [Validators.required]);
    return this.secondNameFormControl;
  }

  public isSecondNameInvalid(): boolean {
    return this.isFormControlInvalid(this.secondNameFormControl);
  }

  public isSecondNameEmpty(): boolean {
    return this.isError(this.secondNameFormControl, "required");
  }

  public getLoginValidator(): FormControl {
    this.loginFormControl = new FormControl(null, [Validators.required]);
    return this.loginFormControl;
  }

  public isLoginInvalid(): boolean {
    return this.isFormControlInvalid(this.loginFormControl);
  }

  public isLoginEmpty(): boolean {
    return this.isError(this.loginFormControl, "required");
  }

  public getPasswordValidator(): FormControl {
    this.passwordFormControl = new FormControl(null, [Validators.required]);
    return this.passwordFormControl;
  }

  public isPasswordInvalid(): boolean {
    return this.isFormControlInvalid(this.passwordFormControl);
  }

  public isPasswordEmpty(): boolean {
    return this.isError(this.passwordFormControl, "required");
  }

  public isFormControlInvalid(formControl: FormControl): boolean {
    return formControl.invalid && formControl.touched && formControl.dirty;
  }

  public isError(formControl: FormControl, errorName: string): boolean {
    return formControl.errors?.[errorName];
  }
}
