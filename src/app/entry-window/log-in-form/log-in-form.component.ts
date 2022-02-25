import {Component, Input, OnInit} from '@angular/core';
import { AppFormValidationService} from "../../services/app-form-validation.service";
import {FormGroup} from "@angular/forms";

@Component({
  selector: 'app-log-in-form',
  templateUrl: './log-in-form.component.html',
  styleUrls: ['./log-in-form.component.scss', '../entry-window.component.scss']
})
export class LogInFormComponent implements OnInit {

  @Input() validationService: AppFormValidationService;
  @Input() parentFormGroup: FormGroup;

  constructor() { }

  ngOnInit(): void {
  }

}
