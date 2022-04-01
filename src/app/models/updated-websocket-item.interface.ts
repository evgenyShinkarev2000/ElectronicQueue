export type UpdatedWebsocketItemStatus = "Locked" | "Free";

export interface IUpdatedWebsocketItem {
    id: string,
    status: UpdatedWebsocketItemStatus
}
