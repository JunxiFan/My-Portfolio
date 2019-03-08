import { Component, OnInit } from '@angular/core';
import { NgModel, NgForm } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';

import { RoleService } from './role.service';
import { SearchService } from './../../itunes/itunes.service';


import { Role } from './role.model';
import { SearchItem } from './../../itunes/itunes.model';

import {Modal} from 'ngx-modal'

import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';



@Component({
  moduleId: module.id.toString(),  
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.css'],
})
export class RoleComponent implements OnInit {


  roles:  Role[];
  role:   Role ={} as any;
  modal:  Modal;
  modalError = false;
  addEnabled: boolean = false;

  results: Observable<SearchItem[]>;
  addRoleCheckbox: NgModel;

  searchField: FormControl; //[formControl]="searchField"


  constructor(private roleService: RoleService,private router: Router) {
   
  }

  ngOnInit() {
    this.refreshRole();
  }

  toggleAdd = () => {
    this.addEnabled = !this.addEnabled;
  };



  onSubmit = (myForm: NgForm) => {
    //console.log(myForm.value);
    this.roleService.addRole(myForm.value)
      .subscribe((res) => {
        console.log(res);
        this.refreshRole();
        this.toggleAdd();
        myForm.reset();
      },
      (err) => {
        console.log(err);
        this.refreshRole();
      }
      );
  }

  editRole = (value: Role,modal: Modal) => {
    console.log(value);
    this.role = new Role(value.roleId,value.roleName,value.roleDesc);
    this.modal = modal;
    this.modal.open();    
  }

  deleteRole = (value: Role,modal: Modal) => {
    console.log(value);
    this.role = new Role(value.roleId,value.roleName,value.roleDesc);
    this.modal = modal;
    this.modal.open();    
  }

  onDelete = () => {
    console.log(this.role);
    this.roleService.deleteRole(this.role)
      .subscribe((res) => {
        console.log(res);
        this.modal.close();
        this.refreshRole();
      });
  }

  onEdit = () => {
    this.roleService.editRole(this.role)
    .catch(
      (error)=>{
        console.log('testing');
   // this.notifyService.popError();
    return Observable.throw(error);
}
    )
    .subscribe((res) => {
      this.modal.close();      
      this.refreshRole();
    },
    (error)=>{
      console.log('Error')
     this.modalError = true;
      //this.modal.close();
    }
  );
    this.role={} as any;
  }

  refreshRole = () => {
    this.roleService.getRoles()
      .subscribe(
      (roles) => {
        this.roles = roles;
      }
      );
  }

  viewRoleUsers = (value:Role) =>{
    console.log('Viewing User')
    // this.router.navigate(['/role'+role.roleId+'/user'],{ queryParams: { roleName: role.roleName } });
    this.router.navigate(['/role',value.roleId,'user'],{ queryParams: { roleName: value.roleName } });
  }
}