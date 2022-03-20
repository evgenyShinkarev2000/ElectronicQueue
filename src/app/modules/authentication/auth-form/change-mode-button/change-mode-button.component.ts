import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormStates } from "../auth-form.page.component";

@Component({
    selector: 'app-change-mode-button',
    templateUrl: './change-mode-button.component.html',
    styleUrls: ['./change-mode-button.component.scss']
})
export class ChangeModeButtonComponent {
    @Input()
    public formState: FormStates;
    @Output()
    public formStateChangeEvent: EventEmitter<void> = new EventEmitter<void>();

    public get changeModeButtonName(): string {
        return this._changeModeButtonNameSelector[this.formState];
    }

    private readonly _changeModeButtonNameSelector: { [key in FormStates]: string } = {
        [FormStates.logIn]: "Регистрация",
        [FormStates.signUp]: "Вход"
    };

    constructor() {
    }

    public changeFormState(): void {
        this.formStateChangeEvent.emit();
    }

}
