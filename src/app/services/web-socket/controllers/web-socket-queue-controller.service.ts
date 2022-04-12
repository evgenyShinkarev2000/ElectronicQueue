import { WebSocketControllerAbstract } from "./web-socket-controller.abstract";
import { IWSMessageToClient } from "../web-socket-message-to-client.interface";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class WSQueueController extends WebSocketControllerAbstract{
    get checkConnection(): boolean {
        throw new Error("not implement yet");
    }

    get connectionState$(): Observable<boolean> {
        throw new Error("not implement yet");
    }
    protected handleServerMessage(wsMessageToClient: IWSMessageToClient): void {
        throw new Error("not implement yet");
    }
}
