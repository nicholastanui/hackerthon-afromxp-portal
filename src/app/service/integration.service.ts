import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient, HttpErrorResponse, HttpResponse} from "@angular/common/http";
import {Observable} from "rxjs";
import {CallbackModel} from "../model/callback.model";

@Injectable({
  providedIn: 'root'
})
export class IntegrationService {
  private host = environment.apiUrl

  constructor(private http: HttpClient) { }

  public submitCampaign(formData: FormData): Observable<CallbackModel[]> {
    return this.http.post<CallbackModel[]>(`${this.host}/addcampaign`, formData);
  }

  public submitFunding(fundData: FormData): Observable<CallbackModel[]> {
    return this.http.post<CallbackModel[]>(`${this.host}/makepayment`, fundData);
  }

}
