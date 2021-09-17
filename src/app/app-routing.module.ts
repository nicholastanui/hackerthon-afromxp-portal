import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CampaignerComponent} from "./campaigner/campaigner.component";
import {ContributorHome} from "./contributor/contributor-home.component";
import {AfroMxpComponent} from "./afro-mxp/afro-mxp.component";
import {AppLayoutComponent} from "./app-layout/app-layout.component";

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
      { path: 'begin', component: AfroMxpComponent },
      { path: 'campaigner', component: CampaignerComponent },
      { path: 'contributor', component: ContributorHome },
      { path: 'contributor/id', component: ContributorHome }
    ]
  },
  { path: '**', redirectTo: '/page/begin', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
