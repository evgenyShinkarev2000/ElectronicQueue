import { IWSMessageToClient } from "../web-socket-message-to-client.interface";

export abstract class WebSocketControllerAbstract {
    protected abstract handleServerMessage(wsMessageToClient: IWSMessageToClient): void;
}
