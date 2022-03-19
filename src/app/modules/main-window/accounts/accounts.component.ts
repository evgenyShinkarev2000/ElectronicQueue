import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Component({
    selector: 'app-accounts',
    templateUrl: './accounts.component.html',
    styleUrls: ['./accounts.component.scss']
})
export class AccountsComponent implements OnInit {

    constructor(private _httpClient: HttpClient) {
    }

    ngOnInit(): void {
    }

    public loadUsers(): void{
        this._httpClient.get("https://localhost:44315/api/MockUsers").subscribe();
    }
}
