import { IWSMessageToClient } from "./web-socket-message-to-client.interface";
import { WebSocketProvider } from "./web-socket.service";
import { Injectable } from "@angular/core";
import { map, Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class WSParser {
    constructor() {

    }
    public parse(jsonString: string): IWSMessageToClient {
        const messageToClient: IWSMessageToClient = JSON.parse(jsonString);
        if (!messageToClient?.clientInstructions
            || typeof messageToClient.clientInstructions !== typeof []
            || messageToClient.clientInstructions.length === 0) {
            throw new Error("пустая строка инструкций от сервера");
        }

        return messageToClient;
    }
}
