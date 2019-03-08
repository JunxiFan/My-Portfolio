import { Injectable } from '@angular/core';
import { Http,Response,Headers,RequestOptions} from '@angular/http';
import { AppSettings} from '../app.setting';

import { Observable} from 'rxjs/Observable';
import { User } from './user.model';


@Injectable()
export class UserService {

  private url:string = AppSettings.getEndPoint();
  private token:string = AppSettings.token;

  constructor(private http:Http) { }

  viewUserList = function(): Observable<User[]> {
    return this.http.get(this.url+"/user")
              .map((res:Response)=>res.json());
  }

  disableCreator= function(value:User): Observable<Response> {
    return this.http.put(this.url+"/user/creatorDis/"+value.userId);
  }

  disableStartup= function(value:User): Observable<Response> {
    return this.http.put(this.url+"/user/suDis/"+value.userId);
  }

  enableCreator = function(value:User): Observable<Response> {
    return this.http.put(this.url+"/user/creatorEnb/"+value.userId);
  }

  enableStartup = function(value:User): Observable<Response> {
    return this.http.put(this.url+"/user/suEnb/"+value.userId);
  }

  deleteCreator = function(value:User): Observable<Response> {
    return this.http.delete(this.url+"/user/creator/"+value.userId);
  }

  deleteStartup = function(value:User): Observable<Response> {
    return this.http.delete(this.url+"/user/startup/"+value.userId);
  }

  searchCreatorByName = function(value:string): Observable<User[]> {
    return this.http.get(this.url+"/user/"+value)
              .map((res:Response)=>res.json());
  }

  searchStartupByName = function(value:string): Observable<User[]> {
    return this.http.get(this.url+"/user/su/"+value)
              .map((res:Response)=>res.json());
  }

  getInactiveCreators= function(): Observable<User[]> {
    return this.http.get(this.url+"/user/inactive/creator")
              .map((res:Response)=>res.json());
  }

  getDishonestStartups= function(): Observable<User[]> {
    return this.http.get(this.url+"/user/dishonest/startup")
              .map((res:Response)=>res.json());
  }

}
