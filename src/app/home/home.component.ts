import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-afro-mxp',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public title: string = '';
  public showGetStarted = false;
  public showCreateCampaign = false;

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.title = 'Get Started';
    this.showGetStarted = true;
  }

  public renderCreateCampaign() {
    this.title = 'Choose Action';
    this.showGetStarted = false;
    this.showCreateCampaign = true;
  }
  public routeToCampaign() {
    this.router.navigateByUrl('/page/campaigner');
  }

  public routeToContributor() {
    this.router.navigateByUrl('/page/code');
  }

  public routeToCampaignReports() {
    this.router.navigateByUrl('/page/reports');
  }

}
