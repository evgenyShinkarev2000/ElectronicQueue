import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserRole } from "../../../services/permission/all-users-role.enum";
import { IUserLocked } from "../../../models/user-model-locked.interface";
import { WSUserController } from "../../../services/web-socket/controllers/ws-user/ws-user-controller.service";
import { IItemLockModel } from "../../../models/websocket-lock-item.interface";
import { Subscription, take } from "rxjs";
import { ILockItemViewModel } from "../../../view-models/lock-item-model.interface";
import { ItemLockState } from "../../../view-models/lock-item-state.enum";
import { IUser } from "../../../models/user-model.interface";
import { IWSUserEndPoints } from "../../../services/web-socket/controllers/ws-user/user-socket-service.interface";


// eslint-disable-next-line @typescript-eslint/typedef
const sortOptions = ["firstName", "secondName", "firstNameDesc", "secondNameDesc"] as const;
type SortOption = typeof sortOptions[number];


@Component({
    selector: 'app-accounts',
    templateUrl: './accounts.component.html',
    styleUrls: ['./accounts.component.scss'],
})
export class AccountsComponent implements OnInit, OnDestroy {
    public readonly sortOptions: typeof sortOptions = sortOptions;
    public readonly sortOptionsName: { [key in SortOption]: string } = {
        firstName: "Имя по возрастанию",
        secondName: "Фамилия по возрастанию",
        firstNameDesc: "Имя по убыванию",
        secondNameDesc: "Фамилия по убыванию"
    };
    public hasConnection: boolean = false;
    public sortState: SortOption = "secondName";
    public roleFilterOptions: UserRole[] = Object.keys(UserRole) as unknown as UserRole[];
    public roleFilterModel: { [key in UserRole]: { name: string, selected: boolean } } = {
        [UserRole.ADMIN]: { name: "Администроторы", selected: true },
        [UserRole.OPERATOR]: { name: "Операторы", selected: true },
        [UserRole.CLIENT]: { name: "Клиенты", selected: true }
    };

    public allUsers: ILockItemViewModel[] = [];
    private readonly _subscriptions: Subscription[] = [];
    private _wsUserEndPoints: IWSUserEndPoints;

    constructor(private _wsUserController: WSUserController) {
        this._wsUserEndPoints = _wsUserController.getWSUserEndPoints();
    }

    public readonly propSelector: (x: ILockItemViewModel) => UserRole = (x: ILockItemViewModel) => x.item.role;

    public ngOnInit(): void {
        this._subscriptions.push(
            this._wsUserEndPoints.editRight.update$.subscribe((itemToUpdateLock: IItemLockModel) => {
                const index: number = this.allUsers.findIndex((item: ILockItemViewModel) => item.id === itemToUpdateLock.itemId);
                if (index < 0) {
                    return;
                }
                this.allUsers[index].lockState = itemToUpdateLock.status === "Free" ? ItemLockState.free : ItemLockState.lock;
            })
        );
        this.hasConnection = this._wsUserController.checkConnection();
        this._subscriptions.push(this._wsUserController.connectionState$.subscribe((connectionState: boolean) => {
            this.hasConnection = connectionState;
        }));
        this._subscriptions.push(this._wsUserEndPoints.user.update$.subscribe((user: IUserLocked) => {
            const index: number = this.allUsers.findIndex((item: ILockItemViewModel) => item.id === user.id);
            if (index >= 0) {
                this.allUsers[index].item = user;
            }
        }));
        this._subscriptions.push(this._wsUserEndPoints.user.delete$.subscribe((user: IUser) => {
            this.allUsers = this.allUsers.filter((item: ILockItemViewModel) => item.id !== user.id);
        }));

        this._subscriptions.push(this._wsUserEndPoints.user.post$.subscribe((user: IUser) => {
            this.allUsers.push({ lockState: ItemLockState.free, item: user, id: user.id });
        }));
    }

    public ngOnDestroy(): void {
        this._subscriptions.forEach((subscription: Subscription) => subscription.unsubscribe());
        this._wsUserController.removeUserSocketService();
    }

    public loadUsers(): void {
        this._wsUserEndPoints.allUsers.get();
        this._wsUserEndPoints.allUsers.post$
            .pipe(take(1))
            .subscribe((users: IUserLocked[]) => {
                const items: ILockItemViewModel[] = users.map((user: IUserLocked) => {
                    const item: ILockItemViewModel = {
                        item: user as IUser,
                        id: user.id,
                        lockState: user.lockStatus === "Free" ? ItemLockState.free : ItemLockState.lock
                    };

                    return item;
                });
                this.allUsers = items;
            });
    }

    public changeFilterMode(userRole: UserRole): void {
        this.roleFilterModel[userRole].selected = !this.roleFilterModel[userRole].selected;
    }

    public getPassValues(): UserRole[]{
        return Object.keys(this.roleFilterModel).filter((userRole: string) =>
            this.roleFilterModel[userRole as UserRole].selected) as UserRole[];
    }

    public getComparer(): (x: ILockItemViewModel, y: ILockItemViewModel) => number {
        console.log("sorted");
        const selector: { [key in SortOption]: (a: ILockItemViewModel, b: ILockItemViewModel) => number } = {
            firstName: (a: ILockItemViewModel, b: ILockItemViewModel) => a.item.firstName.localeCompare(b.item.firstName),
            secondName: (a: ILockItemViewModel, b: ILockItemViewModel) => a.item.secondName.localeCompare(b.item.secondName),
            firstNameDesc: (a: ILockItemViewModel, b: ILockItemViewModel) => -a.item.firstName.localeCompare(b.item.firstName),
            secondNameDesc: (a: ILockItemViewModel, b: ILockItemViewModel) => -a.item.secondName.localeCompare(b.item.secondName)
        };

        return selector[this.sortState];
    }
}
