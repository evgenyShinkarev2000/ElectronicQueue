import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AccountsComponent } from "./accounts.component";
import { CreateAccountComponent } from "./create-account/create-account.component";
import { AccountItemComponent } from "./account-item/account-item.component";
import { NewUserFormComponent } from "../../../shared-components/new-user-form/new-user-form.component";
import { AccountsRoutingModule } from "./accounts-routing.module";
import { ArrayFilterPipe } from "../../../pipes/array-filter.pipe";
import { ArraySortPipe } from "../../../pipes/array-sort.pipe";

@NgModule({
    declarations: [
        AccountsComponent,
        CreateAccountComponent,
        AccountItemComponent,
        NewUserFormComponent,
        ArrayFilterPipe,
        ArraySortPipe
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
