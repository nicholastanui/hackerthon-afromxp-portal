import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {NotificationService} from "../service/notification.service";
import {IntegrationService} from "../service/integration.service";
import {Subscription} from "rxjs";
import {CallbackModel} from "../model/callback.model";
import {NotificationTypeEnum} from "../enum/notification-type.enum";
import {HttpErrorResponse} from "@angular/common/http";
import {Campaign} from "../model/campaign";
import {FormGroup} from "@angular/forms";
import {PaymentBodyModel} from "../model/paymentBody.model";
import {concatMap, debounceTime, delay, map, mergeMap} from "rxjs/operators";
import {FundStatusModel} from "../model/fundStatus.model";

@Component({
  selector: 'app-contribute',
  templateUrl: './contribute.component.html',
  styleUrls: ['./contribute.component.css']
})
export class ContributeComponent implements OnInit {
  private subscriptions: Subscription[] = [];
  public showLoading = false;
  public showLobbyRoomPage = false;
  public showCall2Action = false;
  public showPreFundingTerms = false;
  public showFundingForm = false;
  public showFundingFormWrapper = false;
  public showPreSTKAlert = false;
  public showWaitCallback = false;
  public showSuccessFunding = false;
  public showFailedFunding = false;
  public campaignId: string | null = '';
  public merchantId: string = '';
  public pageTitle: string = '';
  public campaignName: string = '';
  public campaignType: string = '';
  public targetAmount: string = '';
  public campaignStatus: string = '';
  public paidAmount: string = '';
  public transactionId: string = '';


  constructor(private route: ActivatedRoute,
              private notification: NotificationService,
              private integrations: IntegrationService) {
  }

  ngOnInit(): void {
    this.pageTitle = 'Funding Page';
    this.displayLandingPage();
    this.campaignId = this.route.snapshot.paramMap.get('id');
    this.getCampaignDetails(this.campaignId);
  }

  public getCampaignDetails(campaignId: string | null): void {
    if (campaignId == null) {
      // TODO: Handle null entries
    } else {
      this.subscriptions.push(
        this.integrations.getCampaign(campaignId).subscribe(
          (response: CallbackModel) => {
            this.showLoading = false;
            const campaignDetail: Campaign = response.body.data;
            if (campaignDetail.id != null) {
              this.campaignName = campaignDetail.campaign_name;
              this.campaignType = campaignDetail.type;
              this.campaignStatus = campaignDetail.campaign_status;
              this.targetAmount = campaignDetail.target_amount;
              this.displayCall2Action();
            } else {
              this.sendNotification(NotificationTypeEnum.ERROR, `Campaign code ${campaignId} does not exist`);
            }
          },
          (errorResponse: HttpErrorResponse) => {
            console.log(errorResponse);
            this.sendNotification(NotificationTypeEnum.ERROR, errorResponse.error.message);
            this.showLoading = false;
          }
        )
      );
    }

  }

  public fundCampaign(dataForm: any): void {
    this.showLoading = true;
    this.pageTitle = 'Payment in progress...'
    const formData = new FormData();
    formData.append("msisdn", dataForm.msisdn);
    formData.append("amount", dataForm.amount);
    formData.append("campaign_name", this.campaignName);
    if (this.campaignId != null) {
      formData.append("campaign_id", this.campaignId);
    }
    this.subscriptions.push(
      this.integrations.makePayment(formData)
        .pipe(
          map(response => {
            this.showLoading = false;
            this.displayPendingFundStatus();
            const paymentCallback: PaymentBodyModel = response[0].body.data;
            this.merchantId = paymentCallback.merchant_id;
            const formData = new FormData();
            formData.append("merchant_id", this.merchantId);
            if (this.campaignId != null) {
              formData.append("campaign_id", this.campaignId);
            }
            this.integrations.trackPayment(formData);
            return formData;
          })
        )
        .pipe(delay(10000))
        .pipe(concatMap(formData => this.integrations.paymentStatus(formData)))
        .subscribe(
          result => {
            if (result[0].body.responseCode.length > 0) {
              const fundStatusResponse: FundStatusModel = result[0].body.responseCode[0];
              console.log(JSON.stringify(result));
              console.log(JSON.stringify(fundStatusResponse));
              const responseCode = parseInt(fundStatusResponse.response_code);
              this.showLoading = false;
              if (responseCode === 0) {
                this.pageTitle = 'Funding Success'
                this.paidAmount = fundStatusResponse.amount;
                this.transactionId = fundStatusResponse.mpesatxid;
                this.displaySuccessPayment();
              } else {
                this.pageTitle = 'Funding Failed'
                this.displayFailedPayment();
              }
            } else {
              this.pageTitle = 'Funding Failed'
              this.displayFailedPayment();
            }
          },
          (errorResponse: HttpErrorResponse) => {
            this.displayFailedPayment();
            console.log(errorResponse);
            this.sendNotification(NotificationTypeEnum.ERROR, errorResponse.error.message);
            this.showLoading = false;
          }
        )
    );
  }

