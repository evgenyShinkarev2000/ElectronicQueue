import { Subject } from "rxjs";
import { IUserLocked } from "../../../../models/user-model-locked.interface";
import { IWSMessageToClient } from "../../web-socket-message-to-client.interface";
import { IUser } from "../../../../models/user-model.interface";
import { WSEndPointAbstract } from "../end-point-abstract";
import { WSServerInstruction } from "../../ws-server-instruction.type";

export class WSUserEndPoint extends WSEndPointAbstract{
    public override update$: Subject<IUserLocked>;
    public override delete$: Subject<IUserLocked>;
    public override post$: Subject<IUserLocked>;

    constructor(send: (x: WSServerInstruction, y: any) => any, messageToClient$: Subject<IWSMessageToClient>){
        super(send, messageToClient$);
    }

    public override delete(user: IUser): void {
        super.delete(user);
    }

    public override update(user: IUser): void {
        super.update(user);
    }

    public override post(user: IUser): void {
        super.post(user);
    }
}
