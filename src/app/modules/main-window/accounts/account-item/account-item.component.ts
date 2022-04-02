import { Component, Input, OnInit } from '@angular/core';
import { IUserLocked } from "../../../../models/user-model-locked.interface";
import { WebSocketService } from "../../../../services/web-socket/web-socket.service";
import { IWebSocketLock } from "../../../../models/websocket-lock-item.interface";
import { AuthService } from "../../../../services/authentication/auth.service";
import { Subscription } from "rxjs";

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

    constructor(private _webSocketService: WebSocketService, private authService: AuthService) {
    }

    ngOnInit(): void {
    }

    public changeExtendMode(): void {
        this.isExtended = !this.isExtended;
    }

    public changeEditMode(): void {
        // если isEdit, то кнопка недоступна
        if (this.canEdit){
            this.canEdit = false;
            this._webSocketService.changeEditRight({
                itemId: this.user.id,
                userId: this.authService.userAuthData.id,
                status: "Lock"
            });

            return;
        }
        this._editRightSubscription = this._webSocketService.editRight$.subscribe((idLock: IWebSocketLock) => {
            if (idLock.status === "Lock"){
                alert("Запись уже редактируется");
            } else if (idLock.status === "Free"){
                this.canEdit = true;
            }
            this._editRightSubscription.unsubscribe();
        });
        this._webSocketService.changeEditRight({
            itemId: this.user.id,
            userId: this.authService.userAuthData.id,
            status: this.canEdit ? "Lock" : "Lock"
        });
    }

}
