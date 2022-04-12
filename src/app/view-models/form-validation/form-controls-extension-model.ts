import { Validators } from "@angular/forms";
import { FormControlExtension } from "./form-control-extension";

export class FormControlsExtensionModel {
    private _login: FormControlExtension;
    private _password: FormControlExtension;
    private _firstName: FormControlExtension;
    private _secondName: FormControlExtension;

    constructor() {
    }

    public get login(): FormControlExtension {
        if (!this._login) {
            this._login = new FormControlExtension("login", Validators.required, {
                placeHolder: "Логин",
                descriptionLabel: "Логин"
            });
        }

        return this._login;
    }

    public get password(): FormControlExtension {
        if (!this._password) {
            this._password = new FormControlExtension("password", Validators.required, {
                descriptionLabel: "Пароль",
                type: "password",
                placeHolder: "Пароль"
            });
        }

        return this._password;
    }

    public get firstName(): FormControlExtension {
        if (!this._firstName) {
            this._firstName = new FormControlExtension("firstName", Validators.required, {
                placeHolder: "Имя",
                descriptionLabel: "Имя"
            });
        }

        return this._firstName;
    }

    public get secondName(): FormControlExtension {
        if (!this._secondName) {
            this._secondName = new FormControlExtension("secondName", Validators.required, {
                placeHolder: "Фамилия",
                descriptionLabel: "Фамилия"
            });
        }

        return this._secondName;
    }

    public getFormControlExtensionsDict(): { [key: string]: FormControlExtension } {
        return {
            [this.login.name]: this.login,
            [this.password.name]: this.password,
            [this.firstName.name]: this.firstName,
            [this.secondName.name]: this.secondName
        };
    }

    public getFormControlExtensionsList(): FormControlExtension[] {
        return Object.values(this.getFormControlExtensionsDict());
    }
}
