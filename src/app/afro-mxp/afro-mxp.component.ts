import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-afro-mxp',
  templateUrl: './afro-mxp.component.html',
  styleUrls: ['./afro-mxp.component.css']
})
export class AfroMxpComponent implements OnInit {
public showGetStarted = true;
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  public routeToCampaign() {
    this.router.navigateByUrl('/page/campaigner');
  }

  public routeToContributor() {
    this.router.navigateByUrl('/page/contributor');
  }

}
