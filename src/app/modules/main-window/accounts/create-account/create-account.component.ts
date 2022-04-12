import { Component, OnInit } from '@angular/core';
import { ChangeModeParam } from "./change-mode-param.enum";
import { FormGroup } from "@angular/forms";
import { FormControlExtension } from "../../../../view-models/form-validation/form-control-extension";
import { FormControlsExtensionModel } from "../../../../view-models/form-validation/form-controls-extension-model";

@Component({
    selector: 'app-create-account',
    templateUrl: './create-account.component.html',
    styleUrls: ['./create-account.component.scss']
})
export class CreateAccountComponent implements OnInit {

    public isAddUserMode: boolean = false;
    // eslint-disable-next-line @typescript-eslint/naming-convention
    public ChangeModeParam: typeof ChangeModeParam = ChangeModeParam;
    public addModeOnClickId: string = "addModeOnClickId";
    public unusedModeOnClickId: string = "unusedModeOnClickId";
    public formControlsExtension: FormControlsExtensionModel = new FormControlsExtensionModel();
    public form: FormGroup = new FormGroup(this.formControlsExtension.getFormControlExtensionsDict());

    constructor() {
    }

    ngOnInit(): void {
    }

    public changeMode(): void {
        this.isAddUserMode = !this.isAddUserMode;
    }
}
