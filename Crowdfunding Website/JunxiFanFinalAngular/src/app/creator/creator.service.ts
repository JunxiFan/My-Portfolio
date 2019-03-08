import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { AppSettings } from '../app.setting';

import { Observable } from 'rxjs/Observable';
import { Service } from './myidea/service.model';
import { Funding } from '../funding/funding.model';
import { Bid } from '../startup/startup-service/bid.model';

@Injectable()
export class CreatorService {

  private url: string = AppSettings.getEndPoint();
  private token: string = AppSettings.token;

  constructor(private http: Http) { }

  createService = function (userId: any, service: Service): Observable<Response> {
    return this.http.post(this.url + "/service/" + userId, service);
  }

  createFunding = function (userId: any, funding: Funding): Observable<Response> {
    return this.http.post(this.url + "/funding/" + userId, funding);
  }

  getBidByServId = function(servId:string): Observable<Bid[]> {
    return this.http.get(this.url+"/bid/"+servId)
              .map((res:Response)=>res.json());
  }

  selectBid = function(bidId:number): Observable<Response> {
    return this.http.put(this.url+"/bid/"+bidId);
  }
}
