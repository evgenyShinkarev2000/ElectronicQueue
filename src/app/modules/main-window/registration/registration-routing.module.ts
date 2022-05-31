import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllQueueComponent } from "./all-queue/all-queue.component";
import { MyBookingComponent } from "./my-booking/my-booking.component";
import { RegistrationComponent } from "./registration.component";

const routes: Routes = [{
    path: "",
    component: RegistrationComponent,
    children: [
        {
            path: "all_queue",
            component: AllQueueComponent
        },
        {
            path: "my_booking",
            component: MyBookingComponent
        }
    ]
}];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class RegistrationRoutingModule {
}
