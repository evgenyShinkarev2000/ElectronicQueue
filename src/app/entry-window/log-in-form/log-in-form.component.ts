import { Component, OnInit } from '@angular/core';
import { AppFormValidationService} from "../../services/app-form-validation.service";

@Component({
  selector: 'app-log-in-form',
  templateUrl: './log-in-form.component.html',
  styleUrls: ['./log-in-form.component.scss', '../entry-window.component.scss'],
  providers: [AppFormValidationService]
})
export class LogInFormComponent implements OnInit {

  constructor(public validationService: AppFormValidationService) { }

  ngOnInit(): void {
  }

}
