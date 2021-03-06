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
import { MessageService } from '../../messages/data.service';
import { AppSettings } from '../../app.setting';
import { Role } from '../../auth/auth.gaurd';
import { FunderService } from '../../funder/funder-idea/funder.service';
import { StartupService } from '../../startup/startup.service';
import { Bid } from '../../startup/startup-service/bid.model';
import { CreatorService } from '../../creator/creator.service';
import { Report } from './report.model';

@Component({
  moduleId: module.id.toString(),
  selector: 'app-startup-bid',
  templateUrl: './startup-bid.component.html',
  styleUrls: ['./startup-bid.component.css']
})
export class StartupBidComponent implements OnInit {

  bids: Bid[];
  bid: Bid = {} as any;

  username: string;
  userId: any;
  suId: any;

  report: Report = {} as any;
  bidIdForReport: number;


  modal: Modal;
  modalError = false;
  addEnabled: boolean = false;
  results: Observable<SearchItem[]>;
  // addRoleCheckbox: NgModel;
  searchField: FormControl;

  //传来的值
  public servId: string;
  private routeParamSub: any;

  constructor(private funderService: FunderService, private fundingService: FundingService, private route: ActivatedRoute,
    private router: Router, private messageService: MessageService, private startupService: StartupService,
    private creatorService: CreatorService) { }


  ngOnInit() {
    // 将ideaId传给ideaIdString
    this.routeParamSub = this.route.params.subscribe(params => {
      this.servId = params["servId"];
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
        this.getSuId();
        this.refresh();
      });

  }

  isCreator = () => {
    if (AppSettings.role == Role.Creator) {
      return true;
    }
    return false;
  };

  isStartup = () => {
    if (AppSettings.role == Role.Startup) {
      return true;
    }
    return false;
  };


  refresh = () => {

    this.startupService.getSelectedBidByUserId(this.userId)
      .subscribe(
      (bids) => {
        this.bids = bids;
      }
      );
  }

  getSuId = () => {
    this.startupService.getSuIdByUserId(this.userId)
      .subscribe(
      (suId) => {
        this.suId = suId;
      });
  }

  getBidIndanger = () => {
    // this.startupService.getSuIdByUserId(this.userId)
    // .subscribe(
    // (suId) => {
    //   this.suId = suId;
    // });


    this.startupService.getBidIndanger(this.suId)
      .subscribe(
      (cates) => {
        this.bids = cates;
      }
      );
  }

  selectBid = (bid: Bid) => {
    this.creatorService.selectBid(bid.bidId)
      .catch(
      (error) => {
        console.log('testing');
        // this.notifyService.popError();
        return Observable.throw(error);
      }
      )
      .subscribe(
      (res) => {
        console.log(res)
        this.refresh();
      }
      );
    this.bid = {} as any;
  }

  writeReport = (value: Bid, modal: Modal) => {
    console.log(value);
    this.bidIdForReport = value.bidId;
    this.modal = modal;
    this.modal.open();
  }

  onWriteReport = (myForm: NgForm) => {
    console.log(myForm.value);
    this.startupService.writeReport(this.bidIdForReport, myForm.value)
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
    this.bid = {} as any;
    this.bidIdForReport = null;
  }

  isSelected = (bid: Bid) => {
    if (bid.bidStatus == "selected") {
      return true;
    }
    return false;

  }

  viewReport = (value: Bid) => {
    console.log('Viewing fundings')
    // this.router.navigate(['/role'+role.roleId+'/user'],{ queryParams: { roleName: role.roleName } });
    this.router.navigate(['/startup/bid', value.bidId, 'report']);
    // funder/idea/:ideaId/funding
  }

}
