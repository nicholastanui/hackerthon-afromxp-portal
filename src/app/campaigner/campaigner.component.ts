import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {Subscription} from "rxjs";
import {NotificationService} from "../service/notification.service";
import {NotificationTypeEnum} from "../enum/notification-type.enum";
import {Campaign} from "../model/campaign";
import {IntegrationService} from "../service/integration.service";
import {HttpErrorResponse, HttpResponse} from "@angular/common/http";
import {NgForm} from "@angular/forms";
import {UserService} from "../service/user.service";

@Component({
  selector: 'app-campaigner',
  templateUrl: './campaigner.component.html',
  styleUrls: ['./campaigner.component.css']
})
export class CampaignerComponent implements OnInit, OnDestroy {
  public showLoading = false;
  public showPreRegTerms = false;
  public showPhoneInput = false;
  public showOTPInput = false;
  public showRegForm = false;
  public showRegFormWrapper = false;
  public showConfirm = false;
  public showActivationSuccess = false;
  public showActivationFailed = false;
  private subscriptions: Subscription[] = [];

  constructor(
    private router: Router,
    private notification: NotificationService,
    private integrations: IntegrationService,
    private userService: UserService
    ) { }

  ngOnInit(): void {
    this.displayTermsPage();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  public routeToBeginPage() {
    this.router.navigateByUrl('/page/begin');
  }

  public submitCampaignerForm(applicationForm: NgForm): void {
    const formData = this.userService.createCampaignerFormData(applicationForm.value)
    console.log(JSON.stringify(formData));
    this.showLoading = true;
    // this.notification.showNotification(NotificationTypeEnum.ERROR, 'This is awesome');
    this.subscriptions.push(
      this.integrations.submitCampaign(formData).subscribe(
        (response) => {
          this.showLoading = false;
          applicationForm.resetForm();
          this.sendNotification(NotificationTypeEnum.SUCCESS, `${JSON.stringify(response)}`);
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

  public cancelRegistration() {

    this.displayRegForm()
  }

  public displayTermsPage() {
    this.showPreRegTerms = true;
    this.showPhoneInput = false;
    this.showOTPInput = false;
    this.showRegForm = false;
    this.showConfirm = false;
    this.showActivationSuccess = false;
    this.showActivationFailed = false;
  }
  public displayPhoneInput() {
    this.showPreRegTerms = false;
    this.showPhoneInput = true;
    this.showOTPInput = false;
    this.showRegForm = false;
    this.showConfirm = false;
    this.showActivationSuccess = false;
    this.showActivationFailed = false;
  }
  public displayOTPInput() {
    this.showPreRegTerms = false;
    this.showPhoneInput = false;
    this.showOTPInput = true;
    this.showRegForm = false;
    this.showConfirm = false;
    this.showActivationSuccess = false;
    this.showActivationFailed = false;
  }
  public displayRegForm() {
    this.showPreRegTerms = false;
    this.showPhoneInput = false;
    this.showOTPInput = false;
    this.showRegForm = true;
    this.showRegFormWrapper = true;
    this.showConfirm = false;
    this.showActivationSuccess = false;
    this.showActivationFailed = false;
  }
  public displayConfirmPage() {
    this.showPreRegTerms = false;
    this.showPhoneInput = false;
    this.showOTPInput = false;
    this.showRegForm = true;
    this.showRegFormWrapper = false;
    this.showConfirm = true;
    this.showActivationSuccess = false;
    this.showActivationFailed = false;
  }
  public displaySuccessRegPage() {
    this.showPreRegTerms = false;
    this.showPhoneInput = false;
    this.showOTPInput = false;
    this.showRegForm = false;
    this.showConfirm = false;
    this.showActivationSuccess = true;
    this.showActivationFailed = false;
  }
  public displayFailedRegPage() {
    this.showPreRegTerms = false;
    this.showPhoneInput = false;
    this.showOTPInput = false;
    this.showRegForm = false;
    this.showConfirm = false;
    this.showActivationSuccess = false;
    this.showActivationFailed = true;
  }

}
