import {Injectable} from '@angular/core';
import {HttpClient, HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {firstValueFrom, Observable, Subscription} from "rxjs";
import {JwtHelperService} from "@auth0/angular-jwt";
import {CanActivate, Router} from "@angular/router";
import {NgxPermissionsService} from "ngx-permissions";

export interface AuthData {
  login: string,
  password: string
}

export interface RegisterData extends AuthData{
  firstName: string,
  secondName: string
}

@Injectable({
  providedIn: 'root'
})
export class AuthService implements CanActivate {
  constructor(private httpClient: HttpClient,
              private jwtHelper: JwtHelperService,
              private router: Router,
              private ngxPermissionsService: NgxPermissionsService) {
  }

  public async authWithPassword(authData: AuthData): Promise<boolean> {
    try {
      const response = (await firstValueFrom(this.httpClient.post<{ token: string, id: string }>
      ("https://localhost:44315/api/auth/login", authData)));
      const token = response.token;
      const id = response.id;
      if (token && id) {
        localStorage.setItem("auth-token", token);
        localStorage.setItem("id", id);
        return true;
      }
    } catch (e) {
      console.log("post authData request error");
    }
    return false
  }

  public async register(signUpData: RegisterData){
    try{
      const response = await firstValueFrom(this.httpClient.post("https://localhost:44315/api/auth/signup", signUpData));
    }
    catch (e){
      console.log(e);
    }
  }

  public logOut(): void {
    localStorage.removeItem("auth-token");
    this.ngxPermissionsService.flushPermissions();
  }

  public isUserAuthenticated(): boolean {
    const token = localStorage.getItem("auth-token");
    if (token && !this.jwtHelper.isTokenExpired(token)) {
      return true;
    }

    return false;
  }

  public canActivate() {
    if (this.isUserAuthenticated())
      return true;

    this.router.navigate(["login"]);
    return false;
  }
}
