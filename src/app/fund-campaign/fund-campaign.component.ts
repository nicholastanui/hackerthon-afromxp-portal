import {Component, OnDestroy, OnInit} from '@angular/core';
import {CallbackModel} from "../model/callback.model";
import {NotificationTypeEnum} from "../enum/notification-type.enum";
import {HttpErrorResponse} from "@angular/common/http";
import {Subscription} from "rxjs";
import {Router} from "@angular/router";
import {NotificationService} from "../service/notification.service";
import {IntegrationService} from "../service/integration.service";

@Component({
  selector: 'app-fund-campaign',
  templateUrl: './fund-campaign.component.html',
  styleUrls: ['./fund-campaign.component.css']
})
export class FundCampaignComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription[] = [];
  public showLoading = false;

  constructor(private router: Router,
              private notification: NotificationService,
              private integrations: IntegrationService) { }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  public getCampaign(formData: any){
    console.log(formData.campaignId);
    this.showLoading = true;
    this.subscriptions.push(
      this.integrations.getCampaign(formData.campaignId).subscribe(
        (response: CallbackModel) => {
          this.showLoading = false;
          const campaignId: string = response.body.data.id;
          if (campaignId != null) {
            this.router.navigate(['/page/fund', campaignId]);
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

  private sendNotification(notificationType: NotificationTypeEnum, message: string): void {
    if (message) {
      this.notification.showNotification(notificationType, message);
    } else {
      this.notification.showNotification(notificationType, 'An error has occurred. Please try again');
    }
  }

}
