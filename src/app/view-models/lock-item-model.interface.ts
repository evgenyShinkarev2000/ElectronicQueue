import { IUser } from "../models/user-model.interface";
import { ItemLockState } from "./lock-item-state.enum";

export interface ILockItemViewModel {
    item: IUser,
    lockState: ItemLockState,
    id: string
}
