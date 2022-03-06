import {Component, OnInit} from '@angular/core';
import {AuthService} from "../services/auth.service";
import {Router} from "@angular/router";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {firstValueFrom} from "rxjs";

@Component({
  selector: 'app-authentication-passed-mock',
  templateUrl: './authentication-passed-mock.component.html',
  styleUrls: ['./authentication-passed-mock.component.scss']
})
export class AuthenticationPassedMockComponent implements OnInit {

  public users: string[];

  constructor(private authService: AuthService,
              private router: Router,
              private httpClient: HttpClient) {
  }

  ngOnInit(): void {
  }

  public exit() {
    this.authService.logUut();
    this.router.navigate(["login"]);
  }

  public getUsers() {
    this.httpClient.get<string[]>("https://localhost:44315/api/MockUsers")
      .subscribe(response => this.users = response);
  }

}
