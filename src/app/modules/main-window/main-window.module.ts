import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainWindowRoutingModule } from './main-window-routing.module';
import { MainWindowComponent } from "./main-window.page.component";
import { AccountsComponent } from "./accounts/accounts.component";
import { QueuesComponent } from './queues/queues.component';
import { PersonalAccountComponent } from './personal-account/personal-account.component';
import { NgxPermissionsModule } from "ngx-permissions";
import { FormsModule, NgModel, ReactiveFormsModule } from "@angular/forms";
import { AccountItemComponent } from './accounts/account-item/account-item.component';
import { CreateAccountComponent } from './accounts/create-account/create-account.component';


@NgModule({
    declarations: [
        MainWindowComponent,
        AccountsComponent,
        QueuesComponent,
        PersonalAccountComponent,
        AccountItemComponent,
        CreateAccountComponent
    ],
    imports: [
        CommonModule,
        MainWindowRoutingModule,
        NgxPermissionsModule.forChild(),
        FormsModule,
        ReactiveFormsModule
    ]
})
export class MainWindowModule {
}
