export class Campaign {
  public msisdn: number;
  public first_name: string;
  public last_name: string;
  public campaign_name: string;
  public type: string;
  public target_amount: number;
  public start_date: Date;
  public end_date: Date;

  constructor(msisdn: number, first_name: string, last_name: string, campaign_name: string, type: string, target_amount: number, start_date: Date, end_date: Date) {
    this.msisdn = msisdn;
    this.first_name = first_name;
    this.last_name = last_name;
    this.campaign_name = campaign_name;
    this.type = type;
    this.target_amount = target_amount;
    this.start_date = start_date;
    this.end_date = end_date;
  }
}
