import { ILoginData } from "./login-data.interface";


export interface ISignupData extends ILoginData {
    firstName: string,
    secondName: string
}
