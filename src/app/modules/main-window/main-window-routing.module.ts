import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainWindowComponent } from "./main-window.page.component";
import { PersonalAccountComponent } from "./personal-account/personal-account.component";

const routes: Routes = [
    {
        path: "",
        component: MainWindowComponent,
        children: [
            {
                path: "accounts",
                loadChildren: () => import("./accounts/accounts.module").then(m => m.AccountsModule)
            },
            {
                path: "queues",
                loadChildren: () => import("./queues/queues.module").then(m => m.QueuesModule)
            },
            { path: "personal_account", component: PersonalAccountComponent },
            {
                path: "registration",
                loadChildren: () => import("./registration/registration.module").then(m => m.RegistrationModule)
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MainWindowRoutingModule {
}
