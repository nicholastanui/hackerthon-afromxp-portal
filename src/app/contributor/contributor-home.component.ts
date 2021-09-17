import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {Subscription} from "rxjs";
import {NotificationService} from "../service/notification.service";
import {IntegrationService} from "../service/integration.service";
import {UserService} from "../service/user.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {HttpErrorResponse, HttpResponse} from "@angular/common/http";
import {CallbackModel} from "../model/callback.model";
import {NotificationTypeEnum} from "../enum/notification-type.enum";

@Component({
  selector: 'app-contributor',
  templateUrl: './contributor-home.component.html',
  styleUrls: ['./contributor-home.component.css']
})
export class ContributorHome implements OnInit, OnDestroy {
  private subscriptions: Subscription[] = [];
  public showLoading = false;
  public showPreFundingTerms = false;
  public showFundingForm = false;
  public showFundingFormWrapper = false;
  public showPreSTKAlert = false;
  public showSuccessFunding = false;
  public showFailedFunding = false;
  public fundingForm: FormGroup;

  constructor(private router: Router,
              private notification: NotificationService,
              private integrations: IntegrationService,
              private userService: UserService,
              public fb: FormBuilder) {
    this.fundingForm = this.fb.group({
      msisdn: ['', [Validators.minLength(12), Validators.required]],
      amount: ['', [Validators.required]]
    })
  }

  ngOnInit(): void {
    this.displayPreFundingTermsPage();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  // convenience getter for easy access to form fields
  get f() { return this.fundingForm.controls; }

  submitFunding() {
    if (this.fundingForm.invalid) {
      return;
    }
    this.showLoading = true;
    const formData = new FormData();
    formData.append("msisdn", this.f.msisdn.value);
    formData.append("amount", this.f.amount.value);
    formData.append("campaign_name", 'test');
    formData.append("campaign_id", '1');

    this.subscriptions.push(
      this.integrations.submitFunding(formData).subscribe(
        (response: CallbackModel[]) => {
          this.showLoading = false;
          console.log(JSON.stringify(response));
          this.sendNotification(NotificationTypeEnum.SUCCESS, JSON.stringify(response[0].body));
        },
        (errorResponse: HttpErrorResponse) => {
          this.displayFailedTXN();
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

  public routeToBeginPage() {
    this.router.navigateByUrl('/page/begin');
  }

  public displayPreFundingTermsPage() {
    this.showPreFundingTerms = true;
    this.showFundingForm = false;
    this.showFundingFormWrapper = false;
    this.showPreSTKAlert = false;
    this.showSuccessFunding = false;
    this.showFailedFunding = false;
  }
  public displayFunding() {
    this.showPreFundingTerms = false;
    this.showFundingForm = true;
    this.showFundingFormWrapper = true;
    this.showPreSTKAlert = false;
    this.showSuccessFunding = false;
    this.showFailedFunding = false;
  }
  public displaySTKAlert() {
    this.showPreFundingTerms = false;
    this.showFundingForm = true;
    this.showFundingFormWrapper = false;
    this.showPreSTKAlert = true;
    this.showSuccessFunding = false;
    this.showFailedFunding = false;
  }

  public displaySuccessTXN() {
    this.showPreFundingTerms = false;
    this.showFundingForm = false;
    this.showFundingFormWrapper = false;
    this.showPreSTKAlert = false;
    this.showSuccessFunding = true;
    this.showFailedFunding = false;
  }

  public displayFailedTXN() {
    this.showPreFundingTerms = false;
    this.showFundingForm = false;
    this.showFundingFormWrapper = false;
    this.showPreSTKAlert = false;
    this.showSuccessFunding = false;
    this.showFailedFunding = true;
  }

  public closeSession() {
    this.fundingForm.reset();
    this.routeToBeginPage();
  }


}
