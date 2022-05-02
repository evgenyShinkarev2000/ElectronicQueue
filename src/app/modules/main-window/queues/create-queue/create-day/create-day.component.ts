import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActionType } from "./action-type.enum";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { CustomValidators } from "../../../../../models/CustomValidators";
import { EQRecordType } from "../../../../../models/EQRecordType";
import { EQRecordPattern } from "../../../../../models/EQueueRecordPattern";
import { EQDay } from "../../../../../models/EQDay";
import { TimeOnly } from "../../../../../models/TimeOnly,ts";
import { Observable, Subscription } from "rxjs";

@Component({
    selector: 'app-create-day',
    templateUrl: './create-day.component.html',
    styleUrls: ['./create-day.component.scss']
})
export class CreateDayComponent implements OnInit {

    public radioValue: EQRecordType = "reception";
    public actionsForm: FormGroup = new FormGroup(
        {
            "duration": new FormControl("00:01", CustomValidators.minMinutes(1)),
            "count": new FormControl(1, Validators.min(1))
        });

    public infoForm: FormGroup = new FormGroup({
        "dayName": new FormControl(null, Validators.required),
        "receptionBegin": new FormControl("09:00", Validators.required)
    });

    public day: EQDay = new EQDay();

    private readonly _subscriptions: Subscription[] = [];


    constructor() {
    }

    ngOnInit(): void {
        this.day.changeBeginTimeShiftRecords(new TimeOnly("09:00"));
        this._subscriptions.push(this.infoForm.get('receptionBegin').valueChanges.subscribe((value: any) => {
            this.day.changeBeginTimeShiftRecords(new TimeOnly(value));
        }));

    }

    public canAddRecords(): boolean {
        const duration: TimeOnly = this.getDuration();
        const count: number = this.getCount();

        return this.day.canAddEnd(duration.toMinutes() * count);
    }

    public findEndTime(): string {
        const result: TimeOnly | null = TimeOnly.tryFromMinutes(
            this.getDuration().toMinutes()
            * this.getCount()
            + this.day.endTime.toMinutes());
        if (result === null) {
            return "Запись переходит на следующую дату. Создайте ещё один день";
        }

        return result.toString();
    }

    public changeType(type: EQRecordType): void {
        this.radioValue = type;
        if (type === "reception") {
            this.actionsForm.get('count').enable();
        } else if (type === "rest") {
            this.actionsForm.get('count').disable();
        }
    }


    public addRecords(): void {
        const duration: TimeOnly = this.getDuration();
        const count: number = this.getCount();
        const type: EQRecordType = this.radioValue;
        let startTime: TimeOnly = this.day.endTime;
        for (let i: number = 0; i < count; i++) {
            const endTime: TimeOnly = TimeOnly.fromMinutes(startTime.toMinutes() + duration.toMinutes());
            this.day.tryAddEnd(new EQRecordPattern(startTime, endTime, type));
            startTime = endTime.getCopy();
        }
    }


    private getDuration(): TimeOnly {
        return new TimeOnly(this.actionsForm.get('duration').value);
    }

    private getCount(): number {
        return this.radioValue === "reception" ? parseInt(this.actionsForm.get('count').value as string) : 1;
    }

}
