import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CampaignerComponent} from "./campaigner/campaigner.component";
import {ContributorComponent} from "./contributor/contributor.component";
import {AfroMxpComponent} from "./afro-mxp/afro-mxp.component";

const routes: Routes = [
  { path: 'begin', component: AfroMxpComponent },
  { path: 'campaigner', component: CampaignerComponent },
  { path: 'contributor', component: ContributorComponent },
  { path: '**', redirectTo: '/begin', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
