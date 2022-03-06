import {Injectable} from '@angular/core';
import {HttpClient, HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {firstValueFrom, Observable, Subscription} from "rxjs";
import {JwtHelperService} from "@auth0/angular-jwt";
import {CanActivate, Router} from "@angular/router";

export interface AuthData {
  login: string,
  password: string
}

@Injectable({
  providedIn: 'root'
})
export class AuthService implements CanActivate {
  constructor(private httpClient: HttpClient, private jwtHelper: JwtHelperService, private router: Router) {
  }


  public isUserAuthenticated(): boolean {
    const token = localStorage.getItem("auth-token");
    if (token && !this.jwtHelper.isTokenExpired(token)) {
      return true;
    }

    return false;
  }

  public async authWithPassword(authData: AuthData): Promise<boolean> {
    try {
      const token = (await firstValueFrom(this.httpClient.post<{ token: string }>
      ("https://localhost:44315/api/auth/login", authData))).token;
      if (token) {
        localStorage.setItem("auth-token", token);
        return true;
      }
    } catch (e) {
      console.log("post authData request error");
    }
    return false
  }

  public logUut(): void {
    localStorage.removeItem("auth-token");
  }

  public canActivate() {
    if (this.isUserAuthenticated())
      return true;

    this.router.navigate(["login"]);
    return false;
  }
}
