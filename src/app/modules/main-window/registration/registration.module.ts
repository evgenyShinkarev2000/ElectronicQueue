import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegistrationRoutingModule } from './registration-routing.module';
import { MyBookingComponent } from './my-booking/my-booking.component';
import { AllQueueComponent } from './all-queue/all-queue.component';
import { RegistrationComponent } from './registration.component';
import { NgxPermissionsModule } from "ngx-permissions";


@NgModule({
    declarations: [
        MyBookingComponent,
        AllQueueComponent,
        RegistrationComponent
    ],
    imports: [
        CommonModule,
        RegistrationRoutingModule,
        NgxPermissionsModule.forChild(),
    ]
})
export class RegistrationModule {
}
