import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpResponse,
  HttpErrorResponse,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/do';

export class JwtInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    
    return next.handle(request).do((event: HttpEvent<any>) => {
      console.log('--- THis is http ---');
      
      if (event instanceof HttpResponse) {
        // do stuff with response if you want
      }

    }, (err: any) => {
      if (err instanceof HttpErrorResponse) {
        console.log('--- THis is http ---');
        if (err.status === 401) {
          // redirect to the login route
          // or show a modal
        }
      }
    });
  }
}