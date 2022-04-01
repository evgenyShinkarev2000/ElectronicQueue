import { Component, Input, OnInit } from '@angular/core';
import { IUserLocked } from "../../../../models/user-model-locked.interface";

@Component({
    selector: 'app-account-item',
    templateUrl: './account-item.component.html',
    styleUrls: ['./account-item.component.scss']
})
export class AccountItemComponent implements OnInit {


    @Input()
    public user: IUserLocked;
    public isExtended: boolean = false;
    public isEdit: boolean = false;
    constructor() {
    }

    ngOnInit(): void {
    }

    public changeExtendMode(): void{
        this.isExtended = !this.isExtended;
    }

}
