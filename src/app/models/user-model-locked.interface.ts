import { IUser } from "./user-model.interface";
import { WebSocketLockStatus } from "./websocket-lock-item.interface";

export interface IUserLocked extends IUser{
    lockStatus: WebSocketLockStatus
}
