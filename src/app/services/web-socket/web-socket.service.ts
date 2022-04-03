import { Injectable } from '@angular/core';
import { IWSMessageToServer } from "./web-socket-message-to-server.interaface";
import { Observable, Subject } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class WebSocketService {
    public get listenMessage$(): Observable<string>{
        return this._message$.asObservable();
    }
    private readonly _message$: Subject<string> = new Subject<string>();
    private _webSocket: WebSocket;
    private readonly _reconnectLimit: number = 5;
    private readonly _reconnectTime: number = 1000;
    private _wasConnectionWithoutError: boolean = false;
    private _reconnectCount: number = 0;

    constructor() {
        this.connect();
    }

    public send(wsMessageToServer: IWSMessageToServer): void{
        if (this._webSocket.readyState !== this._webSocket.OPEN){
            throw new Error("попытка отправить сообщение на недостуный websocket");
        }

        if (!wsMessageToServer?.serverInstructions || wsMessageToServer.serverInstructions.length === 0){
            throw new Error("попытка отправить сообщение серверу с пустой инструкцией");
        }

        const jsonString: string = JSON.stringify(wsMessageToServer);
        this._webSocket.send(jsonString);
    }

    private connect(): void {
        this._webSocket = new WebSocket("wss://localhost:44315/ws/WebSocketUser");
        this._webSocket.onopen = (): void => this.open();
        this._webSocket.onerror = (er:Event): void => {
            this.reconnect();
            console.log(er);
        };

        this._webSocket.onclose = (): void => this.close();
    }

    private reconnect(): void {
        this._wasConnectionWithoutError = false;
        if (this._reconnectCount >= this._reconnectLimit) {
            console.log("не удалось подключиться к websocket");
        } else {
            this._reconnectCount++;
            console.log("reconnect...");
            setTimeout(() => this.connect(), this._reconnectTime);
        }
    }

    private close(): void {
        if (this._wasConnectionWithoutError) {
            console.log("сервер закрыл websocket, ошибка не произошла");
        }
    }

    private open(): void {
        console.log("успешное подключение к websocket");
        this._webSocket.onmessage = (message: MessageEvent): void =>
            this._message$.next(message.data);
        this._wasConnectionWithoutError = true;
        this._reconnectCount = 0;
    }
}
