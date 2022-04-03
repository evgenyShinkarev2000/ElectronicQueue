export type WebSocketLockStatus = "Lock" | "Free";

export interface IItemLock {
    userId: string,
    itemId: string,
    status: WebSocketLockStatus
}
