import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { AppSettings } from '../app.setting';
import { UserModel } from '../model/login.model';
import 'rxjs/add/operator/map';

@Injectable()
export class LoginService {
  private url: string = AppSettings.BACKEND_ENDPOINT;

  constructor(private http: Http) { }

  loginCheck = function (value: UserModel): Observable<Response> {
    return this.http.post(this.url + '/loginCheck', value)
      .map((res: Response) => res.json());
  }

}
