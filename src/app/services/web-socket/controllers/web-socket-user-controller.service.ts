import { WebSocketControllerAbstract } from "./web-socket-controller.abstract";
import { IWSMessageToClient } from "../web-socket-message-to-client.interface";
import { Injectable } from "@angular/core";
import { WebSocketService } from "../web-socket.service";
import { Observable, Subject, take } from "rxjs";
import { IUserLocked } from "../../../models/user-model-locked.interface";
import { WSMainController } from "../web-socket-entry-point.service";
import { IItemLock } from "../../../models/websocket-lock-item.interface";

@Injectable({
    providedIn: 'root'
})
export class WSUserController extends WebSocketControllerAbstract {
    private _allUsers$: Subject<IUserLocked[]> = new Subject<IUserLocked[]>();
    private _canEdit$: Subject<boolean> = new Subject<boolean>();
    private readonly _endPointsSelector: { [key: string]: Function } = {};


    constructor(private _webSocketService: WebSocketService, private _mainController: WSMainController) {
        super();
        this.initEndPointSelector();
        this._mainController.listenMessage$.subscribe((wsMessageToClient: IWSMessageToClient) => {
            this.handleServerMessage(wsMessageToClient);
        });
    }

    public getAllUser(): Observable<IUserLocked[]> {
        this._webSocketService.send({ serverData: null, serverInstructions: ["getAllUsers"] });

        return this._allUsers$.asObservable();
    }

    public deleteEditRight(lockedItem: IItemLock): void{
        this._webSocketService.send({
            serverData: lockedItem,
            serverInstructions: ["deleteEditRight"]
        });
    }

    public tryGetEditRight(itemToLock: IItemLock): Observable<boolean>{
        //соединение падает на 2-ом вызове, всегда
        this._webSocketService.send({
            serverData: itemToLock,
            serverInstructions: ["getEditRight"]
        });

        return this._canEdit$.asObservable().pipe(
            take(1)
        );
    }

    protected handleServerMessage(wsMessageToClient: IWSMessageToClient): void {
        if (!wsMessageToClient?.clientInstructions || wsMessageToClient.clientInstructions.length === 0) {
            throw new Error("Контроллер не получил инструкцию");
        }
        if (wsMessageToClient.clientInstructions.length !== 1) {
            throw new Error("Данный контроллер не передает управление другим, но получил более 1-ой интсрукции\n"
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

    private initEndPointSelector(): void {
        this._endPointsSelector["allUsersResponse"] = (wsMessageToClient: IWSMessageToClient): void =>
            this._allUsers$.next(wsMessageToClient.clientData);
        this._endPointsSelector["editRightResponse"] = (wsMessageToClient: IWSMessageToClient): void =>
            this._canEdit$.next(wsMessageToClient.clientData);
    }
}
