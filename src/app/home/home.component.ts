import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {Subscription} from "rxjs";
import {NotificationService} from "../service/notification.service";
import {IntegrationService} from "../service/integration.service";
import {CallbackModel} from "../model/callback.model";
import {HttpErrorResponse} from "@angular/common/http";
import {NotificationTypeEnum} from "../enum/notification-type.enum";

@Component({
  selector: 'app-afro-mxp',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription[] = [];
public showGetStarted = true;
public showFundOption = false;
public showLoading = false;
  constructor(private router: Router,
              private notification: NotificationService,
              private integrations: IntegrationService) { }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  public routeToCampaign() {
    this.router.navigateByUrl('/page/campaigner');
  }

  public routeToContributor() {
    this.showGetStarted = false;
    this.showFundOption = true;
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

  public navigateToCampaign() {

  }

}
