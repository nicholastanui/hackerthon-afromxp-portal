import { Injectable } from '@angular/core';
import {Campaign} from "../model/campaign";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

  public createCampaignerFormData(campaign: Campaign): FormData {
    const formData = new FormData();
    formData.append('msisdn', JSON.stringify(campaign.msisdn));
    formData.append('campaign_name', campaign.campaign_name);
    formData.append('type', campaign.type);
    formData.append('target_amount', JSON.stringify(campaign.target_amount));
    formData.append('start_date', JSON.stringify(campaign.start_date));
    formData.append('end_date', JSON.stringify(campaign.end_date));
    return formData;
  }
}
