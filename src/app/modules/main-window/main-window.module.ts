import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainWindowRoutingModule } from './main-window-routing.module';
import { MainWindowComponent } from "./main-window.page.component";
import { AccountsComponent } from "./accounts/accounts.component";
import { QueuesComponent } from './queues/queues.component';
import { PersonalAccountComponent } from './personal-account/personal-account.component';
import { NgxPermissionsModule, NgxPermissionsRestrictStubModule } from "ngx-permissions";


@NgModule({
    declarations: [
        MainWindowComponent,
        AccountsComponent,
        QueuesComponent,
        PersonalAccountComponent
    ],
    imports: [
        CommonModule,
        MainWindowRoutingModule,
        NgxPermissionsModule.forChild()
    ]
})
export class MainWindowModule {
}
