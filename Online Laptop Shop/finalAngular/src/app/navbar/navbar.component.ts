import { Component, OnInit, TemplateRef } from '@angular/core';
import { NgModel, NgForm } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { LoginService } from '../service/login.service';
import { UserModel } from '../model/login.model';
import { MessageService, UserStatus } from '../message/message.service';
import { AppSettings } from '../app.setting';
import { Router } from '@angular/router';
import { Cookie } from "ng2-cookies/ng2-cookies";
import { ResourceLoader } from '@angular/compiler';
import { CustomerService } from '../service/customer.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  model: any = {};
  role: string;

  modal: BsModalRef;
  title: string;
  modalMessage: string;

  username: string;

  constructor(private loginService: LoginService,
    private messageService: MessageService,
    private router: Router,
    private modalService: BsModalService
  ) {

  }

  ngOnInit() {
    console.log('Cookie role:' + Cookie.get('role'));
    if (!Cookie.get('role')) {
      Cookie.set('role', 'Guest');
    }
    this.username = Cookie.get('username');
    // console.log('Cookie:' + Cookie.get('role'));


    // this.messageService.currentMessage
    //   .subscribe((messageData) => {
    //     console.log('currentMessage.status:  ' + messageData.status);
    //     if (messageData.status == 'login') {


    //     } else if (messageData.status == 'logout') {
    //       Cookie.set('role', 'Guest');

    //     }
    //   });
  }

  login = (form: NgForm, modal: TemplateRef<any>) => {
    console.log(form.value);
    this.loginService.loginCheck(form.value)
      .subscribe(res => {
        // console.log('find this username');

        console.log('res:   ' + res);
        //logincheck通过，返回该user的role
        //express返回的res是json格式的response，还需用.json()将body部分转换成json，再用tostring转化为string
        if (res) {
          console.log('login pass');

          this.role = res.toString();

          Cookie.set('status', 'login');
          Cookie.set('username', this.model.username);
          Cookie.set('role', this.role);
          console.log('username:  ', Cookie.get('username'));
          

          this.userDirectTo(modal);
          //logincheck未通过，返回false
        } else {
          alert('Incorrect password!')

        };
      }, err => {
        switch (err.status) {
          case 400:
            alert('This username is not exist!');
            break;

          default:
            alert('Error Processing Login');
            break;
        }

      })
  };

  openModal(template: TemplateRef<any>) {
    this.modal = this.modalService.show(template);
  }

  userDirectTo = (modal: TemplateRef<any>) => {

    if (Cookie.get('role') == 'Admin') {
      this.username = Cookie.get('username');
      this.router.navigate(['adminhome/welcome']);
    } if (Cookie.get('role') == 'Customer') {
      this.username = Cookie.get('username');
      // this.router.navigate(['home']);
      this.title = "Welcome!";
      this.modalMessage = "Login Succeed.";
      this.openModal(modal);
    }
  };

  isGuest() {
    if (Cookie.get('role') == 'Guest') {
      return true;
    }
    return false;
  }

  isAdmin() {
    if (Cookie.get('role') == 'Admin') {
      return true;
    }
    return false;
  }

  isCustomer() {
    if (Cookie.get('role') == 'Customer') {
      return true;
    }
    return false;
  }

  logout() {
    Cookie.deleteAll();
    console.log('logout-cookie username: ' + Cookie.get('username'));

    Cookie.set('role', 'Guest')
  }

  searchLapByBrand(form: NgForm) {

    this.router.navigate(['/product/list', form.value.searchBrand]);
  }

  // navToCart(){
  //   this.router.navigate(['/cart', this.username])
  // }

 
}
