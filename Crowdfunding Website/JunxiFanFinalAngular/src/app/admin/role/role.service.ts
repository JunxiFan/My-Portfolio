import { Injectable } from '@angular/core';
import { Http,Response,Headers,RequestOptions} from '@angular/http';
import { Role} from './role.model';
import { AppSettings} from '../../app.setting';

import { Observable} from 'rxjs/Observable';

//import {AuthHttp} from 'angular2-jwt';


import 'rxjs/add/operator/map';

@Injectable()
export class RoleService {

  private url:string = AppSettings.getEndPoint();
  private token:string = AppSettings.token;

  constructor(private http:Http) { 
    

  }


  // createHeader=()=>{
  //    let headers = new Headers({ 'Authorization': 'Bearer ' + this.token });
  //    let options = new RequestOptions({ headers: headers });
  //    return options;
  // }

  getRoles = function(): Observable<Role[]> {
    //      return this.http.get(this.url+"/role",this.createHeader())

    return this.http.get(this.url+"/role")
              .map((res:Response)=>res.json());
  }

  deleteRole = function(value:Role): Observable<Response> {
    return this.http.delete(this.url+"/role/"+value.roleId);
  }

  addRole = function(value:Role): Observable<Response> {
    return this.http.post(this.url+"/role/",value);
  }

  editRole = function(value:Role): Observable<Response> {
    return this.http.put(this.url+"/role/"+value.roleId,value);
  }
}