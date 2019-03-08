import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AppSettings } from '../app.setting';
import { Cookie } from 'ng2-cookies/ng2-cookies';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {

  }

  canActivate(next: ActivatedRouteSnapshot) {
    console.log('test canActivate')
    const expectedRole = next.data.role;
    if (Cookie.get('role') == expectedRole) {
      return true;
    } else {
      this.router.navigate(['home'])

      return false;
    }

  }
}


