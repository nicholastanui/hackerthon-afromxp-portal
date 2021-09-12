import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-afro-mxp',
  templateUrl: './afro-mxp.component.html',
  styleUrls: ['./afro-mxp.component.css']
})
export class AfroMxpComponent implements OnInit {
public showGetStarted = true;
public showPreRegTerms = false;
public showRegister1 = false;
public showRegister2 = false;
public showConfirm = false;
public showActivationSuccess = false;
public showActivationFailed = false;


  constructor() { }

  ngOnInit(): void {
    this.showGetStarted = false;
    this.showConfirm = true;
  }

}
