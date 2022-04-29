import { Injectable } from '@angular/core';
import { IWSMessageToServer } from "./web-socket-message-to-server.interaface";
import { Observable, Subject } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { AuthService } from "../authentication/auth.service";

@Injectable({
    providedIn: 'root'
})
export class WebSocketService {
    private readonly _connectionState$: Subject<boolean> = new Subject<boolean>();
    private readonly _message$: Subject<string> = new Subject<string>();
    private _webSocket: WebSocket;
    private readonly _reconnectLimit: number = 5;
    private readonly _reconnectTime: number = 1000;
    private _wasConnectionWithoutError: boolean = false;
    private _reconnectCount: number = 0;

    constructor(private _httpClient: HttpClient, private _authService: AuthService) {
        this.connect();
    }

    public get listenMessage$(): Observable<string>{
        return this._message$.asObservable();
    }

    public checkConnection(): boolean{
        return this._webSocket && this._webSocket.readyState === this._webSocket.OPEN;
    }
    public listenConnectionState$(): Observable<boolean>{
        return this._connectionState$.asObservable();
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
        this._authService.getWebSocketTicket().subscribe((ticket: string) => {
            this._webSocket = new WebSocket(`wss://localhost:44315/ws/WebSocketAdmin/?webSocketTicket=${ticket}`);
            this._webSocket.onopen = (): void => this.open();
            this._webSocket.onerror = (er:Event): void => {
                this.reconnect();
                console.log(er);
            };

            this._webSocket.onclose = (): void => this.close();
        });
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
        this._connectionState$.next(false);
        if (this._wasConnectionWithoutError) {
            console.log("соединение закрыто");
            console.log(this._webSocket.readyState);
        }
    }

    private open(): void {
        console.log("успешное подключение к websocket");
        this._connectionState$.next(true);
        this._webSocket.onmessage = (message: MessageEvent): void =>
            this._message$.next(message.data);
        this._wasConnectionWithoutError = true;
        this._reconnectCount = 0;
    }
}
