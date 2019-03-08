import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class MessageService {
  private messageSource = new BehaviorSubject<any>({});

  currentMessage = this.messageSource.asObservable();
  
  constructor() { }
  
  changeMessage(message: any) {
    console.log('message sent'+message);
    this.messageSource.next(message)
  }
}

export enum MessageType {
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  GENERIC_MSG
}