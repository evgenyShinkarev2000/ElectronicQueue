import { WsServerInstruction } from "../ws-server-instruction.type";
import { WSClientInstruction } from "../ws-client-instruction.type";
import { Subject } from "rxjs";
import { IWSMessageToClient } from "../web-socket-message-to-client.interface";
import { IUserLocked } from "../../../models/user-model-locked.interface";

export abstract class WSEndPointAbstract{
    protected update$: Subject<any> = new Subject<any>();
    protected delete$: Subject<any> = new Subject<any>();
    protected post$: Subject<any> = new Subject<any>();
    protected get$: Subject<any> = new Subject<any>();
    private _methodSelector: { [key in WSClientInstruction]: Function } = {
        "post": this.changeEmitter(this.post$),
        "delete": this.changeEmitter(this.delete$),
        "update": this.changeEmitter(this.update$),
        "get": this.changeEmitter(this.get$)
    };

    protected constructor(
        private _send: (x: WsServerInstruction, y?: any) => any,
        private _messageToClient$: Subject<IWSMessageToClient>) {
        _messageToClient$.subscribe((next: IWSMessageToClient) => {
            this._methodSelector[next.clientInstructions.pop() as WSClientInstruction](next.clientData);
        });
    }
    protected delete(data?: any): any{
        return this._send("delete", data);
    }
    protected update(data?: any): any{
        return this._send("update", data);
    }
    protected post(data?: any): any{
        return this._send("post", data);
    }
    protected get(data?: any): any{
        return this._send("get", data);
    }

    private changeEmitter(s: Subject<any>): Function{
        return (wsMessageToClient: IWSMessageToClient) => s.next(wsMessageToClient.clientData);
    }
}
