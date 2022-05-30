import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";
import { map, Observable, take } from "rxjs";
import { EQDayPattern } from "../../models/EQDayPattern";
import { IEQDayPatternTransfer } from "../../models/transfer/EQDayPatternTransfer.interface";
import { HostService } from "./host-service";

@Injectable({
    providedIn: 'root'
})
export class QueuePatternController {

    private readonly _controllerURI: string = this._hostService.apiURI + "QueuePattern/";

    constructor(private _httpClient: HttpClient, private _hostService: HostService) {
    }

    public getAllDayPatterns(): Observable<EQDayPattern[]> {
        return this._httpClient.get<IEQDayPatternTransfer[]>(this._controllerURI + "dayPatterns").pipe(
            take(1),
            map((data: IEQDayPatternTransfer[]) => {
                return data.map((dayPatternTransfer: IEQDayPatternTransfer) => {
                    return EQDayPattern.fromDTO(dayPatternTransfer);
                });
            })
        );
    }

    public postDayPattern(dayPattern: EQDayPattern): Observable<any> {
        return this._httpClient.post(this._controllerURI + "dayPattern", dayPattern.toDTO()).pipe(
            take(1)
        );
    }

    public deleteDayPattern(name: string): Observable<any> {
        let params: HttpParams = new HttpParams();
        params = params.append("name", name);

        return this._httpClient.delete(this._controllerURI + "dayPattern", { params }).pipe(
            take(1)
        );
    }

    public updateDayPattern(dayPattern: EQDayPattern): Observable<any>{
        return this._httpClient.put(this._controllerURI + "dayPattern", dayPattern).pipe(
            take(1)
        );
    }
}
