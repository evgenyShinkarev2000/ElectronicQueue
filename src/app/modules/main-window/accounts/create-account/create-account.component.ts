import { Component, OnInit } from '@angular/core';
import { ChangeModeParam } from "./change-mode-param.enum";
import { FormGroup } from "@angular/forms";
import { FormControlsExtensionModel } from "../../../../view-models/form-validation/form-controls-extension-model";
import { WSUserProvider } from "../../../../services/web-socket/controllers/ws-user/ws-user-controller.service";
import { IUserLocked } from "../../../../models/user-model-locked.interface";
import { UserRole } from "../../../../services/permission/all-users-role.enum";

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

    constructor(private _wsUserController: WSUserProvider) {
    }

    ngOnInit(): void {
    }

    public changeMode(): void {
        this.isAddUserMode = !this.isAddUserMode;
    }

    //TODO добавить остальные роли
    public addUser(): void{
        const user: Partial<IUserLocked> = {};
        user.login = this.formControlsExtension.login.value;
        user.password = this.formControlsExtension.password.value;
        user.firstName = this.formControlsExtension.firstName.value;
        user.secondName = this.formControlsExtension.secondName.value;
        user.role = UserRole.CLIENT;

        this._wsUserController.addUser(user as IUserLocked);
        this.form.reset();
        this.changeMode();
    }
}
