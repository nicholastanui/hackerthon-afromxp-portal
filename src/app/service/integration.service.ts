import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient, HttpErrorResponse, HttpResponse} from "@angular/common/http";
import {Observable} from "rxjs";
import {CallbackModel} from "../model/callback.model";
import {map, mergeMap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class IntegrationService {
  private host = environment.apiUrl

  constructor(private http: HttpClient) { }

  public addCampaign(formData: FormData): Observable<CallbackModel[]> {
    return this.http.post<CallbackModel[]>(`${this.host}/addcampaign`, formData);
  }

  public getCampaign(campaignId: string): Observable<CallbackModel> {
    return this.http.get<CallbackModel>(`${this.host}/getcampaign/${campaignId}`);
  }

  public makePayment(fundData: FormData): Observable<CallbackModel[]> {
    return this.http.post<CallbackModel[]>(`${this.host}/makepayment`, fundData);
  }

  public paymentStatus(data: FormData): Observable<CallbackModel[]> {
    return this.http.post<CallbackModel[]>(`${this.host}/paymentstatus`, data);
  }

}
