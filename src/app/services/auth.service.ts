import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { firstValueFrom } from "rxjs";
import { JwtHelperService } from "@auth0/angular-jwt";
import { CanActivate, Router } from "@angular/router";
import { NgxPermissionsService } from "ngx-permissions";

export interface IAuthData {
  login: string,
  password: string
}

export interface IRegisterData extends IAuthData {
  firstName: string,
  secondName: string
}

@Injectable({
  providedIn: 'root'
})
export class AuthService implements CanActivate {
  constructor(private _httpClient: HttpClient,
              private _jwtHelper: JwtHelperService,
              private _router: Router,
              private _ngxPermissionsService: NgxPermissionsService,
  ) {
  }

  public async authWithPassword(authData: IAuthData): Promise<boolean> {
    try {
      const response: { token: string, id: string } = (await firstValueFrom(this._httpClient.post<{ token: string, id: string }>
      ("https://localhost:44315/api/auth/login", authData)));
      const token: string = response.token;
      const id: string = response.id;
      if (token && id) {
        localStorage.setItem("auth-token", token);
        localStorage.setItem("id", id);

        return true;
      }
    } catch (e) {
      console.log("post authData request error");
    }

    return false;
  }

  public async register(signUpData: IRegisterData): Promise<void> {
    try {
      await firstValueFrom(this._httpClient.post("https://localhost:44315/api/auth/signup", signUpData));
    } catch (e) {
      console.log(e);
    }
  }

  public logOut(): void {
    localStorage.removeItem("auth-token");
    this._ngxPermissionsService.flushPermissions();
  }

  public isUserAuthenticated(): boolean {
    const token: string = localStorage.getItem("auth-token");
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
