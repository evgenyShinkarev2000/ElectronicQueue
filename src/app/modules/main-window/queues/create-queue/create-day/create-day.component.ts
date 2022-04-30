import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActionType } from "./action-type.enum";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { CustomValidators } from "../../../../../models/CustomValidators";

@Component({
    selector: 'app-create-day',
    templateUrl: './create-day.component.html',
    styleUrls: ['./create-day.component.scss']
})
export class CreateDayComponent implements OnInit {
    public radioValue: "reception" | "rest" = "reception";
    public actionsForm: FormGroup = new FormGroup(
        {
            "duration": new FormControl(null, CustomValidators.minMinutes(1)),
            "count": new FormControl(null, Validators.min(1))
        });

    constructor() {
    }

    ngOnInit(): void {
    }

}
