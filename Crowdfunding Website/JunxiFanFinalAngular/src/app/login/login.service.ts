import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions,RequestMethod } from '@angular/http'
import { Observable } from 'rxjs';
import { MessageService,MessageType } from './../messages/data.service'
import { AppSettings, TOKEN_AUTH_USERNAME, TOKEN_AUTH_PASSWORD } from './../app.setting'
import 'rxjs/add/operator/map'
import * as jwt_decode from 'jwt-decode';




@Injectable()
export class LoginService {

    public token: string;

    constructor(private http: Http,private messageService: MessageService) { 
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.token = currentUser && currentUser.token;
    }

    login = (username: string, password: string): Observable<boolean> => {

        // const body = JSON.stringify({ 
        //     username: username, 
        //     password: password,
        //     grant_type : "password"
        //     });

        let body = `username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}&grant_type=password`;

        let headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        //The btoa() method encodes a string in base-64
        headers.append('Authorization', 'Basic ' + btoa(TOKEN_AUTH_USERNAME + ':' + TOKEN_AUTH_PASSWORD));

        let options = new RequestOptions( {
                headers: headers,
                withCredentials: true });
        
        //console.log(headers);

        return this.http
            .post(
            AppSettings.getEndPoint() + '/oauth/token',
            body,
            options
            )
            .map((response) => {
                console.log('Testing')
                let token = response.json() && response.json().access_token;
                if (token) {
                    // set token property                    
                    AppSettings.token = token;
                    let decode_token = jwt_decode(token);
                    // store username and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify({ username: username, token: token , role:decode_token.authorities }));
                    // return true to indicate successful login
                    this.messageService.changeMessage({type:MessageType.LOGIN_SUCCESS, username:username, role:decode_token.authorities})
                    
                    return true;
                } else {
                    // return false to indicate failed login
                    return false;
                }
            });
    }

    logout =(): void => {
        // clear token remove user from local storage to log user out
        console.log('logout is called');
        this.token = null;
        AppSettings.token = null;
        //localStorage.removeItem('currentUser');
        //localStorage.clear();        
        this.messageService.changeMessage({type:MessageType.LOGOUT_SUCCESS});
        
    }
    
}
