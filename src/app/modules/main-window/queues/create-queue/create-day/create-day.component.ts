import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActionType } from "./action-type.enum";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { CustomValidators } from "../../../../../models/CustomValidators";
import { EQRecordType } from "../../../../../models/EQRecordType";
import { EQRecordPattern } from "../../../../../models/EQueueRecordPattern";
import { EQDayPattern } from "../../../../../models/EQDayPattern";
import { TimeOnly } from "../../../../../models/TimeOnly";
import { Observable, Subscription } from "rxjs";
import { QueuePatternController } from "../../../../../services/server-api/queue-pattern-controller.service";
import { AuthService } from "../../../../../services/authentication/auth.service";

@Component({
    selector: 'app-create-day',
    templateUrl: './create-day.component.html',
    styleUrls: ['./create-day.component.scss']
})
export class CreateDayComponent implements OnInit, OnDestroy {

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

    public day: EQDayPattern = new EQDayPattern();
    public dayCards: EQDayPattern[] = [];
    public isOverrideMode: boolean = false;

    private readonly _subscriptions: Subscription[] = [];


    constructor(private _queuePatternController: QueuePatternController, private _authService: AuthService) {
    }

    public ngOnInit(): void {
        this.day.changeBeginTimeShiftRecords(new TimeOnly("09:00"));
        this._subscriptions.push(this.infoForm.get('receptionBegin').valueChanges.subscribe((value: any) => {
            this.day.changeBeginTimeShiftRecords(new TimeOnly(value));
        }));
        this._subscriptions.push(this._queuePatternController.getAllDayPatterns().subscribe((data: EQDayPattern[]) => {
            this.dayCards = data;
        }));
        this._subscriptions.push(this.infoForm.get("dayName").valueChanges.subscribe((name: string) => {
            const index: number = this.dayCards.findIndex((day: EQDayPattern) => day.name === name);
            this.isOverrideMode = index >= 0;
        }));
    }

    public ngOnDestroy(): void {
        this._subscriptions.forEach((sub:Subscription) => sub.unsubscribe());
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

    public saveDay(): void{
        this.day.name = this.infoForm.get("dayName").value;
        this.day.creatorId = this._authService.userAuthData.id;

        console.log(this.day.toDTO());
        const oldDay: EQDayPattern = this.day;
        this._subscriptions.push(this._queuePatternController.postDayPattern(this.day).subscribe((next: any) => {
            this.dayCards.push(oldDay);
        }));

        this.clear();
    }

    public overrideDay(): void{
        const updatedDay: EQDayPattern = this.day;
        const s: Subscription = this._queuePatternController.updateDayPattern(this.day).subscribe((next: any) => {
            const index: number = this.dayCards.findIndex((oldDay: EQDayPattern) => oldDay.name === updatedDay.name);
            if (index >= 0){
                this.dayCards[index] = updatedDay;
            }
            else{
                throw new Error("Выбран режим перезаписи, но нет дня для обновлени");
            }
        });
        this._subscriptions.push(s);
        this.clear();
    }

    public clear(): void{
        this.day = new EQDayPattern();
        this.day.changeBeginTimeShiftRecords(new TimeOnly("09:00"));
        this.infoForm.get("dayName").reset();
    }

    public loadDay(day: EQDayPattern): void{
        this.day = day.getCopy();
        this.infoForm.get("dayName").setValue(day.name);
        this.infoForm.get("receptionBegin").setValue(day.beginTime.toString());
    }

    public removeDay(name: string): void{
        this._subscriptions.push(this._queuePatternController.deleteDayPattern(name).subscribe((next: any) => {
            this.dayCards = this.dayCards.filter((day: EQDayPattern) => day.name !== name);
        }));
    }

    private getDuration(): TimeOnly {
        return new TimeOnly(this.actionsForm.get('duration').value);
    }

    private getCount(): number {
        return this.radioValue === "reception" ? parseInt(this.actionsForm.get('count').value as string) : 1;
    }
}
