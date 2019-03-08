import { Component, OnInit } from '@angular/core';

//import {CartService} from '../service/cart.service'
import { Response } from '@angular/http';
import { CustomerService } from '../service/customer.service';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { ItemModel } from '../model/item.model';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {
  username = Cookie.get('username');
  items: ItemModel[] = [];

  //TODO:delete
  constructor(private customerService: CustomerService) {


  }

  ngOnInit() {
    this.refresh();
  }

  refresh() {
    this.customerService.findHistoryItems(this.username)
      .subscribe(res => {
        this.items = res;
        console.log(this.items);
      })
  }





}
