import { WebSocketControllerAbstract } from "../web-socket-controller.abstract";
import { IWSMessageToClient } from "../../web-socket-message-to-client.interface";
import { Injectable } from "@angular/core";
import { WebSocketProvider } from "../../web-socket.service";
import { map, Subject } from "rxjs";
import { WSParser } from "../../ws-parser";
import { WSEditRightsEndpoint } from "./edit-right";
import { WSUserEndPoint } from "./user";
import { WSAllUsersEndPoint } from "./all-users";
import { IWSUserEndPoints } from "./user-socket-service.interface";
import { WSServerInstruction } from "../../ws-server-instruction.type";

@Injectable({
    providedIn: "root"
})
export class WSUserController extends WebSocketControllerAbstract {
    private _aliveCount: number = 0;
    private _wsUserEndPoints: IWSUserEndPoints;
    private _user$: Subject<IWSMessageToClient> = new Subject<IWSMessageToClient>();
    private _editRight$: Subject<IWSMessageToClient> = new Subject<IWSMessageToClient>();
    private _allUsers$: Subject<IWSMessageToClient> = new Subject<IWSMessageToClient>();

    private _endPointsSelector: { [key: string]: Function } = {
        "user": this.changeEmitter(this._user$),
        "editRight": this.changeEmitter(this._editRight$),
        "allUsers": this.changeEmitter(this._allUsers$)
    };

    constructor(webSocketProvider: WebSocketProvider, private _wsParser: WSParser) {
        super(webSocketProvider);
        this.webSocketProvider.listenMessage$.pipe(
            map((message: string): IWSMessageToClient => _wsParser.parse(message))
        ).subscribe((wsMessageToClient: IWSMessageToClient) => {
            this.handleServerMessage(wsMessageToClient);
        });
    }

    public getWSUserEndPoints(): IWSUserEndPoints {
        if (!this._wsUserEndPoints) {
            this._wsUserEndPoints = {
                user: new WSUserEndPoint(this.createSender("user"), this._user$),
                editRight: new WSEditRightsEndpoint(this.createSender("editRight"), this._editRight$),
                allUsers: new WSAllUsersEndPoint(this.createSender("allUsers"), this._allUsers$)
            };
        }
        if (this._aliveCount === 0) {
            this.webSocketProvider.connectTo("WebSocketAdmin/?webSocketTicket=");
        }

        this._aliveCount += 1;

        return this._wsUserEndPoints;
    }

    public removeUserSocketService(): void {
        this._aliveCount -= 1;
        if (this._aliveCount <= 0) {
            this.webSocketProvider.disconnect();
        }
    }

    private handleServerMessage(wsMessageToClient: IWSMessageToClient): void {
        if (!wsMessageToClient?.clientInstructions || wsMessageToClient.clientInstructions.length === 0) {
            throw new Error("Контроллер не получил инструкцию");
        }
        if (wsMessageToClient.clientInstructions.length > 2) {
            throw new Error("Данный контроллер не передает управление другим, но получил более 2-ух интсрукций\n"
                + wsMessageToClient.clientInstructions.join(", "));
        }

        const instruction: string = wsMessageToClient.clientInstructions.pop();

        if (!instruction?.trim()) {
            throw new Error("пустая инструкция");
        }
        if (!(instruction in this._endPointsSelector)) {
            throw new Error("неизвестаня инструкция " + instruction);
        }

        this._endPointsSelector[instruction](wsMessageToClient);
    }

    private createSender(endPointName: keyof IWSUserEndPoints): (instruction: WSServerInstruction, data?: any) => any {
        const webSocketProvider: WebSocketProvider = this.webSocketProvider;

        return (instruction: WSServerInstruction, data?: any) => {
            const instructions: string[] = [instruction, endPointName];
            webSocketProvider.send({
                serverData: data,
                serverInstructions: instructions
            });
        };
    }
}
