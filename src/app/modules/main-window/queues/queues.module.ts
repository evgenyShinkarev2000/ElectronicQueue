import { NgModule } from "@angular/core";
import { CreateQueueComponent } from "./create-queue/create-queue.component";
import { AllQueueComponent } from "./all-queue/all-queue.component";
import { MyQueueComponent } from "./my-queue/my-queue.component";
import { CommonModule } from "@angular/common";
import { NgxPermissionsModule } from "ngx-permissions";
import { QueuesRoutingModule } from "./queues-routing.module";
import { CreateDayComponent } from './create-queue/create-day/create-day.component';
import { ViewDayComponent } from './create-queue/view-day/view-day.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RecordPatternComponent } from './create-queue/record-pattern/record-pattern.component';
import { QueuesComponent } from "./queues.component";
import { DayCardComponent } from './create-queue/day-card/day-card.component';
import { CreateScheduleComponent } from './create-queue/create-schedule/create-schedule.component';
import { CreateWeekComponent } from './create-queue/create-week/create-week.component';
import { AddDayComponent } from './create-queue/create-week/add-day/add-day.component';
import { ViewWeekComponent } from './create-queue/view-week/view-week.component';
import { RectangleSkeletonDirective } from "../../../directives/struct/rectangle-skeleton.directive";
import { GrayDirective } from "../../../directives/style/gray.directive";

@NgModule({
    declarations: [
        CreateQueueComponent,
        QueuesComponent,
        AllQueueComponent,
        MyQueueComponent,
        CreateDayComponent,
        ViewDayComponent,
        RecordPatternComponent,
        DayCardComponent,
        CreateScheduleComponent,
        CreateWeekComponent,
        AddDayComponent,
        ViewWeekComponent,
        RectangleSkeletonDirective
    ],
    imports: [
        CommonModule,
        QueuesRoutingModule,
        NgxPermissionsModule.forChild(),
        FormsModule,
        ReactiveFormsModule,
    ]
})
export class QueuesModule {
}
