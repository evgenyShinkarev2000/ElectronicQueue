import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormStates} from "../auth-form.component";

@Component({
  selector: 'app-change-mode-button',
  templateUrl: './change-mode-button.component.html',
  styleUrls: ['./change-mode-button.component.scss']
})
export class ChangeModeButtonComponent implements OnInit {
  @Input() formState: FormStates;
  @Output() formStateChangeEvent = new EventEmitter<void>();
  private readonly _changeModeButtonNameSelector: {[key in FormStates]: string} = {
    [FormStates.logIn]: "Регистрация",
    [FormStates.signUp]: "Вход"
  }

  public get changeModeButtonName(): string{
    return this._changeModeButtonNameSelector[this.formState];
  }

  constructor() { }

  ngOnInit(): void {
  }

  public changeFormState(){
    this.formStateChangeEvent.emit();
  }

}
