import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AppFormValidationService} from "../../services/app-form-validation.service";

@Component({
  selector: 'app-sign-in-form',
  templateUrl: './sign-in-form.component.html',
  styleUrls: ['./sign-in-form.component.scss', '../entry-window.component.scss'],
  providers: [AppFormValidationService]
})
export class SignInFormComponent implements OnInit {

  public signForm: FormGroup;
  public isInvalid: boolean = false;

  constructor(public validationService: AppFormValidationService) {
    this.signForm = new FormGroup({
      login: validationService.getLoginValidator(),
      password: validationService.getPasswordValidator()
    });
  }

  ngOnInit(): void {}

  public submit(){}
}
