import {Component, OnDestroy, OnInit} from '@angular/core';
import {Campaign} from "../model/campaign";
import {IntegrationService} from "../service/integration.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-afro-mxp',
  templateUrl: './afro-mxp.component.html',
  styleUrls: ['./afro-mxp.component.css']
})
export class AfroMxpComponent implements OnInit, OnDestroy {
public showGetStarted = true;
public showPreRegTerms = false;
public showPhoneInput = false;
public showOTPInput = false;
public showRegister2 = false;
public showConfirm = false;
public showActivationSuccess = false;
public showActivationFailed = false;

private subscriptions: Subscription[] = [];


  constructor(private integration: IntegrationService) { }

  ngOnInit(): void {
    this.showGetStarted = false;
    this.showPhoneInput = true;
  }

  // public onSubmitCampaign

  ngOnDestroy(): void {
  }

}
