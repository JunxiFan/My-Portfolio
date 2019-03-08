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
import { FunderService } from './funder.service';
import { AppSettings } from '../../app.setting';
import { Role } from '../../auth/auth.gaurd';
import { IdeaService } from '../../idea/idea.service';
import { MessageService } from '../../messages/data.service';
import { StartupService } from '../../startup/startup.service';


@Component({
  moduleId: module.id.toString(),
  selector: 'app-funder-idea',
  templateUrl: './funder-idea.component.html',
  styleUrls: ['./funder-idea.component.css']
})
export class FunderIdeaComponent implements OnInit {

  ideas: Idea[];
  idea: Idea = {} as any;
  modalError = false;
  addEnabled: boolean = false;
  modal: Modal;

  username: string;
  userId: any;

  suCateId: any;

  results: Observable<SearchItem[]>;
  // addRoleCheckbox: NgModel;

  searchField: FormControl;
  cateIdForSearch: string;
  // suCompNameForSearch:string;


  constructor(private funderService: FunderService, private router: Router, private ideaService: IdeaService,
    private messageService: MessageService, private startupService: StartupService) { }

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
        
        this.ngOninitThen();
        
      });
    

  }

  ngOninitThen = () => {
    //获得该startup的cateId
    if(this.isStartup){
      this.startupService.getCateIdByUserId(this.userId)
      .subscribe(
      (cateId) => {
        this.suCateId = cateId;
        this.refresh(this.suCateId);
      });
    }
    
  };

  toggleAdd = () => {
    this.addEnabled = !this.addEnabled;
  };


  isCreator = () => {
    if (AppSettings.role == Role.Creator) {
      return true;
    }
    return false;
  };

  isFunder = () => {
    if (AppSettings.role == Role.Funder) {
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

  refresh = (value: string) => {
    this.funderService.getNewIdeasByCateId(value)
      .subscribe(
      (ideas) => {
        this.ideas = ideas;
      }
      );
  }

  getNewIdeasByCateId = (searchForm: NgForm) => {
    this.funderService.getNewIdeasByCateId(this.cateIdForSearch)
      .subscribe((ideas) => {
        console.log(ideas);
        this.ideas = ideas;

      },
      (err) => {
        console.log("Error!");
        this.ideas = [];
      }
      )
  }

  creatorViewIdeaFunding = (value: Idea) => {
    console.log('Viewing fundings')
    // this.router.navigate(['/role'+role.roleId+'/user'],{ queryParams: { roleName: role.roleName } });
    this.router.navigate(['/creator/idea', value.ideaId, 'funding']);
    // funder/idea/:ideaId/funding
  }

  funderViewIdeaFunding = (value: Idea) => {
    console.log('Viewing fundings')
    // this.router.navigate(['/role'+role.roleId+'/user'],{ queryParams: { roleName: role.roleName } });
    this.router.navigate(['/funder/idea', value.ideaId, 'funding']);
    // funder/idea/:ideaId/funding
  }

  addIdea = (myForm: NgForm, modal: Modal) => {
    console.log(myForm.value);
    this.ideaService.addIdea(this.userId, myForm.value)
      .subscribe((res) => {
        console.log(res);
        this.modal = modal;
        this.modal.open();
        this.toggleAdd();
        myForm.reset();

      },
      (err) => {
        console.log(err);
      }
      );
  }

  suViewIdeaService = (value: Idea) => {
    console.log('Viewing fundings')
    // this.router.navigate(['/role'+role.roleId+'/user'],{ queryParams: { roleName: role.roleName } });
    this.router.navigate(['/startup/idea', value.ideaId, 'service']);
    // funder/idea/:ideaId/funding
  }

}
