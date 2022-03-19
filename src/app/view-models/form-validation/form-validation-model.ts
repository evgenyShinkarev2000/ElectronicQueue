import { Validators } from "@angular/forms";
import { FormControlExtension } from "./form-control-extemsion";

export class AppFormValidationService {
    private _login: FormControlExtension;
    private _password: FormControlExtension;
    private _firstName: FormControlExtension;
    private _secondName: FormControlExtension;

    constructor() {
    }

    public get login(): FormControlExtension {
        if (!this._login) {
            this._login = new FormControlExtension("login", Validators.required, { placeHolder: "Логин" });
        }

        return this._login;
    }

    public get password(): FormControlExtension {
        if (!this._password) {
            this._password = new FormControlExtension("password", Validators.required, {
                placeHolder: "Пароль",
                type: "password"
            });
        }

        return this._password;
    }

    public get firstName(): FormControlExtension {
        if (!this._firstName) {
            this._firstName = new FormControlExtension("firstName", Validators.required, { placeHolder: "Имя" });
        }

        return this._firstName;
    }

    public get secondName(): FormControlExtension {
        if (!this._secondName) {
            this._secondName = new FormControlExtension("secondName", Validators.required, { placeHolder: "Фамилия" });
        }

        return this._secondName;
    }
}
