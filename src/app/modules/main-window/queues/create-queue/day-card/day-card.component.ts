import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { EQDayPattern } from "../../../../../models/EQDayPattern";
import { EQRecordPattern } from "../../../../../models/EQueueRecordPattern";
import { TimeOnly } from "../../../../../models/TimeOnly";
import { round } from "@popperjs/core/lib/utils/math";

@Component({
    selector: 'app-day-card',
    templateUrl: './day-card.component.html',
    styleUrls: ['./day-card.component.scss']
})
export class DayCardComponent implements OnInit {

    @Input()
    public day: EQDayPattern;
    @Output()
    public removeDayEvent: EventEmitter<string> = new EventEmitter<string>();
    @Output()
    public editDayEvent: EventEmitter<EQDayPattern> = new EventEmitter<EQDayPattern>();

    constructor() {
    }

    ngOnInit(): void {
    }

    public removeDay(): void {
        this.removeDayEvent.emit(this.day.name);
    }

    public editDay(): void {
        this.editDayEvent.emit(this.day);
    }

    public getRestString(): string {
        return this.day.getRestRecords().map((record: EQRecordPattern) => {
            return record.toString();
        }).join(", ");
    }

    public findReceptionTime(): string {
        return this.day.getReceptionDuration().toString();
    }

    public findMiddleReceptionTime(): string{
        const count: number = this.day.getReceptionRecords().length;
        if (count === 0){
            return "00:00";
        }

        return TimeOnly.fromMinutes(round(this.day.getReceptionDuration().toMinutes() / count)).toString();
    }
}
