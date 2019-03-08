import { Component, OnInit } from '@angular/core';
import { Modal } from 'ngx-modal';
import { SearchItem } from './../../itunes/itunes.model';
import { Observable } from 'rxjs/Observable';
import { NgModel, NgForm } from '@angular/forms';
import { FormControl } from '@angular/forms';

import { Router, ActivatedRoute } from '@angular/router';


import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';
import { OrderHis } from './orderHis.model';
import { FunderService } from '../funder-idea/funder.service';
import { MessageService } from '../../messages/data.service';
import { Cc } from './cc.model';

@Component({
  moduleId: module.id.toString(),
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  orderHisList: OrderHis[];
  orderHis: OrderHis = {} as any;

  ccs : Cc[];
  cc: Cc = {} as any;

  username: string;
  userId: any;

  modal: Modal;
  modalError = false;
  addEnabled: boolean = false;
  results: Observable<SearchItem[]>;
  // addRoleCheckbox: NgModel;
  searchField: FormControl;

  constructor(private funderService: FunderService, private router: Router, private messageService: MessageService) { }

  ngOnInit() {

    //username赋值
    this.messageService.currentMessage
      .subscribe((messageData) => {
        console.log(messageData);
        this.username = messageData.username;
      });
    //获得userID
    this.funderService.getUserIdByUserName(this.username)
      .subscribe(
      (userId) => {
        this.userId = userId;
        this.refresh();
      }
      );
    
  }

  toggleAdd = () => {
    this.addEnabled = !this.addEnabled;
  };

  refresh = () => {
    this.funderService.getOrderByUserId(this.userId)
      .subscribe(
      (orderHisList) => {
        this.orderHisList = orderHisList;
      });
      this.funderService.getCcByUserId(this.userId)
      .subscribe(
      (ccs) => {
        this.ccs = ccs;
      });
  }

  onSubmitCC = (myForm: NgForm) => {
    console.log(myForm.value);
    this.funderService.createCc(this.userId,myForm.value)
      .subscribe((res) => {
        console.log(res);
        this.refresh();
        this.toggleAdd();
        myForm.reset();
      },
      (err) => {
        console.log(err);
        this.refresh();
      }
      );
  }

  clearCart= (value: Cc) => {
    console.log(value);
    this.funderService.clearCart(value.ccId)
      .subscribe((res) => {
        console.log(res);
        this.refresh();
      },
      (err) => {
        console.log(err);
        this.refresh();
      }
      );
  }
}
