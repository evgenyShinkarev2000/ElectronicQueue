import { IWSMessageToClient } from "../web-socket-message-to-client.interface";
import { Observable } from "rxjs";

export abstract class WebSocketControllerAbstract {
    protected abstract handleServerMessage(wsMessageToClient: IWSMessageToClient): void;
    public abstract get connectionState$(): Observable<boolean>;
    public abstract checkConnection(): boolean;
}
