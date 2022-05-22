import { WSEndPointAbstract } from "../end-point-abstract";
import { Subject } from "rxjs";
import { IWSMessageToClient } from "../../web-socket-message-to-client.interface";
import { WSServerInstruction } from "../../ws-server-instruction.type";
import { IUserLocked } from "../../../../models/user-model-locked.interface";

export class WSAllUsersEndPoint extends WSEndPointAbstract {
    public override post$: Subject<IUserLocked[]>;

    constructor(send: (instruction: WSServerInstruction, data: any) => any, messageToClient$: Subject<IWSMessageToClient>) {
        super(send, messageToClient$);
    }

    public override get(): void{
        super.get();
    }
}
