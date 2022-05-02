import { Component, Input, OnInit } from '@angular/core';
import { EQDay } from "../../../../../models/EQDay";

@Component({
    selector: 'app-view-day',
    templateUrl: './view-day.component.html',
    styleUrls: ['./view-day.component.scss']
})
export class ViewDayComponent implements OnInit {

    @Input()
    public day: EQDay;
    constructor() {
    }

    ngOnInit(): void {
    }

    public onRemoveRecord(index: number): void{
        this.day.removeRecord(index);
    }

}
