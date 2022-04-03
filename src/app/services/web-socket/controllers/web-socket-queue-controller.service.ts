import { WebSocketControllerAbstract } from "./web-socket-controller.abstract";
import { IWSMessageToClient } from "../web-socket-message-to-client.interface";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class WSQueueController extends WebSocketControllerAbstract{
    protected handleServerMessage(wsMessageToClient: IWSMessageToClient): void {
        throw new Error("not implement yet");
    }
}
