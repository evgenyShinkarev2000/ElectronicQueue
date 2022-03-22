import { IUserLoginData } from "./user-login-data.interface";


export interface IUserSignupData extends IUserLoginData {
    firstName: string,
    secondName: string
}
