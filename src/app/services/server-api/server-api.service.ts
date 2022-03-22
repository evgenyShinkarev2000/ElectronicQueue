import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { IUser } from "../../models/user-model.interface";

@Injectable({
    providedIn: 'root'
})
export class ServerApiService {

    constructor(private _httpClient: HttpClient ) {
    }

    // public getUsersLazy(): IUser{
    //
    // }
}
