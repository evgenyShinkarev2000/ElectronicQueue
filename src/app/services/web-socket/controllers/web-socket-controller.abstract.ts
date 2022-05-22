import { Observable } from "rxjs";
import { WebSocketProvider } from "../web-socket.service";
import { inject } from "@angular/core";

export class WebSocketControllerAbstract {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    protected _webSocketProvider: WebSocketProvider = inject(WebSocketProvider);
    // eslint-disable-next-line @typescript-eslint/naming-convention
    constructor() {
    }

    public get connectionState$(): Observable<boolean> {
        return this._webSocketProvider.listenConnectionState$();
    }

    public checkConnection(): boolean {
        return this._webSocketProvider.checkConnection();
    }
}
