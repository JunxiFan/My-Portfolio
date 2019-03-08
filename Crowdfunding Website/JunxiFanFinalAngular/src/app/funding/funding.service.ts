import { Injectable } from '@angular/core';

import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { AppSettings } from '../app.setting';

import { Observable } from 'rxjs/Observable';
import { Funding } from './funding.model';
@Injectable()
export class FundingService {

  private url: string = AppSettings.getEndPoint();
  private token: string = AppSettings.token;

  constructor(private http:Http) { }

  getFundingsByIdeaId = function (value: string): Observable<Funding[]> {
    return this.http.get(this.url + "/funding/" + value)
      .map((res: Response) => res.json());
  }

  getIdeaTotallAmount = function (ideaId:string): Observable<number> {
    return this.http.get(this.url + "/funding/total/" + ideaId)
      .map((res: Response) => res.json());
  }

  getWebSiteTotalAmount= function (): Observable<number> {
    return this.http.get(this.url + "/funding/website/total")
      .map((res: Response) => res.json());
  }

}
