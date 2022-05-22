import { WebSocketControllerAbstract } from "../web-socket-controller.abstract";
import { IWSMessageToClient } from "../../web-socket-message-to-client.interface";
import { Injectable } from "@angular/core";
import { WebSocketProvider } from "../../web-socket.service";
import { map, Observable, Subject, take } from "rxjs";
import { IUserLocked } from "../../../../models/user-model-locked.interface";
import { WSParser } from "../../ws-parser";
import { IItemLockModel } from "../../../../models/websocket-lock-item.interface";
import { IUser } from "../../../../models/user-model.interface";
import { WSEndPointAbstract } from "../end-point-abstract";
import { WSEditRightsEndpoint } from "./edit-right";
import { WSUserEndPoint } from "./user";
import { WSAllUsersEndPoint } from "./all-users";
import { IWSUserEndPoints } from "./user-socket-service.interface";
import { WSServerInstruction } from "../../ws-server-instruction.type";

@Injectable({
    providedIn: "root"
})
// export class WSUserProvider extends WebSocketControllerAbstract {
//     private _allUsers$: Subject<IUserLocked[]> = new Subject<IUserLocked[]>();
//     private _canEdit$: Subject<boolean> = new Subject<boolean>();
//     private _updateLock$: Subject<IItemLockModel> = new Subject<IItemLockModel>();
//     private _updateUser$: Subject<IUserLocked> = new Subject<IUserLocked>();
//     private _deleteUser$: Subject<IUserLocked> = new Subject<IUserLocked>();
//     private _addUser$: Subject<IUserLocked> = new Subject<IUserLocked>();
//     private readonly _endPointsSelector: { [key: string]: Function } = {};
//
//     public get updateUser$(): Observable<IUserLocked> {
//         return this._updateUser$.asObservable();
//     }
//
//     public get deleteUser$(): Observable<IUserLocked> {
//         return this._deleteUser$.asObservable();
//     }
//
//     public get addUser$(): Observable<IUserLocked>{
//         return this._addUser$.asObservable();
//     }
//
//     public get updateLock$(): Observable<IItemLockModel> {
//         return this._updateLock$.asObservable();
//     }
//
//     constructor(webSocketService: WebSocketProvider, private _mainController: WSMainController) {
//         super();
//         this.initEndPointSelector();
//         this._mainController.listenMessage$.subscribe((wsMessageToClient: IWSMessageToClient) => {
//             this.handleServerMessage(wsMessageToClient);
//         });
//     }
//
//     public getAllUser(): Observable<IUserLocked[]> {
//         this._webSocketProvider.send({ serverData: null, serverInstructions: ["getAllUsers"] });
//
//         return this._allUsers$;
//     }
//
//     public deleteUser(user: IUser): void {
//         this._webSocketProvider.send({ serverData: user, serverInstructions: ["deleteUser"] });
//     }
//
//     public updateUser(user: IUser): void {
//         this._webSocketProvider.send({ serverData: user, serverInstructions: ["updateUser"] });
//     }
//
//     public addUser(user: IUser): void {
//         this._webSocketProvider.send({ serverData: user, serverInstructions: ["addUser"] });
//     }
//
//     public deleteEditRight(lockedItem: IItemLockModel): void {
//         this._webSocketProvider.send({
//             serverData: lockedItem,
//             serverInstructions: ["deleteEditRight"]
//         });
//     }
//
//     public tryGetEditRight(itemToLock: IItemLockModel): Observable<boolean> {
//         this._webSocketProvider.send({
//             serverData: itemToLock,
//             serverInstructions: ["getEditRight"]
//         });
//
//         return this._canEdit$.asObservable().pipe(
//             take(1)
//         );
//     }
//
//     protected handleServerMessage(wsMessageToClient: IWSMessageToClient): void {
//         if (!wsMessageToClient?.clientInstructions || wsMessageToClient.clientInstructions.length === 0) {
//             throw new Error("Контроллер не получил инструкцию");
//         }
//         if (wsMessageToClient.clientInstructions.length !== 1) {
//             throw new Error("Данный контроллер не передает управление другим, но получил более 1-ой интсрукции\n"
//                 + wsMessageToClient.clientInstructions.join(", "));
//         }
//
//         const instruction: string = wsMessageToClient.clientInstructions.pop();
//
//         if (!instruction?.trim()) {
//             throw new Error("пустая инструкция");
//         }
//         if (!(instruction in this._endPointsSelector)) {
//             throw new Error("неизвестаня инструкция " + instruction);
//         }
//
//         this._endPointsSelector[instruction](wsMessageToClient);
//     }
//
//     private initEndPointSelector(): void {
//         this._endPointsSelector["allUsersResponse"] = (wsMessageToClient: IWSMessageToClient): void =>
//             this._allUsers$.next(wsMessageToClient.clientData);
//         this._endPointsSelector["editRightResponse"] = (wsMessageToClient: IWSMessageToClient): void =>
//             this._canEdit$.next(wsMessageToClient.clientData);
//         this._endPointsSelector["updateLock"] = (wsMessageToClient: IWSMessageToClient): void =>
//             this._updateLock$.next(wsMessageToClient.clientData);
//         this._endPointsSelector["updateUser"] = (wsMessageToClient: IWSMessageToClient): void =>
//             this._updateUser$.next(wsMessageToClient.clientData);
//         this._endPointsSelector["deleteUser"] = (wsMessageToClient: IWSMessageToClient): void =>
//             this._deleteUser$.next(wsMessageToClient.clientData);
//         this._endPointsSelector["addUser"] = (wsMessageToClient: IWSMessageToClient): void =>
//             this._addUser$.next(wsMessageToClient.clientData);
//     }
//
//     private send(serverInstructions: string[] | string, serverData: any, serverEntryPoint: string = "user"): void{
//         if (Array.isArray(serverInstructions)) {
//             this._webSocketProvider.send({
//                 serverData: serverData,
//                 serverInstructions: [serverEntryPoint, ...serverInstructions]
//             });
//         } else {
//             this._webSocketProvider.send({
//                 serverData: serverData,
//                 serverInstructions: [serverEntryPoint, serverInstructions]
//             });
//         }
//     }
// }
export class WSUserController extends WebSocketControllerAbstract {
    private _aliveCount: number = 0;
    private _wsUserEndPoints: IWSUserEndPoints;
    private _user$: Subject<IWSMessageToClient> = new Subject<IWSMessageToClient>();
    private _editRight$: Subject<IWSMessageToClient> = new Subject<IWSMessageToClient>();
    private _allUsers$: Subject<IWSMessageToClient> = new Subject<IWSMessageToClient>();

    private _endPointsSelector: { [key: string]: Function } = {
        "user": super.changeEmitter(this._user$),
        "editRight": super.changeEmitter(this._editRight$),
        "allUsers": super.changeEmitter(this._allUsers$)
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
        if (wsMessageToClient.clientInstructions.length !== 1) {
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
