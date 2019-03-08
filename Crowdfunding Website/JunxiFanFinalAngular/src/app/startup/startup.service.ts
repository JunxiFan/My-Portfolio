import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { AppSettings } from '../app.setting';

import { Observable } from 'rxjs/Observable';
import { Service } from '../creator/myidea/service.model';
import { Bid } from './startup-service/bid.model';
import { Report } from './startup-bid/report.model';

@Injectable()
export class StartupService {

  private url: string = AppSettings.getEndPoint();
  private token: string = AppSettings.token;

  constructor(private http: Http) { }

  getServiceByIdeaId = function (ideaId: string): Observable<Service[]> {
    return this.http.get(this.url + "/service/" + ideaId)
      .map((res: Response) => res.json());
  }

  getCateIdByUserId = function (userId: string): Observable<Service[]> {
    return this.http.get(this.url + "/user/su/cateid/" + userId)
      .map((res: Response) => res.json());
  }

  getSuIdByUserId = function (userId: number): Observable<number> {
    return this.http.get(this.url + "/user/su/suid/" + userId)
      .map((res: Response) => res.json());
  }

  createBid = function (servId: any, suId: any, bid: Bid): Observable<Response> {
    return this.http.post(this.url + "/bid/" + servId + "/" + suId, bid);
  }

  getEveryService = function (ideaId: string): Observable<Service[]> {
    return this.http.get(this.url + "/service/admin/" + ideaId)
      .map((res: Response) => res.json());
  }

  getSelectedBidByUserId = function (userId: string): Observable<Bid[]> {
    return this.http.get(this.url + "/bid/selected/" + userId)
      .map((res: Response) => res.json());
  }

  writeReport = function (bidId: any, report: Report): Observable<Response> {
    return this.http.post(this.url + "/report/" + bidId, report);
  }

  getReportByBidId = function (bidId: string): Observable<Report[]> {
    return this.http.get(this.url + "/report/" + bidId)
      .map((res: Response) => res.json());
  }

  getBidIndanger= function (suId:any): Observable<Bid[]> {
    return this.http.get(this.url + "/bid/indanger/"+ suId)
      .map((res: Response) => res.json());
  }

}
