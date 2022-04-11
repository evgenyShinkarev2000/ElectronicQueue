import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainWindowComponent } from "./main-window.page.component";
import { AccountsComponent } from "./accounts/accounts.component";
import { QueuesComponent } from "./queues/queues.component";
import { PersonalAccountComponent } from "./personal-account/personal-account.component";
import { NgModel } from "@angular/forms";

const routes: Routes = [
    {
        path: "",
        component: MainWindowComponent,
        children: [
            {
                path: "accounts", component: AccountsComponent
            },
            { path: "queues", component: QueuesComponent },
            { path: "personal_account", component: PersonalAccountComponent }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MainWindowRoutingModule {
}
