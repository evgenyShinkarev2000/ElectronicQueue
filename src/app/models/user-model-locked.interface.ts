import { IUser } from "./user-model.interface";
import { IUpdatedWebsocketItem } from "./updated-websocket-item.interface";

export interface IUserLocked extends IUser, IUpdatedWebsocketItem{
}
