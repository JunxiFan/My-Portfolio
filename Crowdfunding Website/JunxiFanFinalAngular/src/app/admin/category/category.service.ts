import { Injectable } from '@angular/core';
import { Http,Response,Headers,RequestOptions} from '@angular/http';
import { AppSettings} from '../../app.setting';

import { Observable} from 'rxjs/Observable';
import { Category } from './category.model';

import 'rxjs/add/operator/map';

@Injectable()
export class CategoryService {

  private url:string = AppSettings.getEndPoint();
  private token:string = AppSettings.token;

  constructor(private http:Http) { }
    
viewCates = function(): Observable<Category[]> {
  return this.http.get(this.url+"/category")
            .map((res:Response)=>res.json());
}
  
deleteCate = function(value:Category): Observable<Response> {
  return this.http.delete(this.url+"/category/"+value.cateId);
}

addCate= function(value:Category): Observable<Response> {
  return this.http.post(this.url+"/category",value);
}

editCate = function(value:Category): Observable<Response> {
  return this.http.put(this.url+"/category/"+value.cateId,value);
}

disableCate = function(value:Category): Observable<Response> {
  return this.http.put(this.url+"/category/disabled/"+value.cateId);
}

getCategoryTotalAmount= function(value:any): Observable<number> {
  return this.http.get(this.url+"/funding/category/total/"+value)
            .map((res:Response)=>res.json());
}

}
