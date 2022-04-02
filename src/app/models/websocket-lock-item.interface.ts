export type WebSocketLockStatus = "Lock" | "Free";

export interface IWebSocketLock {
    userId: string,
    itemId: string,
    status: WebSocketLockStatus
}
