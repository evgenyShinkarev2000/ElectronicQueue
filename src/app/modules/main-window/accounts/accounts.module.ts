import { NgModule } from "@angular/core";
import { CreateQueueComponent } from "../queues/create-queue/create-queue.component";
import { AllQueueComponent } from "../queues/all-queue/all-queue.component";
import { MyQueueComponent } from "../queues/my-queue/my-queue.component";
import { CreateDayComponent } from "../queues/create-queue/create-day/create-day.component";
import { ViewDayComponent } from "../queues/create-queue/view-day/view-day.component";
import { RecordPatternComponent } from "../queues/create-queue/record-pattern/record-pattern.component";
import { CommonModule } from "@angular/common";
import { QueuesRoutingModule } from "../queues/queues-routing.module";
import { NgxPermissionsModule } from "ngx-permissions";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { WSUserProvider } from "../../../services/web-socket/controllers/ws-user/ws-user-controller.service";
import { AccountsComponent } from "./accounts.component";
import { CreateAccountComponent } from "./create-account/create-account.component";
import { AccountItemComponent } from "./account-item/account-item.component";
import { MainWindowModule } from "../main-window.module";
import { NewUserFormComponent } from "../../../shared-components/new-user-form/new-user-form.component";
import { AccountsRoutingModule } from "./accounts-routing.module";

@NgModule({
    declarations: [
        AccountsComponent,
        CreateAccountComponent,
        AccountItemComponent,
        NewUserFormComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        AccountsRoutingModule
    ]
})
export class AccountsModule {
}
