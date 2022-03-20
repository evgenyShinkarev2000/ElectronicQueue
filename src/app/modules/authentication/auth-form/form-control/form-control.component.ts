import { Component, Input } from '@angular/core';
import { FormGroup } from "@angular/forms";
import { FormControlExtension } from "../../../../view-models/form-validation/form-control-extemsion";

@Component({
    selector: 'app-form-control',
    templateUrl: './form-control.component.html',
    styleUrls: ['./form-control.component.scss']
})
export class FormControlComponent {

    @Input()
    public formControlExtension: FormControlExtension;
    @Input()
    public parentFormGroup: FormGroup;

    constructor() {
    }
}
