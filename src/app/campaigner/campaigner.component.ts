import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {Subscription} from "rxjs";

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

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.displayTermsPage();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  public routeToBeginPage() {
    this.router.navigateByUrl('/page/begin');
  }

  public submitCampaignerForm(value: any) {
    console.log(JSON.stringify(value));
    this.subscriptions.push(
      //TODO:
    );

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
