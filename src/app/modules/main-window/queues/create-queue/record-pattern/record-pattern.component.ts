import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { EQRecordPattern } from "../../../../../models/EQueueRecordPattern";

@Component({
    selector: 'app-record-pattern',
    templateUrl: './record-pattern.component.html',
    styleUrls: ['./record-pattern.component.scss']
})
export class RecordPatternComponent implements OnInit {
    @Input()
    public recordPattern: EQRecordPattern;
    @Input()
    public index: number;
    @Output()
    public removeRecord: EventEmitter<number> = new EventEmitter<number>();

    constructor() {
    }

    ngOnInit(): void {
    }

    public removeRecordClick(): void{
        this.removeRecord.emit(this.index);
    }


}
