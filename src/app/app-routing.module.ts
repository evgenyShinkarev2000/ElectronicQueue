import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthService } from "./services/authentication/auth.service";

const routes: Routes = [
    { path: "", redirectTo: "main_window", pathMatch: "full" },
    {
        path: "auth",
        // eslint-disable-next-line @typescript-eslint/typedef
        loadChildren: () => import("./modules/authentication/authentication.module").then(m => m.AuthenticationModule)
    },
    {
        path: "main_window",
        // eslint-disable-next-line @typescript-eslint/typedef
        loadChildren: () => import("./modules/main-window/main-window.module").then(m => m.MainWindowModule),
        canActivate: [AuthService]
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
