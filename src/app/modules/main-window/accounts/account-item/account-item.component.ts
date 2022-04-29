import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AuthService } from "../../../../services/authentication/auth.service";
import { WSUserController } from "../../../../services/web-socket/controllers/web-socket-user-controller.service";
import { ItemLockState } from "../../../../view-models/lock-item-state.enum";
import { IUser } from "../../../../models/user-model.interface";
import { FormGroup } from "@angular/forms";
import { FormControlsExtensionModel } from "../../../../view-models/form-validation/form-controls-extension-model";
import { ItemMode } from "./item-mode.enum";
import { Observable } from "rxjs";

@Component({
    selector: 'app-account-item',
    templateUrl: './account-item.component.html',
    styleUrls: ['./new-account-item.component.scss']
})
export class AccountItemComponent implements OnInit {
    @Input()
    public itemLockState: ItemLockState;
    // eslint-disable-next-line @typescript-eslint/naming-convention
    public ItemLockState: typeof ItemLockState = ItemLockState;
    @Output()
    public itemLockStateChange: EventEmitter<ItemLockState> = new EventEmitter<ItemLockState>();
    @Input()
    public user: IUser;
    public itemMode: ItemMode = ItemMode.unused;
    // eslint-disable-next-line @typescript-eslint/naming-convention
    public ItemMode: typeof ItemMode = ItemMode;
    public isExtend: boolean = false;
    public formControlsExtension: FormControlsExtensionModel = new FormControlsExtensionModel();
    public form: FormGroup;


    public get canEdit(): boolean {
        return this.itemLockState === ItemLockState.editedByMe;
    }

    public get isFree(): boolean {
        return this.itemLockState === ItemLockState.free;
    }

    public get isLock(): boolean {
        return this.itemLockState === ItemLockState.lock;
    }


    constructor(private _wsUserController: WSUserController, private _authService: AuthService) {
        this.form = new FormGroup({
            [this.formControlsExtension.login.name]: this.formControlsExtension.login,
            [this.formControlsExtension.password.name]: this.formControlsExtension.password,
            [this.formControlsExtension.firstName.name]: this.formControlsExtension.firstName,
            [this.formControlsExtension.secondName.name]: this.formControlsExtension.secondName
        });
    }

    public ngOnInit(): void {
        this.setBeginInputs();
        this.disableInputs();
    }

    public changeExtend(): void {
        this.isExtend = !this.isExtend;
    }

    public editUser(): void {
        if (this.itemLockState === ItemLockState.editedByMe) {
            this.deleteEditRight();
        } else {
            this.tryGetEditRight().subscribe((canEdit: boolean) => {
                if (canEdit) {
                    this.enableInputs();
                    this.itemMode = ItemMode.edit;
                }
            });
        }
    }

    public saveChanges(): void {
        if (this.itemMode === ItemMode.edit) {
            const updatedUser: IUser = { ...this.user };
            updatedUser.login = this.formControlsExtension.login.value;
            updatedUser.password = this.formControlsExtension.password.value;
            updatedUser.firstName = this.formControlsExtension.firstName.value;
            updatedUser.secondName = this.formControlsExtension.secondName.value;
            this._wsUserController.updateUser(updatedUser);
        }
        else if (this.itemMode === ItemMode.remove){
            this._wsUserController.deleteUser(this.user);
        }
        this.deleteEditRight();
    }

    public undoChanges(): void {
        this.deleteEditRight();
        this.setBeginInputs();
    }

    public removeUser(): void {
        this.tryGetEditRight().subscribe((canRemove: boolean) => {
            if (canRemove) {
                this.itemMode = ItemMode.remove;
            }
        });
    }

    private deleteEditRight(): void {
        this.itemLockState = ItemLockState.free;
        this.disableInputs();
        this.itemMode = ItemMode.unused;
        this._wsUserController.deleteEditRight({
            itemId: this.user.id,
            status: null,
            userId: null
        });

        this.onItemLockStateChange();
    }

    private tryGetEditRight(): Observable<boolean> {
        const response$: Observable<boolean> = this._wsUserController.tryGetEditRight({
            itemId: this.user.id,
            userId: null,
            status: null
        });
        response$.subscribe((canEdit: boolean) => {
            this.itemLockState = canEdit ? ItemLockState.editedByMe : ItemLockState.lock;
            this.onItemLockStateChange();
        });

        return response$;
    }

    private onItemLockStateChange(): void {
        this.itemLockStateChange.emit(this.itemLockState);
    }

    private disableInputs(): void {
        for (const controlsKey in this.form.controls) {
            this.form.get(controlsKey).disable();
        }
    }

    private enableInputs(): void {
        for (const controlsKey in this.form.controls) {
            this.form.get(controlsKey).enable();
        }
    }

    private setBeginInputs(): void {
        this.formControlsExtension.login.setValue(this.user.login);
        this.formControlsExtension.password.setValue(this.user.password);
        this.formControlsExtension.secondName.setValue(this.user.secondName);
        this.formControlsExtension.firstName.setValue(this.user.firstName);
    }
}
