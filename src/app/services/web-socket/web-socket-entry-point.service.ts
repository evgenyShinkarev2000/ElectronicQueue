import { IWSMessageToClient } from "./web-socket-message-to-client.interface";
import { WebSocketProvider } from "./web-socket.service";
import { Injectable } from "@angular/core";
import { map, Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class WSMainController {
    public get listenMessage$(): Observable<IWSMessageToClient> {
        return this._webSocketService.listenMessage$.pipe(map((jsonString: string) => {
            return this.handleServerJsonMessage(jsonString);
        }));
    }

    constructor(private _webSocketService: WebSocketProvider) {

    }


    private handleServerJsonMessage(jsonString: string): IWSMessageToClient {
        const messageToClient: IWSMessageToClient = JSON.parse(jsonString);
        if (!messageToClient?.clientInstructions
            || typeof messageToClient.clientInstructions !== typeof []
            || messageToClient.clientInstructions.length === 0) {
            throw new Error("пустая строка инструкций от сервера");
        }

        return messageToClient;
    }
}
