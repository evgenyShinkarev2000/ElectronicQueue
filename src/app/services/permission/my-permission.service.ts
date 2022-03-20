import { Injectable } from '@angular/core';
import { PermissionType } from "./all-permissions.enum";
import { NgxRolesService } from "ngx-permissions";
import { UserRole } from "./all-users-role.enum";

@Injectable({
    providedIn: 'root'
})
export class MyPermissionService {
    private readonly _authorizedPermissions: PermissionType[] =
        [
            PermissionType.canAuthorizedWatch
        ];
    private readonly _clientOnlyPermissions: PermissionType[] =
        [
            PermissionType.canGoQueue,
            PermissionType.canEditPersonalAccount
        ];
    private readonly _operatorOnlyPermissions: PermissionType[] =
        [
            PermissionType.canEditQueue
        ];
    private readonly _adminOnlyPermissions: PermissionType[] =
        [
            PermissionType.canEditEveryAccount
        ];
    private readonly _clientAllPermissions: PermissionType[] =
        [
            ...this._authorizedPermissions,
            ...this._clientOnlyPermissions
        ];
    private readonly _operatorAllPermissions: PermissionType[] =
        [
            ...this._authorizedPermissions,
            ...this._operatorOnlyPermissions
        ];
    private readonly _adminAllPermissions: PermissionType[] = this.getAllPermission();

    private readonly _rolePermissionsSelector: { [key in UserRole]: PermissionType[] } = {
        [UserRole.CLIENT]: this._clientAllPermissions,
        [UserRole.OPERATOR]: this._operatorAllPermissions,
        [UserRole.ADMIN]: this._adminAllPermissions
    };

    constructor(private _ngxRoleService: NgxRolesService) {
    }

    public loadPermission(userRole: UserRole): void {
        if (!userRole) {
            throw new Error(`Требуется роль пользователя, получено ${userRole}`);
        }
        const permissions: string[] = this._rolePermissionsSelector[userRole] as unknown as string[];
        this._ngxRoleService.addRoleWithPermissions(userRole as unknown as string, permissions);
    }

    public flushPermissions(): void {
        this._ngxRoleService.flushRolesAndPermissions();
    }

    private getAllPermission(): PermissionType[] {
        return Array.from(new Set(Object.keys(PermissionType))) as unknown as PermissionType[];
    }
}
