import { Injectable } from '@angular/core';
import { Http,Response,Headers,RequestOptions} from '@angular/http';
import { AppSettings} from '../../app.setting';

import { Observable} from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import { Registration } from './registration.model';


@Injectable()
export class RegistrationService {

  private url:string = AppSettings.getEndPoint();
  private token:string = AppSettings.token;

  constructor(private http:Http) { }

  registerNotAsSu = function(value:Registration): Observable<Response> {
    return this.http.post(this.url+"/user/register",value);
  }  
  registerAsSu = function(value:Registration): Observable<Response> {
    return this.http.post(this.url+"/user/register/startup",value);
  }

  registerAsAdmin= function(value:Registration): Observable<Response> {
    return this.http.post(this.url+"/user/register/admin",value);
  }

}
