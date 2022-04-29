import { WebSocketControllerAbstract } from "./web-socket-controller.abstract";
import { IWSMessageToClient } from "../web-socket-message-to-client.interface";
import { Injectable } from "@angular/core";
import { WebSocketService } from "../web-socket.service";
import { Observable, Subject, take } from "rxjs";
import { IUserLocked } from "../../../models/user-model-locked.interface";
import { WSMainController } from "../web-socket-entry-point.service";
import { IItemLockModel } from "../../../models/websocket-lock-item.interface";
import { IUser } from "../../../models/user-model.interface";

@Injectable({
    providedIn: 'root'
})
export class WSUserController extends WebSocketControllerAbstract {
    private _allUsers$: Subject<IUserLocked[]> = new Subject<IUserLocked[]>();
    private _canEdit$: Subject<boolean> = new Subject<boolean>();
    private _updateLock$: Subject<IItemLockModel> = new Subject<IItemLockModel>();
    private _updateUser$: Subject<IUserLocked> = new Subject<IUserLocked>();
    private _deleteUser$: Subject<IUserLocked> = new Subject<IUserLocked>();
    private _addUser$: Subject<IUserLocked> = new Subject<IUserLocked>();
    private readonly _endPointsSelector: { [key: string]: Function } = {};

    public get updateUser$(): Observable<IUserLocked> {
        return this._updateUser$.asObservable();
    }

    public get deleteUser$(): Observable<IUserLocked> {
        return this._deleteUser$.asObservable();
    }

    public get addUser$(): Observable<IUserLocked>{
        return this._addUser$.asObservable();
    }

    public get updateLock$(): Observable<IItemLockModel> {
        return this._updateLock$.asObservable();
    }

    public override get connectionState$(): Observable<boolean> {
        return this._webSocketService.listenConnectionState$();
    }

    constructor(private _webSocketService: WebSocketService, private _mainController: WSMainController) {
        super();
        this.initEndPointSelector();
        this._mainController.listenMessage$.subscribe((wsMessageToClient: IWSMessageToClient) => {
            this.handleServerMessage(wsMessageToClient);
        });
    }

    public override checkConnection(): boolean {
        return this._webSocketService.checkConnection();
    }

    public getAllUser(): Observable<IUserLocked[]> {
        this._webSocketService.send({ serverData: null, serverInstructions: ["getAllUsers"] });

        return this._allUsers$.asObservable();
    }

    public deleteUser(user: IUser): void {
        this._webSocketService.send({ serverData: user, serverInstructions: ["deleteUser"] });
    }

    public updateUser(user: IUser): void {
        this._webSocketService.send({ serverData: user, serverInstructions: ["updateUser"] });
    }

    public addUser(user: IUser): void {
        this._webSocketService.send({ serverData: user, serverInstructions: ["addUser"] });
    }

    public deleteEditRight(lockedItem: IItemLockModel): void {
        this._webSocketService.send({
            serverData: lockedItem,
            serverInstructions: ["deleteEditRight"]
        });
    }

    public tryGetEditRight(itemToLock: IItemLockModel): Observable<boolean> {
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
        this._endPointsSelector["updateLock"] = (wsMessageToClient: IWSMessageToClient): void =>
            this._updateLock$.next(wsMessageToClient.clientData);
        this._endPointsSelector["updateUser"] = (wsMessageToClient: IWSMessageToClient): void =>
            this._updateUser$.next(wsMessageToClient.clientData);
        this._endPointsSelector["deleteUser"] = (wsMessageToClient: IWSMessageToClient): void =>
            this._deleteUser$.next(wsMessageToClient.clientData);
        this._endPointsSelector["addUser"] = (wsMessageToClient: IWSMessageToClient): void =>
            this._addUser$.next(wsMessageToClient.clientData);
    }
}
