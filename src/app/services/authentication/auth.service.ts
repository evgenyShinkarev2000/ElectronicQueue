import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { catchError, map, Observable, of, take } from "rxjs";
import { JwtHelperService } from "@auth0/angular-jwt";
import { CanActivate, Router } from "@angular/router";
import { IUserLoginData } from "../../models/user-login-data.interface";
import { IUserAuthData } from "../../models/user-auth-data.interface";
import { IUserSignupData } from "../../models/user-signup-data.interface";
import { LocalStorageService } from "../local-storage/local-storage.service";
import { MyPermissionService } from "../permission/my-permission.service";
import { UserRole } from "../permission/all-users-role.enum";


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
                private _permissionService: MyPermissionService,
                private _localStorageManager: LocalStorageService,
    ) {
        if (this.isUserAuthenticated()) {
            this._permissionService
                .loadPermission(this._localStorageManager.loadUserAuthData().role as unknown as UserRole);
            _router.navigate(["main_window"]);
        }
    }

    public logIn(authData: IUserLoginData): Observable<boolean> {
        return this._httpClient.post<IUserAuthData>
        ("https://localhost:44315/api/auth/login", authData).pipe(
            catchError((responseError: HttpErrorResponse) => {
                if (responseError.status !== 401) {
                    this._router.navigate(["error_page"]);

                    return of();// завершает стрим
                }

                return of(false);//автоизация провалена
            }),
            map((httpResponseBody: IUserAuthData | boolean) => {
                if (httpResponseBody) {
                    const userAuthData: IUserAuthData = httpResponseBody as IUserAuthData;
                    this._localStorageManager.saveUserAuthData(userAuthData);
                    this._permissionService.loadPermission(userAuthData.role as unknown as UserRole);

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

    public async signUp(signUpData: IUserSignupData): Promise<void> {
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
        this._permissionService.flushPermissions();
    }

    public isUserAuthenticated(): boolean {
        const token: string = LocalStorageService.tokenGetter();
        if (token && !this._jwtHelper.isTokenExpired(token)) {
            return true;
        }

        return false;
    }

    public canActivate(): boolean {
        if (this.isUserAuthenticated()) {
            return true;
        }

        // надо добавить отдельную страницу, чтобы юзер понимал, почему его перенаправило
        this._router.navigate(["auth/login"]);

        return false;
    }

    public getWebSocketTicket(): Observable<string>{
        const role: UserRole = this.userAuthData.role;

        return this._httpClient.get(`https://localhost:44315/ws/WebSocket${role}/Ticket`, {
            responseType: "text"
        }).pipe(
            take(1)
        );
    }
}
