import { Component, Input, OnInit } from '@angular/core';
import { IUserLocked } from "../../../../models/user-model-locked.interface";
import { WebSocketService } from "../../../../services/web-socket/web-socket.service";
import { IItemLock } from "../../../../models/websocket-lock-item.interface";
import { AuthService } from "../../../../services/authentication/auth.service";
import { Subscription } from "rxjs";
import { WSUserController } from "../../../../services/web-socket/controllers/web-socket-user-controller.service";

@Component({
    selector: 'app-account-item',
    templateUrl: './account-item.component.html',
    styleUrls: ['./account-item.component.scss']
})
export class AccountItemComponent implements OnInit {


    @Input()
    public user: IUserLocked;
    public isExtended: boolean = false;
    public isLocked: boolean = false;
    public canEdit: boolean = false;
    private _editRightSubscription: Subscription;

    constructor(private _wsUserController: WSUserController, private _authService: AuthService) {
    }

    ngOnInit(): void {
    }

    public changeExtendMode(): void {
        this.isExtended = !this.isExtended;
    }

    public changeEditMode(): void {
        if (this.canEdit === true) {
            this.canEdit = false;
            this._wsUserController.deleteEditRight({
                itemId: this.user.id,
                status: null,
                userId: null
            });
        } else {
            this._wsUserController.tryGetEditRight({
                itemId: this.user.id,
                userId: null,
                status: null
            }).subscribe((response:boolean) => {
                this.canEdit = response;
            });
        }
    }
}
