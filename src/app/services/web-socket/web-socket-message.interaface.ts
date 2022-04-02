import { IUserLocked } from "../../models/user-model-locked.interface";
import { IWebSocketLock } from "../../models/websocket-lock-item.interface";
import { IUser } from "../../models/user-model.interface";

export type WebSocketInstruction = "allUsers" | "updateUser" | "addUser" | "removeUser" | "changeLock" | "editRight"
export type WebSocketData = IUserLocked | IUserLocked[] | IUser | IWebSocketLock;

export interface IWebSocketMessage {
    instruction: WebSocketInstruction,
    data: WebSocketData
}
