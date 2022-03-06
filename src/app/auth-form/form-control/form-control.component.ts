import {Component, Input, OnInit} from '@angular/core';
import {FormControlExtension} from "../../services/app-form-validation.service";
import {FormGroup} from "@angular/forms";

@Component({
  selector: 'app-form-control',
  templateUrl: './form-control.component.html',
  styleUrls: ['./form-control.component.scss']
})
export class FormControlComponent implements OnInit {

  @Input() formControlExtension: FormControlExtension;
  @Input() parentFormGroup: FormGroup;
  constructor() { }

  ngOnInit(): void {
  }

}
