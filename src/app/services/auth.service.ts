import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { catchError, firstValueFrom, map, Observable, of, throwError } from "rxjs";
import { JwtHelperService } from "@auth0/angular-jwt";
import { CanActivate, Router } from "@angular/router";
import { NgxPermissionsService } from "ngx-permissions";
import { ILoginData } from "./login-data.interface";
import { IUserAuthData } from "./user-auth-data.interface";
import { ISignupData } from "./signup-data.interface";
import { LocalStorageManagerService } from "./local-storage-manager.service";


@Injectable({
    providedIn: 'root'
})
export class AuthService implements CanActivate {
    public get userAuthData(): IUserAuthData {
        return this._localStorageManager.loadUserAuthData();
    }

    //написать set и get для userRole
    //Стоит ли засунуть в set работу с LocalStorageManager?

    constructor(private _httpClient: HttpClient,
                private _jwtHelper: JwtHelperService,
                private _router: Router,
                private _ngxPermissionsService: NgxPermissionsService,
                private _localStorageManager: LocalStorageManagerService,
    ) {
    }

    public logIn(authData: ILoginData): Observable<boolean> {
        return this._httpClient.post<IUserAuthData>
        ("https://localhost:44315/api/auth/login", authData).pipe(
            catchError((responseError: HttpErrorResponse) => {
                if (responseError.status !== 401) {
                    this._router.navigate(["error_page"]);

                    return of();// завершает стрим
                }

                return of(false);//автоизация провалена
            }),
            map((userData: IUserAuthData | boolean) => {
                if (userData) {
                    this._localStorageManager.saveUserAuthData(userData as IUserAuthData);

                    return true;
                }

                return false;
            })
        );
    }

    // public async logIn(authData: IAuthData): Promise<boolean> {
    //     try {
    //         const response = await firstValueFrom(this._httpClient.post<ILogInSuccessData>
    //         ("https://localhost:44315/api/auth/login", authData));
    //         localStorage.setItem("token", response.token);
    //         localStorage.setItem("id", response.id);
    //         localStorage.setItem("role", response.role);
    //
    //         return true;
    //     } catch (e) {
    //         console.log("ошибка login, обработчик catch(e)");
    //
    //         return false;
    //     }
    // }

    public async signUp(signUpData: ISignupData): Promise<void> {
        this._httpClient.post("https://localhost:44315/api/auth/signup", signUpData)
            .subscribe({
                error: (err: HttpErrorResponse) => {
                    console.log(err);
                    this._router.navigate(["error_page"]);
                }
            });
    }

    public logOut(): void {
        this._localStorageManager.clearLocalStorage();
        this._ngxPermissionsService.flushPermissions();
    }

    public isUserAuthenticated(): boolean {
        const token: string = LocalStorageManagerService.tokenGetter();
        if (token && !this._jwtHelper.isTokenExpired(token)) {
            return true;
        }

        return false;
    }

    public canActivate(): boolean {
        if (this.isUserAuthenticated()) {
            return true;
        }

        this._router.navigate(["login"]);

        return false;
    }
}
