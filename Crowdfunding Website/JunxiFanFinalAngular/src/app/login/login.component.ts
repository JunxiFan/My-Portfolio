import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from './login.service';
import { AppSettings } from '../app.setting';
import { Role } from '../auth/auth.gaurd';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  model: any = {};
  loading = false;
  error = '';

  constructor(private router: Router,
    private loginService: LoginService) {

    this.loginService.logout();
  }

  ngOnInit() {
    console.log('LOGIN COMPONENT');

  }

  login = () => {
    this.loading = true;
    this.loginService.login(this.model.username, this.model.password)
      .subscribe(
      (result) => {
        console.log('Success')
        if (result && AppSettings.role == Role.Admin) {
          this.router.navigate(['/home'])
        }
        else if (result && AppSettings.role == Role.Funder) {
          this.router.navigate(['/funder/idea'])
        } 
        else if (result && AppSettings.role == Role.Creator) {
          this.router.navigate(['/creator/idea'])
        }
        else if (result && AppSettings.role == Role.Startup) {
          this.router.navigate(['/startup/idea'])
        }
        else {
          this.error = 'Login Failed';
        }
        this.loading = false;

      },
      (error) => {
        console.log('Error')

        switch (error.status) {
          case 0:
            this.error = 'Error: While connecting to server';
            break;
          case 400:
            this.error = 'Erro;r: Username and Password incorrect';
            break
          case 401:
            this.error = 'Error: Check token server';
            break;
          default:
            this.error = 'Error Processing Login';

        }
        this.loading = false;
      }


      )

  }

}
