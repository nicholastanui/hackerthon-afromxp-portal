import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {Subscription} from "rxjs";
import {NotificationService} from "../service/notification.service";
import {NotificationTypeEnum} from "../enum/notification-type.enum";
import {IntegrationService} from "../service/integration.service";
import {HttpErrorResponse} from "@angular/common/http";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../service/user.service";
import {CallbackModel} from "../model/callback.model";
import {Clipboard} from '@angular/cdk/clipboard';

@Component({
  selector: 'app-campaigner',
  templateUrl: './campaigner.component.html',
  styleUrls: ['./campaigner.component.css']
})
export class CampaignerComponent implements OnInit, OnDestroy {
  public showLoading = false;
  public showPreRegTerms = false;
  public showPreRegOptions = false;
  public showPhoneInput = false;
  public showOTPInput = false;
  public showRegForm = false;
  public showRegFormWrapper = false;
  public showConfirm = false;
  public showActivationSuccess = false;
  public showActivationFailed = false;
  public campaignId: string = '';
  public referUrl: string = '';
  public applicationForm: FormGroup;
  public baseUrl = 'http://104.248.59.79:9000/afro-mxp/page/fund/';
  public whatsAppUrl = 'https://wa.me/?text=';
  private subscriptions: Subscription[] = [];


  constructor(
    private router: Router,
    private notification: NotificationService,
    private integrations: IntegrationService,
    private userService: UserService,
    public fb: FormBuilder,
    private clipboard: Clipboard
    ) {
    this.applicationForm = this.fb.group({
      msisdn: ['', [ Validators.required]],
      campaignName: ['', [Validators.required]],
      campaignType: ['', [Validators.required]],
      targetAmount: ['', [Validators.required]],
      campaignDuration: ['', [Validators.required]]
    })
  }

  ngOnInit(): void {
    this.displayRegForm();
    // this.displayPreRegOptions();
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
    formData.append('period', this.f.campaignDuration.value);
    this.subscriptions.push(
      this.integrations.addCampaign(formData).subscribe(
        (response:CallbackModel[]) => {
          this.showLoading = false;
          const responseCode = parseInt(response[0].header?.responseCode);
          if (responseCode === 201) {
            this.campaignId = response[0].body?.data;
            this.referUrl = this.baseUrl+this.campaignId;
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
  public copyUrl() {
    const copied: boolean = this.clipboard.copy(this.referUrl);
    if (copied) {
      this.notification.showNotification(NotificationTypeEnum.INFO, "Link Copied!")
    }
  }

  public copyCampaignCode() {
    const copied: boolean = this.clipboard.copy(this.campaignId);
    if (copied) {
      this.notification.showNotification(NotificationTypeEnum.INFO, "Copied!")
    }
  }

  public shareUrlViaWhatsApp() {
    const url = this.whatsAppUrl+this.referUrl
    window.open(url, "_blank");
  }

  public shareCodeViaWhatsApp() {
    window.open(this.campaignId, "_blank");
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

  public displayPreRegOptions() {
    this.showPreRegOptions = true;
    this.showPreRegTerms = false;
    this.showPhoneInput = false;
    this.showOTPInput = false;
    this.showRegForm = false;
    this.showRegFormWrapper = false;
    this.showConfirm = false;
    this.showActivationSuccess = false;
    this.showActivationFailed = false;
  }
  public displayRegForm() {
    this.showPreRegOptions = false;
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
    this.showPreRegOptions = false;
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
    this.showPreRegOptions = false;
    this.showPreRegTerms = false;
    this.showPhoneInput = false;
    this.showOTPInput = false;
    this.showRegForm = false;
    this.showConfirm = false;
    this.showActivationSuccess = true;
    this.showActivationFailed = false;
  }
  public displayFailedRegPage() {
    this.showPreRegOptions = false;
    this.showPreRegTerms = false;
    this.showPhoneInput = false;
    this.showOTPInput = false;
    this.showRegForm = false;
    this.showConfirm = false;
    this.showActivationSuccess = false;
    this.showActivationFailed = true;
  }

}
