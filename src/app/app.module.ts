import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HomeComponent} from './home/home.component';
import { HttpClientModule} from "@angular/common/http";
import {CampaignerComponent} from './campaigner/campaigner.component';
import {ContributorHomeComponent} from './contributor/contributor-home.component';
import {AppLayoutComponent} from './app-layout/app-layout.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NotificationModule} from "./notification.module";
import {ContributeComponent} from './contribute/contribute.component';
import {FundCampaignComponent} from './fund-campaign/fund-campaign.component';
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import { CampaignerReportsComponent } from './campaigner-reports/campaigner-reports.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CampaignerComponent,
    ContributorHomeComponent,
    AppLayoutComponent,
    ContributeComponent,
    FundCampaignComponent,
    CampaignerReportsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NotificationModule,
    ReactiveFormsModule,
    NgbModule
  ],
  providers: [
    // { provide: HTTP_INTERCEPTORS, useClass: HttpHeadersInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
