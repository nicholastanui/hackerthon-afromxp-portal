import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {AfroMxpComponent} from './afro-mxp/afro-mxp.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {CampaignerComponent} from './campaigner/campaigner.component';
import {ContributorComponent} from './contributor/contributor.component';
import {AppLayoutComponent} from './app-layout/app-layout.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NotificationModule} from "./notification.module";
import {HttpHeadersInterceptor} from "./interceptors/httpHeaders.interceptor";

@NgModule({
  declarations: [
    AppComponent,
    AfroMxpComponent,
    CampaignerComponent,
    ContributorComponent,
    AppLayoutComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        FormsModule,
        NotificationModule,
        ReactiveFormsModule
    ],
  providers: [
    // { provide: HTTP_INTERCEPTORS, useClass: HttpHeadersInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
