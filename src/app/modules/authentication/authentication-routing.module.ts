import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthFormPageComponent } from "./auth-form/auth-form.page.component";

const routes: Routes = [
    { path: "", redirectTo: "login" },
    { path: "login", component: AuthFormPageComponent },
    { path: "signup", component: AuthFormPageComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AuthenticationRoutingModule {
}
