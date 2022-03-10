import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationPassedMockComponent } from "./authentication-passed-mock/authentication-passed-mock.component";
import { AuthService } from "./services/auth.service";
import { AuthFormComponent } from "./auth-form/auth-form.component";

const routes: Routes = [
  { path: "", redirectTo: "main_window", pathMatch: "full" },
  { path: "main_window", component: AuthenticationPassedMockComponent, canActivate: [AuthService] },
  { path: "login", component: AuthFormComponent },
  { path: "signup", component: AuthFormComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
