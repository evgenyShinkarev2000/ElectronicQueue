import { Component, Input, OnInit } from '@angular/core';
import { EQDayPattern } from "../../../../../../models/EQDayPattern";

@Component({
    selector: 'app-add-day',
    templateUrl: './add-day.component.html',
    styleUrls: ['./add-day.component.scss']
})
export class AddDayComponent implements OnInit {
    @Input()
    public weekDayName: string;
    @Input()
    public dayPatterns: EQDayPattern[];
    constructor() {
    }

    ngOnInit(): void {
    }

}
