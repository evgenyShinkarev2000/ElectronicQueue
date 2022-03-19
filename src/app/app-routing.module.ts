import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationPassedMockComponent } from "./authentication-passed-mock/authentication-passed-mock.component";
import { AuthService } from "./services/auth.service";
import { AuthFormPageComponent } from "./auth-form/auth-form.page.component";
import { ErrorPageComponent } from "./error/error.page.component";
import { MainWindowComponent } from "./main-window/main-window.page.component";

const routes: Routes = [
    { path: "", outlet: "app-page",  redirectTo: "main_window", pathMatch: "full" },
    { path: "main_window", outlet: "app-page", component: MainWindowComponent, canActivate: [AuthService] },
    { path: "login", outlet: "app-page", component: AuthFormPageComponent },
    { path: "signup", outlet: "app-page", component: AuthFormPageComponent },
    { path: "error_page", outlet: "app-page", component: ErrorPageComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
