import { Injectable } from '@angular/core';
import { Http,Response,Headers,RequestOptions} from '@angular/http';
import { AppSettings} from '../../app.setting';

import { Observable} from 'rxjs/Observable';
import { Idea } from '../../idea/idea.model';
import { Funding } from '../../funding/funding.model';
import { Order } from './order.model';
import { OrderHis } from '../cart/orderHis.model';
import { Cc } from '../cart/cc.model';

@Injectable()
export class FunderService {

  private url:string = AppSettings.getEndPoint();
  private token:string = AppSettings.token;

  constructor(private http:Http) { }

  getNewIdeasByCateId= function(value:string): Observable<Idea[]> {
    return this.http.get(this.url+"/idea/"+value)
              .map((res:Response)=>res.json());
  }

  createOrderByFundId=function(value:Funding,order:Order): Observable<Response> {
    return this.http.post(this.url+"/order/"+value.fundId,order);
  }

  getUserIdByUserName = function(value:string): Observable<number> {
    return this.http.get(this.url+"/user/username/"+value)
              .map((res:Response)=>res.json());
  }

  getOrderByUserId = function(value:string): Observable<OrderHis[]> {
    return this.http.get(this.url+"/order/"+value)
              .map((res:Response)=>res.json());
  }

  createCc = function(userId:any,cc:Cc): Observable<Response> {
    return this.http.post(this.url+"/cc/"+userId,cc);
  }

  getCcByUserId = function(userId:string): Observable<Cc[]> {
    return this.http.get(this.url+"/cc/"+userId)
              .map((res:Response)=>res.json());
  }

  clearCart =  function(ccId:any): Observable<Response> {
    return this.http.put(this.url+"/order/clear/"+ccId);
  }
}
