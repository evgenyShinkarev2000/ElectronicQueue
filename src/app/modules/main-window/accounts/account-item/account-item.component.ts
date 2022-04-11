import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AuthService } from "../../../../services/authentication/auth.service";
import { WSUserController } from "../../../../services/web-socket/controllers/web-socket-user-controller.service";
import { ItemLockState } from "../../../../view-models/lock-item-state.enum";
import { IUser } from "../../../../models/user-model.interface";

@Component({
    selector: 'app-account-item',
    templateUrl: './account-item.component.html',
    styleUrls: ['./account-item.component.scss']
})
export class AccountItemComponent implements OnInit, AfterViewInit {
    @Input()
    public itemLockState: ItemLockState = ItemLockState.lock;
    @Output()
    public itemLockStateChange: EventEmitter<ItemLockState> = new EventEmitter<ItemLockState>();
    @Input()
    public user: IUser;
    public isExtended: boolean = false;

    public get isEditMode(): boolean {
        return this.itemLockState === ItemLockState.editedByMe;
    }

    public get isFreeMode(): boolean {
        return this.itemLockState === ItemLockState.free;
    }

    public get isLockMode(): boolean {
        return this.itemLockState === ItemLockState.lock;
    }

    public isRemoveMode: boolean = false;

    constructor(private _wsUserController: WSUserController, private _authService: AuthService) {
    }

    ngOnInit(): void {
    }

    ngAfterViewInit(): void {
    }

    public changeExtendMode(): void {
        this.isExtended = !this.isExtended;
    }

    public changeEditMode(): void {
        this.isRemoveMode = false;
        if (this.itemLockState === ItemLockState.editedByMe) {
            this.deleteEditRight();
        } else {
            this.tryGetEditRight();
        }
    }

    public saveChanges(): void {
        this.itemLockState = ItemLockState.free;
        this.deleteEditRight();
    }

    public undoChanges(): void{
        this.itemLockState = ItemLockState.free;
        this.deleteEditRight();
    }

    public removeUser(): void {
        this.tryGetEditRight();
        this.isRemoveMode = true;
    }

    private deleteEditRight(): void {
        this.itemLockState = ItemLockState.free;
        this._wsUserController.deleteEditRight({
            itemId: this.user.id,
            status: null,
            userId: null
        });

        this.onItemLockStateChange();
    }

    private tryGetEditRight(): void {
        this._wsUserController.tryGetEditRight({
            itemId: this.user.id,
            userId: null,
            status: null
        }).subscribe((canEdit: boolean) => {
            this.itemLockState = canEdit ? ItemLockState.editedByMe : ItemLockState.lock;
            this.onItemLockStateChange();
        });
    }

    private onItemLockStateChange(): void {
        this.itemLockStateChange.emit(this.itemLockState);
    }
}
