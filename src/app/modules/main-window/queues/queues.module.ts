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

@NgModule({
    declarations: [
        CreateQueueComponent,
        AllQueueComponent,
        MyQueueComponent,
        CreateDayComponent,
        ViewDayComponent
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
