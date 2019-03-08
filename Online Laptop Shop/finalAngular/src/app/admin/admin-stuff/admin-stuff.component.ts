import { Component, OnInit, TemplateRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AdminService } from '../../service/admin.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

@Component({
  selector: 'app-admin-stuff',
  templateUrl: './admin-stuff.component.html',
  styleUrls: ['./admin-stuff.component.css']
})
export class AdminStuffComponent implements OnInit {

  modal: BsModalRef;
  title:string;
  message: string;
  constructor(private adminService: AdminService,
    private modalService: BsModalService) { }

  ngOnInit() {
  }

  openModal(template: TemplateRef<any>) {
    this.modal = this.modalService.show(template);
  }

  onAddAdmin = (modal: TemplateRef<any>, form: NgForm) => {
    console.log('form value: ', form.value);

    this.adminService.addAddmin(form.value)
      .subscribe((res) => {
        // console.log(res);
        if (res) {
          this.title = "Done!";
          this.message = "Create another administrator complete.";
          this.openModal(modal);
          form.reset();
        } else {
          this.title = "Failed!";
          this.message = "This Admin is already exist!";
          this.openModal(modal);
          form.reset();
        }

      }, err => {
        console.log(err);
        // this.refresh();
      }
      )
  }

}
