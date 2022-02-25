import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AppFormValidationService} from "../../services/app-form-validation.service";

@Component({
  selector: 'app-sign-in-form',
  templateUrl: './sign-in-form.component.html',
  styleUrls: ['./sign-in-form.component.scss', '../entry-window.component.scss']
})
export class SignInFormComponent implements OnInit {
  @Input() validationService: AppFormValidationService;
  @Input() parentFormGroup: FormGroup;

  constructor() {}
  ngOnInit(): void {}

}
