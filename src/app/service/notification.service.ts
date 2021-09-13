import { Injectable } from '@angular/core';
import {NotifierService} from "angular-notifier";
import {NotificationTypeEnum} from "../enum/notification-type.enum";

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private notifier: NotifierService) { }

  public showNotification(type: NotificationTypeEnum, message: string) {
    this.notifier.notify(type, message);
  }
}
