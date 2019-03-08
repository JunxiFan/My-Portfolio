import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor
  } from '@angular/common/http';
import {Role} from './auth/auth.gaurd';
  
import * as jwt_decode from 'jwt-decode';



export const TOKEN_AUTH_USERNAME = 'AngularClientId';
export const TOKEN_AUTH_PASSWORD = 'AngularClientPassword';
export const TOKEN_NAME = 'access_token';
export const AUTH_HEADER_KEY = 'Authorization'
export const AUTH_PREFIX = 'Bearer';


export class AppSettings {

    private static CONNECT_TO_SECURE_SERVER:boolean = true;
    public static REST_ENDPOINT='http://127.0.0.1:8085/DemoApp';
    public static REST_SECURE_ENDPOINT='http://127.0.0.1:8088/Info6250';
    // public static REST_SECURE_ENDPOINT='http://127.0.0.1:8443/SecureDemoApp';

    private static _token:string;
    private static _role:Role;

    

    public static getEndPoint = () =>{

        if(AppSettings.CONNECT_TO_SECURE_SERVER){
            return AppSettings.REST_SECURE_ENDPOINT;
        }else{
            return AppSettings.REST_ENDPOINT;
        }

    }

    static set token(value){
        this._token = value;
    }

    static get token(){
        if(this._token == null){
            let current_user = JSON.parse(localStorage.getItem('currentUser'));
            console.log('Current User '+current_user);
            if(current_user!=null){     
                this._token = current_user.token;
                console.log('TOKEN '+this._token);   
            }
        }
        return this._token;
    }

    static set role(value:any){
        this._role = value;
    }

    static get role(){
        return this._role; 
    }
    

    private static getTokenExpirationDate = (token: string): Date =>{
        const decoded = jwt_decode(token);
    
        if (decoded.exp === undefined) return null;
    
        const date = new Date(0); 
        date.setUTCSeconds(decoded.exp);
        return date;
      }

    static isTokenExpired = (): boolean => {
        if(!AppSettings.token) 
            return true;
    
        const date = AppSettings.getTokenExpirationDate(AppSettings.token);
        console.log(date);
        console.log(new Date());
        
        if(date === undefined) return false;
        return !(date.valueOf() > new Date().valueOf());
      }
 }