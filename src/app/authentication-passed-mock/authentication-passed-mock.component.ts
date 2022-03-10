import {Component, OnInit} from '@angular/core';
import {AuthService} from "../services/auth.service";
import {Router} from "@angular/router";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {firstValueFrom} from "rxjs";
import {NgxPermissionsService} from "ngx-permissions";

@Component({
  selector: 'app-authentication-passed-mock',
  templateUrl: './authentication-passed-mock.component.html',
  styleUrls: ['./authentication-passed-mock.component.scss']
})
export class AuthenticationPassedMockComponent implements OnInit {

  public users: object[];

  constructor(private authService: AuthService,
              private router: Router,
              private httpClient: HttpClient,
              private ngxPermissions: NgxPermissionsService) {
  }

  ngOnInit(): void {
  }

  public exit() {
    this.authService.logOut();
    this.router.navigate(["login"]);
  }

  public getUsers() {
    this.httpClient.get<object[]>("https://localhost:44315/api/MockUsers")
      .subscribe(response => this.users = response);
  }

  public getRole(role: string){
    this.ngxPermissions.addPermission([role]);
  }

  public removeRoles(){
    this.ngxPermissions.flushPermissions();
  }


}
