import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {Subscription} from "rxjs";
import {NotificationService} from "../service/notification.service";
import {NotificationTypeEnum} from "../enum/notification-type.enum";
import {Campaign} from "../model/campaign";
import {IntegrationService} from "../service/integration.service";
import {HttpErrorResponse, HttpResponse} from "@angular/common/http";
import {FormBuilder, FormGroup, NgForm, Validators} from "@angular/forms";
import {UserService} from "../service/user.service";
import {CallbackModel} from "../model/callback.model";

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
  public campaignId: any = '';
  public applicationForm: FormGroup;
  private subscriptions: Subscription[] = [];

  constructor(
    private router: Router,
    private notification: NotificationService,
    private integrations: IntegrationService,
    private userService: UserService,
    public fb: FormBuilder
    ) {
    this.applicationForm = this.fb.group({
      msisdn: ['', [ Validators.required]],
      campaignName: ['', [Validators.required]],
      campaignType: ['', [Validators.required]],
      targetAmount: ['', [Validators.required]],
      startDate: ['', [Validators.required]],
      endDate: ['', [Validators.required]]
    })
  }

  ngOnInit(): void {
    this.displayTermsPage();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  // convenience getter for easy access to form fields
  get f() { return this.applicationForm.controls; }

  public routeToBeginPage() {
    this.router.navigateByUrl('/page/begin');
  }

  public submitCampaignerForm(): void {
    if (this.applicationForm.invalid) {
      return;
    }
    // const formData = this.userService.createCampaignerFormData(applicationForm.value)
    this.showLoading = true;
    const formData = new FormData();
    formData.append('msisdn', this.f.msisdn.value);
    formData.append('campaign_name', this.f.campaignName.value);
    formData.append('type', this.f.campaignType.value);
    formData.append('target_amount', this.f.targetAmount.value);
    formData.append('start_date', this.f.startDate.value);
    formData.append('end_date', this.f.endDate.value);
    this.subscriptions.push(
      this.integrations.submitCampaign(formData).subscribe(
        (response:CallbackModel[]) => {
          this.showLoading = false;
          const responseCode = response[0].header?.responseCode;
          if (responseCode === '201') {
            this.campaignId = response[0].body?.campaign_id;
            this.sendNotification(NotificationTypeEnum.SUCCESS, `Campaign created`);
            this.displaySuccessRegPage();
          } else {
            this.sendNotification(NotificationTypeEnum.ERROR, `An error has occurred. Please try again`);
            this.displayFailedRegPage();
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
