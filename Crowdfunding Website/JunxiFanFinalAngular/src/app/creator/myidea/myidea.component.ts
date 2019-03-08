import { Component, OnInit } from '@angular/core';

import { Modal } from 'ngx-modal';
import { SearchItem } from './../../itunes/itunes.model';
import { Observable } from 'rxjs/Observable';
import { NgModel, NgForm } from '@angular/forms';
import { FormControl } from '@angular/forms';

import { Router } from '@angular/router';

import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';
import { Idea } from '../../idea/idea.model';
import { AppSettings } from '../../app.setting';
import { Role } from '../../auth/auth.gaurd';
import { IdeaService } from '../../idea/idea.service';
import { MessageService } from '../../messages/data.service';
import { FunderService } from '../../funder/funder-idea/funder.service';
import { Service } from './service.model';
import { CreatorService } from '../creator.service';
import { Funding } from '../../funding/funding.model';

@Component({
  moduleId: module.id.toString(),
  selector: 'app-myidea',
  templateUrl: './myidea.component.html',
  styleUrls: ['./myidea.component.css']
})
export class MyideaComponent implements OnInit {
  ideas: Idea[];
  idea: Idea = {} as any;
  modalError = false;
  addEnabled: boolean = false;
  modal: Modal;
  service: Service = {} as any;
  ideaId: any;
  funding:Funding={} as any;

  username: string;
  userId: any;

  results: Observable<SearchItem[]>;

  constructor(private funderService: FunderService, private router: Router, private ideaService: IdeaService,
    private messageService: MessageService, private creatorService: CreatorService) { }

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

  isCreator = () => {
    if (AppSettings.role == Role.Creator) {
      return true;
    }
    return false;
  };

  refresh = () => {
    this.ideaService.getIdeaByUserId(this.userId)
      .subscribe(
      (ideas) => {
        this.ideas = ideas;
      }
      );
  }

  getDyingIdea = () => {
    this.ideaService.getDyingIdea(this.userId)
      .subscribe(
      (ideas) => {
        this.ideas = ideas;
      }
      );
  }

  creatorViewIdeaFunding = (value: Idea) => {
    console.log('Viewing fundings')
    // this.router.navigate(['/role'+role.roleId+'/user'],{ queryParams: { roleName: role.roleName } });
    this.router.navigate(['/creator/idea', value.ideaId, 'funding']);
    // funder/idea/:ideaId/funding
  }

  createService = (value: Idea, modal: Modal) => {
    console.log(value);
    this.ideaId = value.ideaId;
    this.modal = modal;
    this.modal.open();
  }

  onCreateService = (myForm: NgForm) => {
    console.log(myForm.value);
    this.creatorService.createService(this.ideaId, myForm.value)
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
    this.ideaId = null;
  }

  creatorViewIdeaService= (value: Idea) => {
    console.log('Viewing fundings')
    // this.router.navigate(['/role'+role.roleId+'/user'],{ queryParams: { roleName: role.roleName } });
    this.router.navigate(['/creator/idea', value.ideaId, 'service']);
    // funder/idea/:ideaId/funding
  }

  createFunding = (value: Idea, modal: Modal) => {
    console.log(value);
    this.ideaId = value.ideaId;
    this.modal = modal;
    this.modal.open();
  }

  onCreateFunding= (myForm: NgForm) => {
    console.log(myForm.value);
    this.creatorService.createFunding(this.ideaId, myForm.value)
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
    this.ideaId = null;
  }

}
