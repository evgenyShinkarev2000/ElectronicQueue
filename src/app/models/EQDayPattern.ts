import { EQRecordPattern } from "./EQueueRecordPattern";
import { TimeOnly } from "./TimeOnly";
import { IEQDayPatternTransfer } from "./transfer/EQDayPatternTransfer.interface";
import { IEQRecordPatternTransfer } from "./transfer/EQRecordPatternTransfer.inteface";
import { round } from "@popperjs/core/lib/utils/math";

export class EQDayPattern {
    public static fromDTO(obj: IEQDayPatternTransfer): EQDayPattern {
        const day: EQDayPattern = new EQDayPattern(obj.records.map((record: IEQRecordPatternTransfer) => {
            return EQRecordPattern.fromDTO(record);
        }));
        day.creatorId = obj.creatorId;
        day.name = obj.name;

        return day;
    }

    public name: string = "";
    public creatorId: string;
    private _records: EQRecordPattern[] = [];
    public get records(): Readonly<EQRecordPattern[]> {
        return this._records;
    }

    public get beginTime(): TimeOnly {
        return this._beginTime;
    }

    public get endTime(): TimeOnly {
        const index: number = this._records.length - 1;
        if (index < 0) {
            return this.beginTime;
        }

        return this._records[index].endTime;
    }

    private _beginTime: TimeOnly = new TimeOnly();

    constructor(records?: EQRecordPattern[]) {
        if (records) {
            records.forEach((record: EQRecordPattern) => {
                this.tryAddEnd(record);
            });

            if (this._records.length > 0) {
                this._beginTime = records[0].beginTime.getCopy();
            }
        }
    }

    /**
     * смещает все записи назад
     * @return {boolean} true when can add
     */
    public tryAddBeforeShift(targetRecord: EQRecordPattern, newRecord: EQRecordPattern): boolean {
        const shiftTime: number = newRecord.endTime.toMinutes() + newRecord.beginTime.toMinutes();
        if (this.beginTime.toMinutes() - shiftTime >= 0) {
            const targetIndex: number = this._records
                .findIndex((record: EQRecordPattern) => record.beginTime === targetRecord.beginTime);
            if (targetIndex < 0) {
                throw new Error("Этот метод должен вызываться из targetRecord");
            }

            const updatedRecords: EQRecordPattern[] = [];
            for (let i: number = 0; i < targetIndex; i++) {
                this._records[i].beginTime = TimeOnly.fromMinutes(this._records[i].beginTime.toMinutes() - shiftTime);
                this._records[i].endTime = TimeOnly.fromMinutes(this._records[i].endTime.toMinutes() - shiftTime);
                updatedRecords.push(this._records[i]);
            }

            updatedRecords.push(newRecord);
            this._records = updatedRecords.concat(this._records.slice(targetIndex, this._records.length - 1));

            return true;
        }

        return false;
    }

    public tryAddEnd(newRecord: EQRecordPattern): boolean {
        if (this.canAddEnd(newRecord.duration)) {
            this._records.push(newRecord);

            return true;
        }

        return false;
    }

    public canAddEnd(duration: number): boolean {
        return this.endTime.toMinutes() + duration < 60 * 24;
    }

    public changeBeginTimeShiftRecords(beginTime: TimeOnly): void {
        const shift: number = beginTime.toMinutes() - this.beginTime.toMinutes();
        this._beginTime = TimeOnly.fromMinutes(this._beginTime.toMinutes() + shift);
        this._records = this._records.map((record: EQRecordPattern) => {
            return new EQRecordPattern(
                TimeOnly.fromMinutes(record.beginTime.toMinutes() + shift),
                TimeOnly.fromMinutes(record.endTime.toMinutes() + shift),
                record.type);
        });
    }

    public removeRecord(recordIndex: number): void {
        if (recordIndex < 0 || recordIndex >= this._records.length) {
            throw new Error();
        }

        this._records.splice(recordIndex, 1);
    }

    public toDTO(): IEQDayPatternTransfer {
        return {
            "name": this.name,
            "records": this.records.map((record: EQRecordPattern) => record.toDTO()),
            "creatorId": this.creatorId
        };
    }

    public getCopy(): EQDayPattern {
        const copy: EQDayPattern = new EQDayPattern(this._records.map((record: EQRecordPattern) => record.getCopy()));
        copy.name = this.name;
        copy.creatorId = this.creatorId;

        return copy;
    }

    public getRestRecords(): EQRecordPattern[] {
        return this._records.filter((record: EQRecordPattern) => record.type === "rest");
    }

    public getReceptionRecords(): EQRecordPattern[] {
        return this._records.filter((record: EQRecordPattern) => record.type === "reception");
    }

    public getReceptionDuration(): TimeOnly {
        let minutes: number = 0;
        this.getReceptionRecords().forEach((record: EQRecordPattern) => {
            minutes += record.duration;
        });

        return TimeOnly.fromMinutes(minutes);
    }
}
