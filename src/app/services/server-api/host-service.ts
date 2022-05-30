import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class HostService{
    public readonly serverURL: string = "localhost:44315/";
    public readonly apiURI: string ="https://" + this.serverURL + "api/";
}
