import { map, Observable, skip, Subscriber } from "rxjs";
import { IUser } from "../../models/user-model.interface";
import { IWebSocketLock } from "../../models/websocket-lock-item.interface";
import { IUserLocked } from 'src/app/models/user-model-locked.interface';

// @Injectable({
//     providedIn: 'root'
// })
export class OldWebSocketService {
    private _webSocketAllUsers: WebSocket;
    private _allUsers$: Observable<IUserLocked[]>;
    private _webSocketUserUpdate: WebSocket;
    private _userUpdate$: Observable<IUser>;
    private _webSocketStatusUpdate: WebSocket;
    private _statusUpdate$: Observable<IWebSocketLock>;

    constructor() {
    }

    public connectStatusUpdate(): void {
        try {
            this._webSocketStatusUpdate = new WebSocket("wss://localhost:44315/WebSocket/status_update");
        } catch (e) {
            console.log("Не удалось установить соединение с websocket status_update");
            console.log(e);
        }
    }

    public getStatusUpdateStream$(): Observable<IWebSocketLock> {
        if (!this._statusUpdate$) {
            this._statusUpdate$ = new Observable<any>((subscriber: Subscriber<any>) => {
                this._webSocketStatusUpdate.onmessage = (e: MessageEvent): void => {
                    subscriber.next(e.data);
                };
            }).pipe(
                map((statusUpdate: string) => JSON.parse(statusUpdate))
            );
        }

        return this._statusUpdate$;
    }

    public connectUserUpdate(): void {
        try {
            this._webSocketUserUpdate = new WebSocket("wss://localhost:44315/WebSocket/user_update");
        } catch (e) {
            console.log("Не удалось установить соединение с websocket user_update");
            console.log(e);
        }
    }

    public getUserUpdateStream$(): Observable<IUser> {
        if (!this._userUpdate$) {
            this._userUpdate$ = new Observable<any>((subscriber: Subscriber<any>) => {
                this._webSocketUserUpdate.onmessage = (e: MessageEvent): void => {
                    subscriber.next(e.data);
                };
            }).pipe(
                map((user: string) => JSON.parse(user))
            );
        }

        return this._userUpdate$;
    }

    public connectUsers(): void {
        try {
            this._webSocketAllUsers = new WebSocket("wss://localhost:44315/WebSocket/users");
        } catch (e) {
            console.log("Не удалось установить соединение с websocket");
            console.log(e);
        }
    }

    public getAllUsersStream$(): Observable<IUserLocked[]> {
        if (!this._allUsers$) {
            this._allUsers$ = new Observable<any>((subscriber: Subscriber<any>) => {
                this._webSocketAllUsers.onmessage = (e: MessageEvent): void => {
                    subscriber.next(e.data);
                };
            }).pipe(
                skip(1),
                map((users: string) => {
                    const result: IUserLocked[] = JSON.parse(users);
                    return result;
                })
            );
        }

        return this._allUsers$;
    }

    public pingWebSocketAllUsers(): void{
        this._webSocketAllUsers.send("ping");
    }
}
