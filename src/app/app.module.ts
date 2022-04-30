import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { JwtModule } from "@auth0/angular-jwt";
import { NgxPermissionsModule } from "ngx-permissions";
import { LocalStorageService } from "./services/local-storage/local-storage.service";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpErrorInterceptor } from "./providers/http-error-interceptor";

const components: any[] = [AppComponent];


// eslint-disable-next-line @typescript-eslint/naming-convention,@typescript-eslint/typedef
const HTTP_ERROR_INTERCEPTOR = {
    provide: HTTP_INTERCEPTORS,
    useClass: HttpErrorInterceptor,
    multi: true,
};


@NgModule({
    declarations: components,
    imports: [
        BrowserModule,
        AppRoutingModule,
        ReactiveFormsModule,
        FormsModule,
        HttpClientModule,
        JwtModule.forRoot({
            config: {
                tokenGetter: () => LocalStorageService.tokenGetter(),
                allowedDomains: ["localhost:44315"],
                disallowedRoutes: []
            }
        }),
        NgxPermissionsModule.forRoot(),
        NgbModule
    ],
    providers: [HTTP_ERROR_INTERCEPTOR],
    bootstrap: [AppComponent]
})
export class AppModule {
}
