import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HomeComponent} from './home/home.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {CampaignerComponent} from './campaigner/campaigner.component';
import {ContributorHomeComponent} from './contributor/contributor-home.component';
import {AppLayoutComponent} from './app-layout/app-layout.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NotificationModule} from "./notification.module";
import {HttpHeadersInterceptor} from "./interceptors/httpHeaders.interceptor";
import { ContributeComponent } from './contribute/contribute.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CampaignerComponent,
    ContributorHomeComponent,
    AppLayoutComponent,
    ContributeComponent
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
