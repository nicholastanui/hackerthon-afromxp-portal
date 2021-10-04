import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CampaignerComponent} from "./campaigner/campaigner.component";
import {ContributorHomeComponent} from "./contributor/contributor-home.component";
import {HomeComponent} from "./home/home.component";
import {AppLayoutComponent} from "./app-layout/app-layout.component";
import {ContributeComponent} from "./contribute/contribute.component";
import {FundCampaignComponent} from "./fund-campaign/fund-campaign.component";
import {CampaignerReportsComponent} from "./campaigner-reports/campaigner-reports.component";

const routes: Routes = [
  {
    path: '',
    redirectTo: '/page/begin',
    pathMatch: 'full',
  },
  {
    path: 'page',
    component: AppLayoutComponent,
    children: [
      { path: 'begin', component: HomeComponent },
      { path: 'campaigner', component: CampaignerComponent },
      { path: 'code', component: FundCampaignComponent },
      { path: 'contributor', component: ContributorHomeComponent },
      { path: 'reports', component: CampaignerReportsComponent },
      { path: 'fund/:id', component: ContributeComponent }
    ]
  },
  { path: '**', redirectTo: '/page/begin', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
