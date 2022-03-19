export type UserRole = "admin" | "operator" | "client";

export interface IUserAuthData {
    token: string,
    id: string,
    role: UserRole
}
