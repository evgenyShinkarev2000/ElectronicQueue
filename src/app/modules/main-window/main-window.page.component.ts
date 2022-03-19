import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../services/auth.service";
import { Router } from "@angular/router";
import { ILink } from 'src/app/models/link.interface';

@Component({
    selector: 'app-main-window',
    templateUrl: './main-window.page.component.html',
    styleUrls: ['./main-window.page.component.scss']
})
export class MainWindowComponent implements OnInit {

    public readonly links: ILink[] = [
        { text: "Учетные записи", routerLink: "accounts", ngxOnly: ["admin"] },
        { text: "Очереди", routerLink: "queues" },
        { text: "Конкретная очередь", routerLink: "queue" },
        { text: "Личный кабинет", routerLink: "personal_account", ngxOnly: ["admin", "client"] }
    ];

    constructor(private _authService: AuthService, private _router: Router) {
    }

    ngOnInit(): void {
    }

    public logOut(): void {
        this._authService.logOut();
        this._router.navigate(["auth/login"]);
    }
}
