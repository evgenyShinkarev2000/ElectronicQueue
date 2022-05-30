import { EQRecordType } from "./EQRecordType";
import { TimeOnly } from "./TimeOnly";
import { IEQRecordPatternTransfer } from "./transfer/EQRecordPatternTransfer.inteface";

export class EQRecordPattern {
    public static fromDTO(obj: IEQRecordPatternTransfer): EQRecordPattern{
        return new EQRecordPattern(
            TimeOnly.fromMinutes(parseInt(obj.beginTime)),
            TimeOnly.fromMinutes(parseInt(obj.endTime)),
            obj.type
        );
    }

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

    public toDTO(): IEQRecordPatternTransfer{
        return {
            "beginTime": this.beginTime.toDTO(),
            "endTime": this.endTime.toDTO(),
            "type": this.type
        };
    }

    public toString(): string{
        return `${this.beginTime.toString()}-${this.endTime.toString()}`;
    }

    public getCopy(): EQRecordPattern{
        return new EQRecordPattern(this.beginTime.getCopy(), this.endTime.getCopy(), this.type);
    }
}
