import {Injectable} from '@angular/core';
import {FormControl, ValidatorFn, Validators} from "@angular/forms";


export class FormControlValidator {
  public readonly formControlName: string;
  public readonly formControl: FormControl;

  constructor(name: string, validatorFn: ValidatorFn | ValidatorFn[]) {
    this.formControl = new FormControl(null, validatorFn);
    this.formControlName = name;
  }

  public get isInvalid(): boolean {
    return this.formControl.invalid;
  }

  public get isDirty(): boolean {
    return this.formControl.dirty;
  }

  public get isEmpty(): boolean {
    return this.isError("required");
  }

  private isError(errorName: string): boolean {
    return this.formControl.errors?.[errorName];
  }
}

@Injectable()
export class AppFormValidationService {
  private _login: FormControlValidator;
  private _password: FormControlValidator;
  private _firstName: FormControlValidator;
  private _secondName: FormControlValidator;

  public get login(): FormControlValidator {
    if (this._login === undefined)
      this._login = new FormControlValidator("login", Validators.required);
    return this._login;
  }

  public get password(): FormControlValidator {
    if (this._password === undefined)
      this._password = new FormControlValidator("password", Validators.required);
    return this._password;
  }

  public get firstName(): FormControlValidator {
    if (this._firstName === undefined)
      this._firstName = new FormControlValidator("firstName", Validators.required);
    return this._firstName;
  }

  public get secondName(): FormControlValidator {
    if (this._secondName === undefined)
      this._secondName = new FormControlValidator("secondName", Validators.required);
    return this._secondName;
  }

  constructor() {
  }
}
