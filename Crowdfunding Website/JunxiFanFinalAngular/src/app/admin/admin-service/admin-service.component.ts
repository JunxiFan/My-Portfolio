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
import { Service } from '../../creator/myidea/service.model';

import { FunderService } from '../../funder/funder-idea/funder.service';
import { StartupService } from '../../startup/startup.service';
import { Bid } from '../../startup/startup-service/bid.model';

@Component({
  moduleId: module.id.toString(),
  selector: 'app-admin-service',
  templateUrl: './admin-service.component.html',
  styleUrls: ['./admin-service.component.css']
})
export class AdminServiceComponent implements OnInit {

  services: Service[];
  service: Service = {} as any;
  bid: Bid = {} as any;

  username: string;
  userId: number;
  suId: number;
  bidServId: any;

  modal: Modal;
  modalError = false;
  addEnabled: boolean = false;
  results: Observable<SearchItem[]>;
  // addRoleCheckbox: NgModel;
  searchField: FormControl;


  //传来的值
  public ideaIdString: string;
  private routeParamSub: any;


  constructor(private funderService: FunderService, private fundingService: FundingService, private route: ActivatedRoute,
    private router: Router, private messageService: MessageService, private startupService: StartupService) { }

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
      });
    //获得suid

    this.refresh()
  }

  toggleAdd = () => {
    this.addEnabled = !this.addEnabled;
  };

  isStartup = () => {
    if (AppSettings.role == Role.Startup) {
      return true;
    }
    return false;
  };

  isCreator = () => {
    if (AppSettings.role == Role.Creator) {
      return true;
    }
    return false;
  };

  isAdmin = () => {
    if (AppSettings.role == Role.Admin) {
      return true;
    }
    return false;
  };

  refresh = () => {
    this.startupService.getEveryService(this.ideaIdString)
      .subscribe(
      (fundings) => {
        this.services = fundings;
      }
      );

  }

  createBid = (value: Service, modal: Modal) => {
    console.log(value);
    this.service = value;
    this.bidServId = value.servId;
    this.modal = modal;
    this.modal.open();

    this.startupService.getSuIdByUserId(this.userId)
      .subscribe(
      (suId) => {
        this.suId = suId;
      });
  }

  onCreateBid = (myForm: NgForm) => {
    console.log(myForm.value);
    this.startupService.createBid(this.bidServId, this.suId, myForm.value)
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
  }

  creatorViewServiceBid = (value: Service) => {
    console.log('Viewing fundings')
    // this.router.navigate(['/role'+role.roleId+'/user'],{ queryParams: { roleName: role.roleName } });
    this.router.navigate(['/creator/service', value.servId, 'bid']);
    // funder/idea/:ideaId/funding
  }


}