  private sendNotification(notificationType: NotificationTypeEnum, message: string): void {
    if (message) {
      this.notification.showNotification(notificationType, message);
    } else {
      this.notification.showNotification(notificationType, 'An error has occurred. Please try again');
    }
  }

  public displayLandingPage() {
    this.showLobbyRoomPage = true;
    this.showCall2Action = false;
    this.showPreFundingTerms = false;
    this.showFundingForm = false;
    this.showFundingFormWrapper = false;
    this.showPreSTKAlert = false;
    this.showWaitCallback = false;
    this.showSuccessFunding = false;
    this.showFailedFunding = false;
  }

  public displayCall2Action() {
    this.showLobbyRoomPage = false;
    this.showCall2Action = true;
    this.showPreFundingTerms = false;
    this.showFundingForm = false;
    this.showFundingFormWrapper = true;
    this.showPreSTKAlert = false;
    this.showWaitCallback = false;
    this.showSuccessFunding = false;
    this.showFailedFunding = false;
  }

  public displayTerms() {
    this.showLobbyRoomPage = false;
    this.showCall2Action = false;
    this.showPreFundingTerms = true;
    this.showFundingForm = false;
    this.showFundingFormWrapper = false;
    this.showPreSTKAlert = false;
    this.showWaitCallback = false;
    this.showSuccessFunding = false;
    this.showFailedFunding = false;
  }

  public displayFundForm() {
    this.showLobbyRoomPage = false;
    this.showCall2Action = false;
    this.showPreFundingTerms = false;
    this.showFundingForm = true;
    this.showFundingFormWrapper = true;
    this.showPreSTKAlert = false;
    this.showWaitCallback = false;
    this.showSuccessFunding = false;
    this.showFailedFunding = false;
  }

  public displaySTKAlert() {
    this.showLobbyRoomPage = false;
    this.showCall2Action = true;
    this.showPreFundingTerms = false;
    this.showFundingForm = true;
    this.showFundingFormWrapper = false;
    this.showPreSTKAlert = true;
    this.showWaitCallback = false;
    this.showSuccessFunding = false;
    this.showFailedFunding = false;
  }

  public displayPendingFundStatus() {
    this.showLobbyRoomPage = false;
    this.showCall2Action = false;
    this.showPreFundingTerms = false;
    this.showFundingForm = false;
    this.showFundingFormWrapper = false;
    this.showPreSTKAlert = false;
    this.showWaitCallback = true;
    this.showSuccessFunding = false;
    this.showFailedFunding = false;
  }

  public displaySuccessPayment() {
    this.showLobbyRoomPage = false;
    this.showCall2Action = false;
    this.showPreFundingTerms = false;
    this.showFundingForm = false;
    this.showFundingFormWrapper = false;
    this.showPreSTKAlert = false;
    this.showWaitCallback = false;
    this.showSuccessFunding = true;
    this.showFailedFunding = false;
  }

  public displayFailedPayment() {
    this.showLobbyRoomPage = false;
    this.showCall2Action = false;
    this.showPreFundingTerms = false;
    this.showFundingForm = false;
    this.showFundingFormWrapper = false;
    this.showPreSTKAlert = false;
    this.showWaitCallback = false;
    this.showSuccessFunding = false;
    this.showFailedFunding = true;
  }

}
