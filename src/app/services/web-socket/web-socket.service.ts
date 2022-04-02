import { Injectable } from '@angular/core';
import { Observable, Subject } from "rxjs";
import { IWebSocketLock } from "../../models/websocket-lock-item.interface";
import { IUserLocked } from 'src/app/models/user-model-locked.interface';
import { IWebSocketMessage, WebSocketInstruction } from "./web-socket-message.interaface";

@Injectable({
    providedIn: 'root'
})
export class WebSocketService {
    public get allUsers$(): Observable<IUserLocked[]> {
        return this._allUsers$;
    }

    public get addUser$(): Observable<IUserLocked> {
        return this._addUser$;
    }

    public get updateUser$(): Observable<IUserLocked> {
        return this._updateUser$;
    }

    public get removeUser(): Observable<IUserLocked> {
        return this._removeUser$;
    }

    public get changeLock$(): Observable<IWebSocketLock> {
        return this._changeLock$;
    }

    public get editRight$(): Observable<IWebSocketLock> {
        return this._editRight$;
    }


    private _webSocket: WebSocket;

    private _allUsers$: Subject<IUserLocked[]>;
    private _addUser$: Subject<IUserLocked>;
    private _updateUser$: Subject<IUserLocked>;
    private _removeUser$: Subject<IUserLocked>;
    private _changeLock$: Subject<IWebSocketLock>;
    private _editRight$: Subject<IWebSocketLock>;

    constructor() {
        this.connect();
        this.initStreams();
    }

    public connect(): void {
        try {
            // console.log("попытка установить соеденение с websocket");
            this._webSocket = new WebSocket("wss://localhost:44315/ws/WebSocketUser");
            // console.log("соединение установленно");
        } catch (e) {
            console.log("Не удалось установить соединение с websocket status_update");
            console.log(e);
        }
    }

    public initStreams(): void {
        this._allUsers$ = new Subject<IUserLocked[]>();
        this._changeLock$ = new Subject<IWebSocketLock>();
        this._addUser$ = new Subject<IUserLocked>();
        this._updateUser$ = new Subject<IUserLocked>();
        this._removeUser$ = new Subject<IUserLocked>();
        this._editRight$ = new Subject<IWebSocketLock>();

        const selector: { [key in WebSocketInstruction]: Function } = {
            allUsers: (allUsers: IUserLocked[]) => this._allUsers$.next(allUsers),
            addUser: (user: IUserLocked) => this._addUser$.next(user),
            updateUser: (user: IUserLocked) => this._updateUser$.next(user),
            changeLock: (idLock: IWebSocketLock) => this._changeLock$.next(idLock),
            removeUser: (user: IUserLocked) => this._removeUser$.next(user),
            editRight: (idLock: IWebSocketLock) => this._editRight$.next(idLock)
        };

        this._webSocket.onmessage = (messageEvent: MessageEvent): void => {
            const webSocketMessage: IWebSocketMessage = JSON.parse(messageEvent.data);
            selector[webSocketMessage.instruction](webSocketMessage.data);
        };
    }

    public loadAllUsers(): void {
        this._webSocket.send(JSON.stringify({
            "instruction": "allUsers"
        }));
    }

    public changeEditRight(item: IWebSocketLock): void {
        const request: IWebSocketMessage = {
            instruction: "editRight",
            data: item
        };
        this._webSocket.send(JSON.stringify(request));
    }
}
