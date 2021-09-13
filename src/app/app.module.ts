import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AfroMxpComponent } from './afro-mxp/afro-mxp.component';
import {HttpClientModule} from "@angular/common/http";
import { CampaignerComponent } from './campaigner/campaigner.component';
import { ContributorComponent } from './contributor/contributor.component';
import { AppLayoutComponent } from './app-layout/app-layout.component';

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
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
