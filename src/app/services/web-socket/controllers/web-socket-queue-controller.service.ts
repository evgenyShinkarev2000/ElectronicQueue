import { WebSocketControllerAbstract } from "./web-socket-controller.abstract";
import { IWSMessageToClient } from "../web-socket-message-to-client.interface";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class WSQueueController extends WebSocketControllerAbstract{
}
