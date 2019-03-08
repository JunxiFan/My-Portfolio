import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerService } from '../../service/customer.service';
import { LaptopModel } from '../../model/laptop.model';
import 'rxjs/add/operator/concat';
import 'rxjs/add/operator/filter';
import { getRandomString } from 'selenium-webdriver/safari';
import { empty } from 'rxjs/Observer';


@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  searchValue: any;
  getLapBrand: any;
  searchResult: Boolean = false;


  laptops: LaptopModel[] = [];
  itemNum: number[] = [];

  imgURLHead = './assets/img/shop/single/';
  imgURL: string;
  urlList = ['01.jpg', '02.jpg', '03.jpg', '04.jpg', '05.jpg'];

  constructor(private route: ActivatedRoute,
    private customerService: CustomerService,
    private router: Router) {

  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.searchValue = params["searchValue"];
      this.getLapBrand = params['lapBrand'];

      console.log('seachValue: ', this.searchValue);
      console.log('getLapBrand: ', this.getLapBrand);
      if (this.getLapBrand !== undefined) {
        this.doSearchByBrand(this.getLapBrand);

      } else if (this.searchValue !== undefined) {
        this.doSearchByName(this.searchValue);

      }

    })
  }


  doSearchByName(value) {

    this.customerService.findLapByName(value)
      .subscribe(res => {
        // console.log("searchAsLapName: ", res);
        this.laptops = res;
        console.log('search name => laptops ', this.laptops);
        // console.log('--------------------', this.laptops);
        this.setUpItemNum();
        this.searchValue = null;
        this.laptopsNotNull();
      }, err => {
        console.log(err);
      })
  }

  doSearchByBrand(value) {

    this.customerService.findLapByBrand(value)
      .subscribe(res => {
        // console.log("searchAsLapName: ", res);
        this.laptops = res;
        console.log('search brand => laptops ', this.laptops);
        // this.searchResult = true;
        this.setUpItemNum();
        this.getLapBrand = null;
        this.laptopsNotNull();
      }, err => {
        console.log(err);
      })
  }

  laptopsNotNull() {
    if (this.laptops.length == 0) {
      this.router.navigate(['error'])
    }
  }

  setUpItemNum() {
    console.log('length: ', this.laptops.length);
    this.itemNum = [];
    var x = 1;
    while (x <= this.laptops.length) {
      this.itemNum.push(x);
      x = x + 3;
    }
    console.log('itemNum[]: ', this.itemNum);
  }

  findSubarray(num: number): LaptopModel[] {
    var sub: LaptopModel[] = [];
    for (var i = 1; i <= 3; i++) {
      if (num <= this.laptops.length) {
        sub.push(this.laptops[num - 1]);
        num++;
      } else {
        break;
      }
    }
    return sub;
  }

  getImgURL(i) {
    this.imgURL = this.imgURLHead + this.urlList[i % 5];
    return this.imgURL;
  }

  routeToDetails(laptop: LaptopModel) {
    this.router.navigate(['product/detail', laptop._id]);
  }


}
