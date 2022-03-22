import { IUserAuthData } from "./user-auth-data.interface";
import { IUserSignupData } from "./user-signup-data.interface";
import { IUserLoginData } from "./user-login-data.interface";

export interface IUser extends IUserAuthData, IUserSignupData, IUserLoginData{
    permissions: any[],
    info: {[key: string]: string}
}
