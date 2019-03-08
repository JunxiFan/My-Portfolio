import {Injectable} from '@angular/core'
import {Router,CanActivate,ActivatedRouteSnapshot} from '@angular/router'
import {AppSettings} from './../app.setting'

@Injectable()
export class AuthGaurdService implements CanActivate{

    constructor(private router:Router){

    }

    canActivate(route: ActivatedRouteSnapshot){
        const expectedRole = route.data.role;
        console.log('testing');
        if(!AppSettings.isTokenExpired() && AppSettings.role == expectedRole ){
            return true;
        }else{
            this.router.navigate(['/login'])
            return false;
        }

    }
}

export enum Role{
    Admin,
    Guest,
    Startup,
    Creator,
    Funder   
}