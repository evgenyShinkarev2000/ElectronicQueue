import { WSEndPointAbstract } from "../end-point-abstract";
import { Observable, Subject, take } from "rxjs";
import { IWSMessageToClient } from "../../web-socket-message-to-client.interface";
import { IItemLockModel } from "../../../../models/websocket-lock-item.interface";
import { WsServerInstruction } from "../../ws-server-instruction.type";

export class WSEditRightsEndpoint extends WSEndPointAbstract{
    public override update$: Subject<IItemLockModel> = super.update$;
    constructor(send: (instruction: WsServerInstruction, data: any) => any, messageToClient$: Subject<IWSMessageToClient>){
        super(send, messageToClient$);
    }

    public override delete(lockedItem: IItemLockModel): void {
        super.delete(lockedItem);
    }

    public tryGet(itemToLock: IItemLockModel): Observable<boolean> {
        super.post(itemToLock);

        return super.post$.pipe(
            take(1)
        );
    }
}
