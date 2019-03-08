import { Component, OnInit } from '@angular/core';
import { Category } from './category.model';
import { Modal } from 'ngx-modal';
import { SearchItem } from './../../itunes/itunes.model';
import { Observable } from 'rxjs/Observable';
import { NgModel, NgForm } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { CategoryService } from './category.service';
import { Router } from '@angular/router';

import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';

@Component({
  moduleId: module.id.toString(),
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  cates: Category[];
  cate: Category = {} as any;
  modal: Modal;
  modalError = false;
  addEnabled: boolean = false;

  results: Observable<SearchItem[]>;
  // addRoleCheckbox: NgModel;

  searchField: FormControl;


  constructor(private cateService: CategoryService, private router: Router) { }

  ngOnInit() {
    this.refreshCate();
  }

  toggleAdd = () => {
    this.addEnabled = !this.addEnabled;
  };

  refreshCate = () => {
    this.cateService.viewCates()
      .subscribe(
      (cates) => {
        this.cates = cates;
      }
      );
  }

  onSubmit = (myForm: NgForm) => {
    //console.log(myForm.value);
    this.cateService.addCate(myForm.value)
      .subscribe((res) => {
        console.log(res);
        this.refreshCate();
        this.toggleAdd();
        myForm.reset();
      },
      (err) => {
        console.log(err);
        this.refreshCate();
      }
      );
  }

  editCate = (value: Category, modal: Modal) => {
    console.log(value);
    this.cate = new Category(value.cateId, value.cateName, value.cateDesc);
    this.modal = modal;
    this.modal.open();
  }

  onEdit = () => {
    this.cateService.editCate(this.cate)
      .catch(
      (error) => {
        console.log('testing');
        // this.notifyService.popError();
        return Observable.throw(error);
      }
      )
      .subscribe((res) => {
        this.modal.close();
        this.refreshCate();
      },
      (error) => {
        console.log('Error')
        this.modalError = true;
        //this.modal.close();
      }
      );
    this.cate = {} as any;
  }

  deleteCate = (value: Category,modal: Modal) => {
    console.log(value);
    this.cate = new Category(value.cateId,value.cateName,value.cateDesc);
    this.modal = modal;
    this.modal.open();    
  }

  onDelete = () => {
    console.log(this.cate);
    this.cateService.deleteCate(this.cate)
      .subscribe((res) => {
        console.log(res);
        this.modal.close();
        this.refreshCate();
      });
  }

  disableCate = (value: Category,modal: Modal) => {
    console.log(value);
    this.cate = new Category(value.cateId,value.cateName,value.cateDesc,value.cateStatus);
    this.modal = modal;
    this.modal.open();    
  }

  onDisable = () => {
    this.cateService.disableCate(this.cate)
      .catch(
      (error) => {
        console.log('testing');
        // this.notifyService.popError();
        return Observable.throw(error);
      }
      )
      .subscribe((res) => {
        this.modal.close();
        this.refreshCate();
      },
      (error) => {
        console.log('Error')
        this.modalError = true;
        //this.modal.close();
      }
      );
    this.cate = {} as any;
  }

  viewCateIdeas = (value:Category) =>{
    console.log('Viewing Ideas')
    // this.router.navigate(['/role'+role.roleId+'/user'],{ queryParams: { roleName: role.roleName } });
    this.router.navigate(['/cate',value.cateId,'idea']);
  }

}
