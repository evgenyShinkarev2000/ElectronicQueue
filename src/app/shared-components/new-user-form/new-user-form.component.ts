import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from "@angular/forms";
import { FormControlsExtensionModel } from "../../view-models/form-validation/form-controls-extension-model";

@Component({
    selector: 'app-new-user-form',
    templateUrl: './new-user-form.component.html',
    styleUrls: ['./new-user-form.component.scss']
})
export class NewUserFormComponent implements OnInit {

    @Input()
    public form: FormGroup;
    @Input()
    public formControlsExtension: FormControlsExtensionModel;
    constructor() {
    }

    ngOnInit(): void {
    }

}
