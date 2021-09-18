export interface FundStatusModel {
  id:string;
  response_code: string;
  response_desc: string;
  merchant_requestid: string;
  checkout_requestid: string;
  amount: string;
  mpesatxid: string;
  trans_date: string;
  msisdn: string;
  result_code: string;
  result_desc: string;
}
