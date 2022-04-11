export type WebSocketLockStatus = "Lock" | "Free";

export interface IItemLockModel {
    userId: string,
    itemId: string,
    status: WebSocketLockStatus
}
