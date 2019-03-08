import { Component, OnInit } from '@angular/core';
import { Modal } from 'ngx-modal';
import { SearchItem } from './../../itunes/itunes.model';
import { Observable } from 'rxjs/Observable';
import { NgModel, NgForm } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';

import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';
import { Registration } from './registration.model';
import { RegistrationService } from './registration.service';
@Component({
  moduleId: module.id.toString(),
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  registration: Registration = {} as any;
  addEnabled: boolean = true;
  modal:Modal;

  constructor(private regisService: RegistrationService, private router: Router) { }

  ngOnInit() {
  }

  toggleAdd = () => {
    this.addEnabled = !this.addEnabled;
  };

  userRegister = (myForm: NgForm, modal:Modal) => {
    //console.log(myForm.value);
    this.regisService.registerNotAsSu(myForm.value)
      .subscribe((res) => {
        console.log(res);
        this.modal = modal;
        this.modal.open();
        this.router.navigate(['/login']);
      },
      (err) => {
        console.log(err);
      }
      );
  }

  suRegister= (myForm: NgForm, modal:Modal) => {
    //console.log(myForm.value);
    this.regisService.registerAsSu(myForm.value)
      .subscribe((res) => {
        console.log(res);
        this.modal = modal;
        this.modal.open();
        this.router.navigate(['/login']);
      },
      (err) => {
        console.log(err);
      }
      );
  }

}
