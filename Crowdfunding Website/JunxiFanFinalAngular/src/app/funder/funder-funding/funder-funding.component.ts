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
import { Funding } from '../../funding/funding.model';
import { FundingService } from '../../funding/funding.service';
import { FunderService } from '../funder-idea/funder.service';
import { Order } from '../funder-idea/order.model';
import { MessageService } from '../../messages/data.service';
import { AppSettings } from '../../app.setting';
import { Role } from '../../auth/auth.gaurd';

@Component({
  moduleId: module.id.toString(),
  selector: 'app-funder-funding',
  templateUrl: './funder-funding.component.html',
  styleUrls: ['./funder-funding.component.css']
})
export class FunderFundingComponent implements OnInit {
  fundings: Funding[];
  funding: Funding = {} as any;
  order: Order = {} as any;
  username: string;
  userId: any;
  totalAmount:number;

  modal: Modal;
  modalError = false;
  addEnabled: boolean = false;
  results: Observable<SearchItem[]>;
  // addRoleCheckbox: NgModel;
  searchField: FormControl;

  buyAmount: any

  //传来的值
  public ideaIdString: string;
  private routeParamSub: any;

  constructor(private funderService: FunderService, private fundingService: FundingService,
    private route: ActivatedRoute, private router: Router, private messageService: MessageService) { }

  ngOnInit() {
    // 将ideaId传给ideaIdString
    this.routeParamSub = this.route.params.subscribe(params => {
      this.ideaIdString = params["ideaId"];
    });

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
      }
      );

    this.refresh();
    this.getIdeaTotalAmount();
  }


  toggleAdd = () => {
    this.addEnabled = !this.addEnabled;
  };

  isFunder = () => {
    if (AppSettings.role == Role.Funder) {
      return true;
    }
    return false;
  };

  refresh = () => {
    this.fundingService.getFundingsByIdeaId(this.ideaIdString)
      .subscribe(
      (fundings) => {
        this.fundings = fundings;
      }
      );
  }

  getIdeaTotalAmount= () => {
    this.fundingService.getIdeaTotallAmount(this.ideaIdString)
      .subscribe(
      (res) => {
        this.totalAmount = res;
      }
      );
  }

  createOrder = (value: Funding, modal: Modal) => {
    console.log(value);
    this.funding = new Funding(value.fundId, value.fundValue, value.fundDesc, value.fundAmount, value.ideaId);
    this.modal = modal;
    this.modal.open();
  }

  putIntoCart = () => {
    this.order = new Order(this.userId, this.buyAmount);
    this.funderService.createOrderByFundId(this.funding, this.order)
      .catch(
      (error) => {
        console.log('testing');
        // this.notifyService.popError();
        return Observable.throw(error);
      }
      )
      .subscribe((res) => {
        this.modal.close();
        this.refresh();
      },
      (error) => {
        console.log('Error')
        this.modalError = true;
        //this.modal.close();
      }
      );
    this.funding = {} as any;
  }
}
