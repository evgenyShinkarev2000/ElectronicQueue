import { UserRole } from "../permission/all-users-role.enum";

export interface IUserAuthData {
    token: string,
    id: string,
    role: UserRole
}
