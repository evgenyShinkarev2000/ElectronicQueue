import { Injectable } from '@angular/core';
import { Observable, Subscriber } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class WebSocketService {

    constructor() {
    }

    public test(): Observable<any>{
        const webSocket: WebSocket = new WebSocket("wss://localhost:8080");
        const observable: Observable<any> = new Observable((subscriber: Subscriber<any>) => {
            webSocket.onmessage = (): any => subscriber.next(subscriber);
            webSocket.onerror = (): any => subscriber.error(subscriber);
            webSocket.onclose = (): any => subscriber.complete();
        });

        return observable;
    }
}
