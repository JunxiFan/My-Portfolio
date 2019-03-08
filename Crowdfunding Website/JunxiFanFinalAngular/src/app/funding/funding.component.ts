import { Component, OnInit } from '@angular/core';
import { Modal } from 'ngx-modal';
import { SearchItem } from './../itunes/itunes.model';
import { Observable } from 'rxjs/Observable';
import { NgModel, NgForm } from '@angular/forms';
import { FormControl } from '@angular/forms';

import { Router,ActivatedRoute } from '@angular/router';


import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';
import { Funding } from './funding.model';
import { FundingService } from './funding.service';
@Component({
  moduleId: module.id.toString(),
  selector: 'app-funding',
  templateUrl: './funding.component.html',
  styleUrls: ['./funding.component.css']
})
export class FundingComponent implements OnInit {

  fundings:Funding[];
  funding:Funding = {} as any;

  modal: Modal;
  modalError = false;
  addEnabled: boolean = false;
  results: Observable<SearchItem[]>;
  // addRoleCheckbox: NgModel;
  searchField: FormControl;

  //传来的值
  public ideaIdString: string;
  private routeParamSub: any;

  constructor(private fundingService: FundingService, private route: ActivatedRoute, private router: Router) { }
  
  ngOnInit() {
    // 将ideaId传给ideaIdString
    this.routeParamSub = this.route.params.subscribe(params => {
      this.ideaIdString = params["ideaId"];
    });


    this.refresh();
  }

  toggleAdd = () => {
    this.addEnabled = !this.addEnabled;
  };

  refresh = () => {
    this.fundingService.getFundingsByIdeaId(this.ideaIdString)
      .subscribe(
      (fundings) => {
        this.fundings = fundings;
      }
      );
  }



}
