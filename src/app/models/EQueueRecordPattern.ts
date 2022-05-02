import { EQRecordType } from "./EQRecordType";
import { TimeOnly } from "./TimeOnly,ts";

export class EQRecordPattern {
    public beginTime: TimeOnly;
    public endTime: TimeOnly;
    public type: EQRecordType;

    public get duration(): number{
        return this.endTime.toMinutes() - this.beginTime.toMinutes();
    }

    constructor(
        beginTime: TimeOnly = new TimeOnly(),
        endTime: TimeOnly = new TimeOnly(),
        type: EQRecordType = "reception"
    ) {
        this.beginTime = beginTime;
        this.endTime = endTime;
        this.type = type;
    }
}
