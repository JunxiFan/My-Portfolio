import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { AppSettings } from '../app.setting';
import 'rxjs/add/operator/map';
import { AccessoryModel } from '../model/accessory.model';
import { LaptopModel } from '../model/laptop.model';
import { UserModel } from '../model/login.model';

@Injectable()
export class AdminService {
  private url: string = AppSettings.BACKEND_ENDPOINT;

  constructor(private http: Http) { }

  //Accessory
  addAcc = function (params: AccessoryModel): Observable<Response> {
    return this.http.post(this.url + "/admin/", params);
  }

  getAccs = function (): Observable<AccessoryModel[]> {
    return this.http.get(this.url + "/admin")
      .map((res: Response) => res.json());
  }

  deleteAcc = function (accId: string): Observable<Response> {
    return this.http.delete(this.url + "/admin?accId=" + accId);
  }

  editAcc = function (accid: string, params: AccessoryModel): Observable<Response> {
    return this.http.put(this.url + "/admin?accId=" + accid, params);
  }

  //Laptop
  addLap = function (params: LaptopModel): Observable<Response> {
    return this.http.post(this.url + "/admin/lap", params);
  }

  getLaps = function (): Observable<LaptopModel[]> {
    return this.http.get(this.url + "/admin/lap")
      .map((res: Response) => res.json());
  }

  editLap = function (lapId: string, params: LaptopModel): Observable<Response> {
    return this.http.put(this.url + "/admin/lap?lapId=" + lapId, params);
  }

  deleteLap = function (lapId: string): Observable<Response> {
    return this.http.delete(this.url + "/admin/lap?lapId=" + lapId);
  }

  //stuff
  addAddmin = function (params: UserModel): Observable<Response> {
    return this.http.post(this.url + "/admin/stuff", params)
      .map((res: Response) => res.json());
  }

}
