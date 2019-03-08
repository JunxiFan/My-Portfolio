import { Component, OnInit } from '@angular/core';

import { Modal } from 'ngx-modal';
import { SearchItem } from './../itunes/itunes.model';
import { Observable } from 'rxjs/Observable';
import { NgModel, NgForm } from '@angular/forms';
import { FormControl } from '@angular/forms';

import { Router } from '@angular/router';

import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';

import { UserService } from './user.service';
import { User } from './user.model';
import { RegistrationService } from '../admin/registration/registration.service';

@Component({
  moduleId: module.id.toString(),
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users: User[];
  user: User = {} as any;
  modal: Modal;
  modalError = false;
  addEnabled: boolean = false;

  results: Observable<SearchItem[]>;
  // addRoleCheckbox: NgModel;

  searchField: FormControl;
  creatorNameForSearch: string;
  suCompNameForSearch:string;


  constructor(private userService: UserService, private router: Router, private regisService:RegistrationService) { }

  ngOnInit() {
    this.refreshUser();
  }

  toggleAdd = () => {
    this.addEnabled = !this.addEnabled;
  };

  refreshUser = () => {
    this.userService.viewUserList()
      .subscribe(
      (cates) => {
        this.users = cates;
      }
      );
  }

  userRegister = (myForm: NgForm, modal:Modal) => {
    //console.log(myForm.value);
    this.regisService.registerAsAdmin(myForm.value)
      .subscribe((res) => {
        console.log(res);
        this.modal = modal;
        this.modal.open();
        this.toggleAdd();
        this.refreshUser();
        myForm.reset;
      },
      (err) => {
        console.log(err);
      }
      );
  }


  getInactiveCreators= () => {
    this.userService.getInactiveCreators()
      .subscribe(
      (cates) => {
        this.users = cates;
      }
      );
  }

  getDishonestStartups= () => {
    this.userService.getDishonestStartups()
      .subscribe(
      (cates) => {
        this.users = cates;
      }
      );
  }


  disableCreator = (value: User, modal: Modal) => {
    console.log(value);
    this.user = new User(value.userId, value.roleId, value.username, value.name, value.createdOn, value.userStatus);
    this.modal = modal;
    this.modal.open();
  }

  onDisableCreator = () => {
    this.userService.disableCreator(this.user)
      .catch(
      (error) => {
        console.log('testing');
        // this.notifyService.popError();
        return Observable.throw(error);
      }
      )
      .subscribe((res) => {
        this.modal.close();
        this.refreshUser();
      },
      (error) => {
        console.log('Error')
        this.modalError = true;
        //this.modal.close();
      }
      );
    this.user = {} as any;
  }

  disableStartup = (value: User, modal: Modal) => {
    console.log(value);
    this.user = new User(value.userId, value.roleId, value.username, value.name, value.createdOn, value.userStatus);
    this.modal = modal;
    this.modal.open();
  }

  onDisableStartup = () => {
    this.userService.disableStartup(this.user)
      .catch(
      (error) => {
        console.log('testing');
        // this.notifyService.popError();
        return Observable.throw(error);
      }
      )
      .subscribe((res) => {
        this.modal.close();
        this.refreshUser();
      },
      (error) => {
        console.log('Error')
        this.modalError = true;
        //this.modal.close();
      }
      );
    this.user = {} as any;
  }

  enableCreator = (value: User) => {
    this.user = new User(value.userId, value.roleId, value.username, value.name, value.createdOn, value.userStatus);

    this.userService.enableCreator(this.user)
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
        this.refreshUser();
      }
      );
    this.user = {} as any;

  }

  enableStartup = (value: User) => {
    this.user = new User(value.userId, value.roleId, value.username, value.name, value.createdOn, value.userStatus);

    this.userService.enableStartup(this.user)
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
        this.refreshUser();
      }
      );
    this.user = {} as any;

  }

  deleteCreator = (value: User, modal: Modal) => {
    console.log(value);
    this.user = new User(value.userId, value.roleId, value.username, value.name, value.createdOn, value.userStatus);
    this.modal = modal;
    this.modal.open();
  }

  onDeleteCreator = () => {
    console.log(this.user);
    this.userService.deleteCreator(this.user)
      .subscribe((res) => {
        console.log(res);
        this.modal.close();
        this.refreshUser();
      });
  }

  deleteStartup = (value: User, modal: Modal) => {
    console.log(value);
    this.user = new User(value.userId, value.roleId, value.username, value.name, value.createdOn, value.userStatus);
    this.modal = modal;
    this.modal.open();
  }

  onDeleteStartup = () => {
    console.log(this.user);
    this.userService.deleteStartup(this.user)
      .subscribe((res) => {
        console.log(res);
        this.modal.close();
        this.refreshUser();
      });
  }

  
  searchCreatorByName = (searchForm: NgForm) => {
    this.userService.searchCreatorByName(this.creatorNameForSearch)
      .subscribe((users) => {
        console.log(users);
        this.users=users;
        searchForm.reset();
      },
      (err) => {
        console.log("Error!");
        this.users = [];
        this.refreshUser();
      }
      )
  }

  searchStartupByName = (searchSuForm: NgForm) => {
    this.userService.searchStartupByName(this.suCompNameForSearch)
      .subscribe((users) => {
        console.log(users);
        this.users=users;
        searchSuForm.reset();
      },
      (err) => {
        console.log("Error!");
        this.users = [];
        this.refreshUser();
      }
      )
  }

}
