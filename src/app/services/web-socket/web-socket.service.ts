import { Injectable } from '@angular/core';
import { map, Observable, skip, Subscriber } from "rxjs";
import { IUser } from "../../models/user-model.interface";

@Injectable({
    providedIn: 'root'
})
export class WebSocketService {
    private _webSocket: WebSocket;
    private _observableWebSocket: Observable<IUser>;

    constructor() {
    }

    public connect(): void {
        try {
            this._webSocket = new WebSocket("wss://localhost:44315/WebSocket/users");
        } catch (e) {
            console.log("Не удалось установить соединение с websocket");
            console.log(e);
        }
    }

    public getUserStream$(): Observable<IUser> {
        if (!this._observableWebSocket) {
            this._observableWebSocket = new Observable<any>((subscriber: Subscriber<any>) => {
                this._webSocket.onmessage = (e: MessageEvent): void => {
                    console.log("onmessage сработало");
                    subscriber.next(e.data);
                };
            }).pipe(
                skip(1),
                map((user: string) => JSON.parse(user))
            );
        }

        return this._observableWebSocket;
    }

    public sendUserInStream(count: number): void {
        this._webSocket.send(count.toString());
    }

}
