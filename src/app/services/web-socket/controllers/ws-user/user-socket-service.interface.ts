import { WSUserEndPoint } from "./user";
import { WSEditRightsEndpoint } from "./edit-right";
import { WSAllUsersEndPoint } from "./all-users";

export interface IWSUserEndPoints {
    user: WSUserEndPoint,
    editRight: WSEditRightsEndpoint,
    allUsers: WSAllUsersEndPoint
}
