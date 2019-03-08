import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { Http } from "@angular/http"
import { UserModel } from '../model/login.model';
import { Router } from '@angular/router';
import { NgModel, NgForm } from '@angular/forms';
import { CustomerService } from '../service/customer.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  passwordIndicator = 0;
  passwordCompare = false;

  registerForm: FormGroup;

  modal: BsModalRef;
  title: string;
  message: string;

  constructor(private customerService: CustomerService,
    private router: Router,
    private modalService: BsModalService) { }

  ngOnInit() {
    this.registerForm = new FormGroup({
      username: new FormControl("", Validators.compose([
        Validators.required
      ])),
      password: new FormControl("", Validators.compose([
        Validators.required
      ])),
      password2: new FormControl("", Validators.compose([
        Validators.required
      ]))
    })
  }



  onKey(value: string) {
    var par1 = new RegExp("[0-9]");
    var par2 = new RegExp("[a-z]");
    var par3 = new RegExp("[A-Z]");
    var result = par1.test(value) && par2.test(value) && par3.test(value);

    var x = value.length;
    if (x == 0) {
      this.passwordIndicator = 0;
    } else if (x > 8 && result) {
      this.passwordIndicator = 3;

    } else if (x > 8 || result) {
      this.passwordIndicator = 2;

    } else {
      this.passwordIndicator = 1;
    }
    console.log(value);


  }

  onCompare(value1: string, value2: string) {
    console.log(value1);
    console.log(value2);
    if (value1 != value2) {
      this.passwordCompare = true;
    } else {
      this.passwordCompare = false;
    }
  }
  openModal(template: TemplateRef<any>) {
    this.modal = this.modalService.show(template);
  }

  onClickSubmit(modal: TemplateRef<any>, form:NgForm) {
    console.log(form);
    this.customerService.addCustomer(form.value)
      .subscribe((res) => {
        // console.log(res);
        if (res) {
          this.title = "Done!";
          this.message = "Sign Up Succeed!";
          this.openModal(modal);
          form.reset();
          this.router.navigate(["home"])
        } else {
          this.title = "Failed!";
          this.message = "This username is already exist!";
          this.openModal(modal);
          form.reset();
        }
      }, err => {
        console.log(err);
        // this.refresh();
      }
      )
  }
}
