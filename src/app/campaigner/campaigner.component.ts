import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-campaigner',
  templateUrl: './campaigner.component.html',
  styleUrls: ['./campaigner.component.css']
})
export class CampaignerComponent implements OnInit {
  public showPreRegTerms = false;
  public showPhoneInput = false;
  public showOTPInput = false;
  public showRegister2 = false;
  public showConfirm = false;
  public showActivationSuccess = false;
  public showActivationFailed = false;

  constructor() { }

  ngOnInit(): void {
    this.showPreRegTerms = true;
  }

}
