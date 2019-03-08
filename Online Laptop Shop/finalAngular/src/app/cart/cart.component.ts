import { Component, OnInit, TemplateRef } from '@angular/core';
// import {CartItem} from '../model/cartItem.model'
////import {CartService} from '../service/cart.service'
import { Response } from '@angular/http';
import { CustomerService } from '../service/customer.service';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { ItemModel } from '../model/item.model';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { LaptopModel } from '../model/laptop.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  username = Cookie.get('username');
  items: ItemModel[] = [];
  item: ItemModel = {} as any;

  totalPrice: number = 0;

  //用来展示在页面上的配置的string
  specsString = [];
  //用来保存配置组合的list
  specsList = [];
  //同名的laptop
  sameLaptops: LaptopModel[];
  selectedNum: number = null;

  tempLaptop: LaptopModel = {} as any;
  //防止在editModal更改amount但不保存时，cart中的数量不正确
  tempAmount: number;
  name: any;
  cpu: any;
  graph: any;

  modal: BsModalRef
  constructor(private customerService: CustomerService,
    private modalService: BsModalService) { }

  ngOnInit() {
    //TODO:delete
    this.refresh();

  }

  refresh() {
    this.totalPrice = 0;
    this.customerService.findCartItems(this.username)
      .subscribe(res => {
        this.items = res;

        console.log(this.items);
        this.items.forEach(item => {
          this.totalPrice = this.totalPrice + (item.lapPrice * item.amount);
        });
      })
  }

  findSameLaptops(item: ItemModel) {
    this.customerService.findLapByName(item.lapName)
      .subscribe(res => {
        // console.log('sameLaptops: ' + res);
        this.sameLaptops = res;
        res.forEach(element => {
          this.specsString.push(element.lapCPU + ' ,  ' + element.lapGraph)
          this.specsList.push([element.lapCPU, element.lapGraph]);
        });
        // console.log('first----cpu: ', this.specsList[1][0], '  graph: ', this.specsList[1][1]);
      })
  }

  editItem(item: ItemModel, editModal: TemplateRef<any>) {
    this.specsString = [];
    this.findSameLaptops(item);
    this.item = item;
    this.tempLaptop.lapPrice = item.lapPrice;
    this.tempAmount = item.amount;
    this.modal = this.modalService.show(editModal);
  }

  updateTempLaptop(i) {
    console.log('i-------', i);
    console.log('specsList', this.specsList);

    this.name = this.item.lapName;
    this.cpu = this.specsList[i][0];
    this.graph = this.specsList[i][1];
    console.log(this.name, this.cpu, this.graph);

    this.customerService.findLapBySpec(this.name, this.cpu, this.graph)
      .subscribe(res => {
        this.tempLaptop = res;
        console.log("temp laptop:  ", this.tempLaptop);
      })
    this.selectedNum = null;
  }

  onEditItem(form: NgForm) {
    let editItem = new ItemModel(
      this.tempLaptop._id,
      this.tempLaptop.lapName,
      this.tempLaptop.lapPrice,
      Cookie.get('username'),
      form.value.amount,
      this.tempLaptop.lapCPU,
      this.tempLaptop.lapGraph,
      'unpaid',
      this.item._id,
    );
    console.log(editItem);

    this.customerService.editCartItem(editItem)
      .subscribe(res => {
        this.modal.hide();
        this.refresh();
      })
  }

  delItem(item: ItemModel, delModal: TemplateRef<any>) {
    this.item = item;
    this.modal = this.modalService.show(delModal);
  }

  onDelItem() {
    this.customerService.delCartItem(this.item._id)
      .subscribe(res => {
        console.log(res);
        this.modal.hide();
        this.refresh();

      })
  }

  canCheck() {
    if (this.items.length == 0) {
      return false;
    } else {
      return true;
    }
  }

  checkout(checkoutModal: TemplateRef<any>) {
    this.modal = this.modalService.show(checkoutModal);
  }

  onCheckout() {
    this.items.forEach(item => {
      this.customerService.checkout(item)
        .subscribe(res => {
          console.log(res);
          this.modal.hide();
          this.refresh();

        })
    });
  }




}


