import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserRole } from "../../../services/permission/all-users-role.enum";
import { WebSocketService } from "../../../services/web-socket/web-socket.service";
import { IUserLocked } from "../../../models/user-model-locked.interface";
import { WSUserController } from "../../../services/web-socket/controllers/web-socket-user-controller.service";
import { IItemLock } from "../../../models/websocket-lock-item.interface";
import { Subscription } from "rxjs";


// eslint-disable-next-line @typescript-eslint/typedef
const sortOptions = ["firstName", "secondName", "firstNameDesc", "secondNameDesc"] as const;
type SortOption = typeof sortOptions[number];


@Component({
    selector: 'app-accounts',
    templateUrl: './accounts.component.html',
    styleUrls: ['./accounts.component.scss'],
})
export class AccountsComponent implements OnInit, OnDestroy {

    public viewUsers: IUserLocked[] = [];
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
    private _allUsers: IUserLocked[] = [];
    private _itemLockUpdateSubscription: Subscription;

    constructor(private _wsUserController: WSUserController) {
    }

    public ngOnInit(): void {
        this._itemLockUpdateSubscription = this._wsUserController.updateLock$.subscribe((itemToUpdateLock: IItemLock) => {
            let index: number = this._allUsers.findIndex((user: IUserLocked) => user.id === itemToUpdateLock.itemId);
            this._allUsers[index].lockStatus = itemToUpdateLock.status;
            index = this.viewUsers.findIndex((user: IUserLocked) => user.id === itemToUpdateLock.itemId);
            this.viewUsers[index].lockStatus = itemToUpdateLock.status;
        });
    }

    public ngOnDestroy(): void {
        this._itemLockUpdateSubscription.unsubscribe();
    }

    public loadUsers(): void {
        this._wsUserController.getAllUser().subscribe((users: IUserLocked[]) => {
            this._allUsers = this._allUsers.concat(users);
            this.applyFilterAndSort();
        });
    }

    public changeFilterMode(userRole: UserRole): void {
        this.roleFilterModel[userRole].selected = !this.roleFilterModel[userRole].selected;
        this.applyFilter();
    }

    public applyFilterAndSort(): void {
        this.applyFilter();
        this.applySort();
    }

    public applyFilter(): void {
        this.viewUsers = this._allUsers.filter((user: IUserLocked) => {
            const userRole: string = user.role.toUpperCase();
            if (!(userRole in UserRole)) {
                console.log("неизвестная роль");

                return false;
            }

            return this.roleFilterModel[userRole as unknown as keyof typeof UserRole].selected;
        });
    }

    public applySort(): void {
        console.log("sorted");
        const selector: { [key in SortOption]: (a: IUserLocked, b: IUserLocked) => number } = {
            firstName: (a: IUserLocked, b: IUserLocked) => a.firstName.localeCompare(b.firstName),
            secondName: (a: IUserLocked, b: IUserLocked) => a.secondName.localeCompare(b.secondName),
            firstNameDesc: (a: IUserLocked, b: IUserLocked) => -a.firstName.localeCompare(b.firstName),
            secondNameDesc: (a: IUserLocked, b: IUserLocked) => -a.secondName.localeCompare(b.secondName)
        };
        this.viewUsers.sort(selector[this.sortState]);
    }


}
