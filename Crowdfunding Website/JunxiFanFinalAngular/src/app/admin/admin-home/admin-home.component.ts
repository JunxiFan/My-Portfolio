import { Component, OnInit } from '@angular/core';
import { FundingService } from '../../funding/funding.service';
import { CategoryService } from '../category/category.service';
import { NgForm } from '@angular/forms/src/directives/ng_form';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent implements OnInit {

  webTotalAmount: number
  cateTotalAmount: number
  cateIdForSearch:number
  constructor(private fundingService: FundingService, private cateService: CategoryService) { }

  ngOnInit() {
    this.getWebSiteTotalAmount();
  }


  getWebSiteTotalAmount = () => {
    this.fundingService.getWebSiteTotalAmount()
      .subscribe(
      (res) => {
        this.webTotalAmount = res;
      }
      );
  }

  getCategoryTotalAmount = (form: NgForm) => {
    this.cateService.getCategoryTotalAmount(this.cateIdForSearch)
      .subscribe(
      (amount) => {
        this.cateTotalAmount = amount;
      }
      );
  }
}
