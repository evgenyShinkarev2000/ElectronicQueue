import { Observable, Subject } from "rxjs";
import { WebSocketProvider } from "../web-socket.service";
import { inject } from "@angular/core";
import { IWSMessageToClient } from "../web-socket-message-to-client.interface";

export abstract class WebSocketControllerAbstract {

    constructor(protected webSocketProvider: WebSocketProvider) {
    }

    public get connectionState$(): Observable<boolean> {
        return this.webSocketProvider.listenConnectionState$();
    }

    public checkConnection(): boolean {
        return this.webSocketProvider.checkConnection();
    }

    protected changeEmitter(s: Subject<any>): Function{
        return (wsMessageToClient: IWSMessageToClient) => s.next(wsMessageToClient);
    }
}
