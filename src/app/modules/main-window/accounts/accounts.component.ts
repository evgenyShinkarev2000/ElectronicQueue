import { Component, HostBinding, OnDestroy, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { IUser } from "../../../models/user-model.interface";
import { interval, map, Subscription, tap } from "rxjs";
import { UserRole } from "../../../services/permission/all-users-role.enum";
import { WebSocketService } from "../../../services/web-socket/web-socket.service";


// eslint-disable-next-line @typescript-eslint/typedef
const sortOptions = ["firstName", "secondName", "firstNameDesc", "secondNameDesc"] as const;
type SortOption = typeof sortOptions[number];


@Component({
    selector: 'app-accounts',
    templateUrl: './accounts.component.html',
    styleUrls: ['./accounts.component.scss'],
})
export class AccountsComponent implements OnInit, OnDestroy {

    public users: IUser[] = [];
    public readonly sortOptions: typeof sortOptions = sortOptions;
    public readonly sortOptionsName: { [key in SortOption]: string } = {
        firstName: "Имя по возрастанию",
        secondName: "Фамилия по возрастанию",
        firstNameDesc: "Имя по убыванию",
        secondNameDesc: "Фамилия по убыванию"
    };
    public sortState: SortOption = "secondName";
    public roleFilterOptions: UserRole[] = Object.keys(UserRole) as unknown as UserRole[];
    public roleFilterModel: { [key in UserRole]: { name: string, selected: boolean } } = {
        [UserRole.ADMIN]: { name: "Администроторы", selected: true },
        [UserRole.OPERATOR]: { name: "Операторы", selected: true },
        [UserRole.CLIENT]: { name: "Клиенты", selected: true }
    };
    private _subscription: Subscription;
    constructor(private _webSocketService: WebSocketService) {
    }

    public ngOnInit(): void {
        this._webSocketService.connect();
        this._subscription = this._webSocketService.getUserStream$().subscribe({
            next: (user: IUser) => this.users.push(user),
            error: (e: Error) => console.log(e),
            complete: () => console.log("соеденение разорвано")
        });
    }

    public ngOnDestroy(): void{
        this._subscription.unsubscribe();
    }

    // public loadUsers(): void {
    //     this._httpClient.get("https://localhost:44315/api/MockUsers").subscribe();
    // }

    public loadUsers(): void{
        this._webSocketService.sendUserInStream(1);
    }

    public changeFilterMode(userRole: UserRole): void{
        this.roleFilterModel[userRole].selected = ! this.roleFilterModel[userRole].selected;
        console.log(this.roleFilterModel);
    }
}
