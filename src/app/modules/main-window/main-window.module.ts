import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainWindowRoutingModule } from './main-window-routing.module';
import { MainWindowComponent } from "./main-window.page.component";
import { AccountsComponent } from "./accounts/accounts.component";
import { QueuesComponent } from './queues/queues.component';
import { PersonalAccountComponent } from './personal-account/personal-account.component';
import { NgxPermissionsModule } from "ngx-permissions";
import { FormsModule, NgModel } from "@angular/forms";
import { AccountItemComponent } from './accounts/account-item/account-item.component';


@NgModule({
    declarations: [
        MainWindowComponent,
        AccountsComponent,
        QueuesComponent,
        PersonalAccountComponent,
        AccountItemComponent
    ],
    imports: [
        CommonModule,
        MainWindowRoutingModule,
        NgxPermissionsModule.forChild(),
        FormsModule
    ]
})
export class MainWindowModule {
}
