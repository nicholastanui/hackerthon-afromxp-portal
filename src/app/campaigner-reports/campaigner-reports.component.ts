import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {NotificationService} from "../service/notification.service";
import {IntegrationService} from "../service/integration.service";
import {CallbackModel} from "../model/callback.model";
import {HttpErrorResponse} from "@angular/common/http";
import {NotificationTypeEnum} from "../enum/notification-type.enum";
import {MyCampaignModel} from "../model/myCampaign.model";

@Component({
  selector: 'app-campaigner-reports',
  templateUrl: './campaigner-reports.component.html',
  styleUrls: ['./campaigner-reports.component.css']
})
export class CampaignerReportsComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription[] = [];
  public showLoading = false;
  public showPhoneNumber = false;
  public showCampaignList = false;
  public showReport = false
  public campaignList: MyCampaignModel[] = [];
  public campaignName = '';
  public campaignStart = '';
  public campaignEnd = '';
  public campaignDonationCount = '';
  public campaignTotalContributions = '';
  public campaignTargetContributions = '';

  constructor(
    private notification: NotificationService,
    private integrations: IntegrationService
  ) { }

  ngOnInit(): void {
    this.renderInitPage();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  public getCampaignLists(data: any): void {
    this.showLoading = true;
    const formData = new FormData();
    formData.append("msisdn", data.msisdn);

    this.subscriptions.push(
      this.integrations.myCampaigns(formData).subscribe(
        (response: CallbackModel) => {
          this.showLoading = false;
          this.campaignList = [];
          const responseData:[] = response.body.data;
          if (responseData.length > 0) {
            responseData.forEach((list:any) => {
              this.campaignList.push(
                new MyCampaignModel(list.id, list.campaign_name, list.type, list.start_date, list.end_date, list.target_amount)
              );
            });
          }
          this.renderCampaignListPage();
        }, (errorResponse: HttpErrorResponse) => {
          this.showLoading = false;
          this.notification.showNotification(NotificationTypeEnum.ERROR, 'Sorry. An Error occurred');
          console.log(errorResponse.error)
        }
      )
    );
  }

  public getCampaignReport(campaignId: string): void {
    this.showLoading = true;
    this.subscriptions.push(
      this.integrations.getReport(campaignId).subscribe(
        (response: CallbackModel) => {
          const responseData = response.body.data;
          if (responseData.id !== null) {
            this.campaignName = responseData.campaign_name;
            this.campaignStart = responseData.start_date;
            this.campaignEnd = responseData.end_date;
            this.campaignDonationCount = responseData.donations;
            this.campaignTotalContributions = responseData.raised_amount;
            this.campaignTargetContributions = responseData.target_amount;
            this.renderReportPage();
          } else {
            this.notification.showNotification(NotificationTypeEnum.ERROR, "Code not Found");
          }
        }, (errorResponse: HttpErrorResponse) => {
          this.showLoading = false;
          this.notification.showNotification(NotificationTypeEnum.ERROR, 'Sorry. An Error occurred');
          console.log(errorResponse.error)
        }
      )
    );
  }

  public renderInitPage() {
    this.showPhoneNumber = true;
    this.showCampaignList = false;
    this.showReport = false
  }

  public renderCampaignListPage() {
    this.showPhoneNumber = false;
    this.showCampaignList = true;
    this.showReport = false
  }

  public renderReportPage() {
    this.showPhoneNumber = false;
    this.showCampaignList = false;
    this.showReport = true
  }
}
