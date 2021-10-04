export class MyCampaignModel {
  campaignId: string;
  campaignName: string;
  campaignType: string;
  startDate: string;
  endDate: string;
  targetAmount: string;

  constructor(campaignId: string, campaignName: string, campaignType: string, startDate: string, endDate: string, targetAmount: string) {
    this.campaignId = campaignId;
    this.campaignName = campaignName;
    this.campaignType = campaignType;
    this.startDate = startDate;
    this.endDate = endDate;
    this.targetAmount = targetAmount;
  }
}
