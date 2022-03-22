import { UserRole } from "../services/permission/all-users-role.enum";
import { PermissionType } from "../services/permission/all-permissions.enum";

export interface ILink{
    text: string,
    routerLink: string,
    ngxOnly: UserRole[] | PermissionType[]
}
