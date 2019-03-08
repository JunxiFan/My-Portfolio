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
import { Report } from '../startup-bid/report.model';

@Component({
  moduleId: module.id.toString(),
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {

  reports:Report[];
report:Report={}as any;

//传来的值
public bidId :string;
private routeParamSub: any;

constructor(private funderService: FunderService, private fundingService: FundingService, private route: ActivatedRoute,
  private router: Router, private messageService: MessageService, private startupService: StartupService) { }

  ngOnInit() {
    // bidId传值
    this.routeParamSub = this.route.params.subscribe(params => {
      this.bidId = params["bidId"];
    });

    this.refresh();
  }

  refresh = () => {
    this.startupService.getReportByBidId(this.bidId)
      .subscribe(
      (reports) => {
        this.reports = reports;
      }
      );

  }

}
