import { Injectable } from '@angular/core';
import { Http,Response,Headers,RequestOptions} from '@angular/http';
import { AppSettings} from '../app.setting';

import { Observable} from 'rxjs/Observable';
import { Idea } from './idea.model';


@Injectable()
export class IdeaService {

  private url:string = AppSettings.getEndPoint();
  private token:string = AppSettings.token;

  constructor(private http:Http) { }

  viewIdeasByCateIdAdmin = function(value:string): Observable<Idea[]> {
    return this.http.get(this.url+"/idea/admin/"+value)
              .map((res:Response)=>res.json());
  }

  addIdea = function(userId:any,value:Idea): Observable<Response> {
    return this.http.post(this.url+"/idea/"+userId,value);
  } 
  
  getIdeaByUserId = function(userId:any): Observable<Idea[]> {
    return this.http.get(this.url+"/idea/creator/"+userId)
              .map((res:Response)=>res.json());
  }

  disableIdea = function(value:Idea): Observable<Response> {
    return this.http.put(this.url+"/idea/"+value.ideaId);
  }

  getDyingIdea = function(value:any): Observable<Idea[]> {
    return this.http.get(this.url+"/idea/dying/"+value)
              .map((res:Response)=>res.json());
  }

}
