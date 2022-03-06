import {Attribute, Injectable, Input} from '@angular/core';
import {FormControl, ValidationErrors, ValidatorFn, Validators} from "@angular/forms";

//https://stackoverflow.com/questions/59504750/input-types-in-typescript-interface
type HTMLInputTypeAttribute =
  "button"
  | "checkbox"
  | "color"
  | "date"
  | "datetime-local"
  | "email"
  | "file"
  | "hidden"
  | "image"
  | "month"
  | "number"
  | "password"
  | "radio"
  | "range"
  | "reset"
  | "search"
  | "submit"
  | "tel"
  | "text"
  | "time"
  | "url"
  | "week";

interface InputAttributes {
  placeHolder?: string,
  type?: HTMLInputTypeAttribute
}

export interface ValidationErrorName {
  hasError: boolean,
  errorMessage: string
}

export class FormControlExtension extends FormControl {
  public readonly name: string;
  public readonly placeHolder: string;
  public readonly type: HTMLInputTypeAttribute;

  constructor(
    name: string,
    validatorFn?: ValidatorFn | ValidatorFn[],
    attributes?: InputAttributes
  ) {
    super(null, validatorFn);

    if (!name)
      throw new Error("Требуется имя для FormControl");

    this.placeHolder = attributes?.placeHolder ?? name;
    this.type = attributes?.type ?? "text";
    this.name = name;
  }

  public get errorMessages(): string[] {
    const selector: { [key: string]: string } = {
      "required": "Поле Обязательно"
    };

    const errors = Object.keys(this.errors).filter(errorName => this.errors[errorName]);
    const errorMessages: string[] = [];

    errors.forEach(errorName =>
      errorMessages.push(errorName in selector ? selector[errorName] : `Неизвестная ошибка ${errorName}`));

    return errorMessages;
  }
}

@Injectable()
export class AppFormValidationService {
  private _login: FormControlExtension;
  private _password: FormControlExtension;
  private _firstName: FormControlExtension;
  private _secondName: FormControlExtension;

  constructor() {
  }

  public get login(): FormControlExtension {
    if (!this._login)
      this._login = new FormControlExtension("login", Validators.required, {placeHolder: "Логин"});

    return this._login;
  }

  public get password(): FormControlExtension {
    if (!this._password)
      this._password = new FormControlExtension("password", Validators.required, {
        placeHolder: "Пароль",
        type: "password"
      });

    return this._password;
  }

  public get firstName(): FormControlExtension {
    if (!this._firstName)
      this._firstName = new FormControlExtension("firstName", Validators.required, {placeHolder: "Имя"});

    return this._firstName;
  }

  public get secondName(): FormControlExtension {
    if (!this._secondName)
      this._secondName = new FormControlExtension("secondName", Validators.required, {placeHolder: "Фамилия"});

    return this._secondName;
  }
}
