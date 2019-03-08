import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { AppSettings } from '../app.setting';
import 'rxjs/add/operator/map';
import { AccessoryModel } from '../model/accessory.model';
import { LaptopModel } from '../model/laptop.model';
import { UserModel } from '../model/login.model';
import { ItemModel } from '../model/item.model';

@Injectable()
export class CustomerService {
  private url: string = AppSettings.BACKEND_ENDPOINT;
  constructor(private http: Http) { }

  addCustomer = function (value: UserModel): Observable<Response> {
    return this.http.post(this.url + '/register', value)
      .map((res: Response) => res.json());
  }

  findLapByBrand = function (brand: string): Observable<LaptopModel[]> {
    return this.http.get(this.url + "/customer/findLapByBrand?lapBrand=" + brand)
      .map((res: Response) => res.json());
  }

  findLapByName = function (name: string): Observable<LaptopModel[]> {
    return this.http.get(this.url + "/customer/findLapByName?lapName=" + name)
      .map((res: Response) => res.json());
  }

  findLapById = function (id: string): Observable<LaptopModel> {
    return this.http.get(this.url + "/customer/findLapById?lapId=" + id)
      .map((res: Response) => res.json());
  }

  findLapBySpec = function (lapName, lapCPU, lapGraph): Observable<LaptopModel> {
    return this.http.get(this.url + "/customer/findLapBySpec?lapName=" + lapName + '&lapCPU=' + lapCPU + '&lapGraph=' + lapGraph)
      .map((res: Response) => res.json());
  }

  //cart
  addToCart = function (value: ItemModel): Observable<Response> {
    return this.http.post(this.url + '/customer/addToCart', value);
  }

  findCartItems = function (username: string): Observable<ItemModel[]> {
    return this.http.get(this.url + "/customer/findCartItems?username=" + username)
      .map((res: Response) => res.json());
  }

  editCartItem = function (item: ItemModel): Observable<Response> {
    return this.http.put(this.url + "/customer/editCartItem", item);
  }

  delCartItem = function (itemId: string): Observable<Response> {
    return this.http.delete(this.url + "/customer/delCartItem?itemId=" + itemId);
  }

  checkout = function (item: ItemModel): Observable<Response> {
    return this.http.put(this.url + "/customer/checkout", item);
  }
  
  //order history
  findHistoryItems = function (username: string): Observable<ItemModel[]> {
    return this.http.get(this.url + "/customer/findHistoryItems?username=" + username)
      .map((res: Response) => res.json());
  }
}
