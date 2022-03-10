import { Component, OnInit } from '@angular/core';
import { AuthService } from "../services/auth.service";
import { Router } from "@angular/router";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { firstValueFrom } from "rxjs";
import { NgxPermissionsService } from "ngx-permissions";

@Component({
  selector: 'app-authentication-passed-mock',
  templateUrl: './authentication-passed-mock.component.html',
  styleUrls: ['./authentication-passed-mock.component.scss']
})
export class AuthenticationPassedMockComponent {

  public users: object[];

  constructor(private _authService: AuthService,
              private _router: Router,
              private _httpClient: HttpClient,
              private _ngxPermissions: NgxPermissionsService) {
  }

  public exit(): void {
    this._authService.logOut();
    this._router.navigate(["login"]);
  }

  public getUsers(): void {
    this._httpClient.get<object[]>("https://localhost:44315/api/MockUsers")
      .subscribe((response:object[]) => this.users = response);
  }

  public getRole(role: string): void {
    this._ngxPermissions.addPermission([role]);
  }

  public removeRoles(): void {
    this._ngxPermissions.flushPermissions();
  }
}
