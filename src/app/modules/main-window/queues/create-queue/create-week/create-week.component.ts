import { Component, OnDestroy, OnInit } from '@angular/core';
import { QueuePatternController } from "../../../../../services/server-api/queue-pattern-controller.service";
import { EQDayPattern } from "../../../../../models/EQDayPattern";
import { Subscription } from "rxjs";
import { ICurrentDayViewModel } from "./current-day-view-model";
import { WeekDayName } from "./week-day-name.enum";
import { WeekDay } from "@angular/common";

@Component({
    selector: 'app-create-week',
    templateUrl: './create-week.component.html',
    styleUrls: ['./create-week.component.scss']
})
export class CreateWeekComponent implements OnInit, OnDestroy {
    public dayPatterns: EQDayPattern[];
    public currentWeek: ICurrentDayViewModel[] = [];
    public weekPatterns: EQDayPattern[][];
    private _subscriptions: Subscription[] = [];

    constructor(private _queuePatternController: QueuePatternController) {
        this.initCurrentWeek();
    }

    public ngOnInit(): void {
        this._subscriptions.push(this._queuePatternController.getAllDayPatterns()
            .subscribe((dayPatterns: EQDayPattern[]) => {
                this.dayPatterns = dayPatterns;
            }));
    }

    public ngOnDestroy(): void {
        this._subscriptions.forEach((s: Subscription) => s.unsubscribe());
    }

    private initCurrentWeek(): void {
        Object.values(WeekDayName).forEach((name: string) => {
            this.currentWeek.push({ weekDayName: name as WeekDayName });
        });
    }
}
