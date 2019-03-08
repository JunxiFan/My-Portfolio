import { Component, OnInit, TemplateRef } from '@angular/core';
import { AccessoryModel } from '../../model/accessory.model';
// import { Modal } from 'ngx-modal';
import { NgForm } from '@angular/forms';

import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { AdminService } from '../../service/admin.service';

@Component({
  // moduleId: module.id.toString(),
  selector: 'app-admin-accesorry',
  templateUrl: './admin-accesorry.component.html',
  styleUrls: ['./admin-accesorry.component.css']
})
export class AdminAccesorryComponent implements OnInit {

  accs: AccessoryModel[];
  acc: AccessoryModel = {} as any;

  modal: BsModalRef;
  constructor(private modalService: BsModalService,
    private adminService: AdminService) { }

  clickSelect() {
    console.log('test click select');

  }

  ngOnInit() {
    this.refresh();

  }

  openModal(template: TemplateRef<any>) {
    this.modal = this.modalService.show(template);
  }

  refresh() {
    this.adminService.getAccs()
      .subscribe(
        (res) => {
          this.accs = res;
          console.log('accs: ', this.accs);
        }
      )
  }

  onAddAcc = (form: NgForm) => {

    console.log('form value: ', form.value);

    this.adminService.addAcc(form.value)
      .subscribe((res) => {
        // console.log(res);
        this.modal.hide();
        this.refresh();
        form.reset();
      }, err => {
        console.log(err);
        this.refresh();
      }
      )
  }

  editAcc = (acc: AccessoryModel, editModal: TemplateRef<any>) => {
    this.acc = acc;
    console.log('view: ', this.acc);
    this.modal = this.modalService.show(editModal);
  }

  onEditAcc(form: NgForm) {
    this.adminService.editAcc(this.acc._id, form.value)
      .subscribe((res) => {
        this.modal.hide();
        this.refresh();
        form.reset();
      }, (err) => {
        console.log(err);
        this.refresh();
      })
  }

  viewAcc = (acc: AccessoryModel, viewModal: TemplateRef<any>) => {
    this.acc = acc;
    console.log('view: ', this.acc);
    this.modal = this.modalService.show(viewModal);
  }

  delAcc = (acc: AccessoryModel, delModal: TemplateRef<any>) => {
    this.acc = acc;
    console.log(this.acc);
    this.modal = this.modalService.show(delModal);
  }

  onDelAcc() {
    this.adminService.deleteAcc(this.acc._id)
      .subscribe(res => {
        console.log(res);

        this.modal.hide();
        this.refresh();
      }
      )
  }




}
