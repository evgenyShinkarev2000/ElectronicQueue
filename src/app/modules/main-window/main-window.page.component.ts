import { Component } from '@angular/core';
import { AuthService } from "../../services/authentication/auth.service";
import { Router } from "@angular/router";
import { ILink } from 'src/app/models/ngx-protected-link.interface';
import { UserRole } from "../../services/permission/all-users-role.enum";
import { PermissionType } from "../../services/permission/all-permissions.enum";

@Component({
    selector: 'app-main-window',
    templateUrl: './main-window.page.component.html',
    styleUrls: ['./main-window.page.component.scss']
})
export class MainWindowComponent  {

    public readonly links: ILink[] = [
        { text: "Учетные записи", routerLink: "accounts", ngxOnly: [UserRole.ADMIN] },
        { text: "Очереди", routerLink: "queues", ngxOnly: [PermissionType.canAuthorizedWatch] },
        { text: "Запись", routerLink: "registration", ngxOnly: [PermissionType.canAuthorizedWatch] },
        { text: "Личный кабинет", routerLink: "personal_account", ngxOnly: [UserRole.ADMIN, UserRole.CLIENT] }
    ];

    constructor(private _authService: AuthService, private _router: Router) {
    }

    public logOut(): void {
        this._authService.logOut();
        this._router.navigate(["auth/login"]);
    }
}
