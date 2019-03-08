import { Component, OnInit, TemplateRef } from '@angular/core';
import { AccessoryModel } from '../../model/accessory.model';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { AdminService } from '../../service/admin.service';
import { NgForm } from '@angular/forms';
import { LaptopModel } from '../../model/laptop.model';
import { CustomerService } from '../../service/customer.service';

@Component({
  selector: 'app-admin-laptop',
  templateUrl: './admin-laptop.component.html',
  styleUrls: ['./admin-laptop.component.css']
})
export class AdminLaptopComponent implements OnInit {

  cpus: AccessoryModel[] = [];
  graphs: AccessoryModel[] = [];
  laptops: LaptopModel[];
  laptop: LaptopModel = {} as any;

  searchBrand: string;

  modal: BsModalRef;
  constructor(private modalService: BsModalService,
    private adminService: AdminService,
    private custmerService: CustomerService,
  ) { }

  ngOnInit() {
    this.initCpusAndGraphs();
    this.refresh();

  }

  initCpusAndGraphs() {
    this.adminService.getAccs()
      .subscribe(
        res => {
          res.forEach(acc => {
            if (acc.accType == 'CPU') {
              this.cpus.push(acc);
            } else {
              this.graphs.push(acc);
            }
          });
          console.log('cpus: ', this.cpus);
          console.log('graphs: ', this.graphs);
        }
      )
  }

  refresh() {
    this.adminService.getLaps()
      .subscribe(
        (res) => {
          this.laptops = res;
          // console.log('laptops: ', this.laptops);
        }
      )
  }

  openModal(template: TemplateRef<any>) {
    this.modal = this.modalService.show(template);
  }

  onAddLap(form: NgForm) {
    console.log('form value: ', form.value.lapName);

    this.adminService.addLap(form.value)
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

  editLap = (laptop: LaptopModel, editModal: TemplateRef<any>) => {
    this.laptop = laptop;
    console.log('edit: ', this.laptop);
    this.modal = this.modalService.show(editModal);
  }

  onEditLap(form: NgForm) {
    this.adminService.editLap(this.laptop._id, form.value)
      .subscribe((res) => {
        this.modal.hide();
        this.refresh();
        form.reset();
      }, (err) => {
        console.log(err);
        this.refresh();
      })
  }

  viewLap = (laptop: LaptopModel, viewModal: TemplateRef<any>) => {
    this.laptop = laptop;
    console.log('view: ', this.laptop);
    this.modal = this.modalService.show(viewModal);
  }

  delLap = (laptop: LaptopModel, delModal: TemplateRef<any>) => {
    this.laptop = laptop;
    console.log(this.laptop);
    this.modal = this.modalService.show(delModal);
  }

  onDelLap() {
    this.adminService.deleteLap(this.laptop._id)
      .subscribe(res => {
        console.log(res);

        this.modal.hide();
        this.refresh();
      }
      )
  }

  searchLapByBrand(form: NgForm) {
    console.log('brand: ', form.value);

    this.custmerService.findLapByBrand(form.value.searchBrand)
      .subscribe(res => {
        this.laptops = res;
      }, err => {
        console.log(err);
        this.refresh();
      })
  }


}
