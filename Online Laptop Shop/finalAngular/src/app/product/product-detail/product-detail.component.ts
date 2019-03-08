import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LaptopModel } from '../../model/laptop.model';
import { CustomerService } from '../../service/customer.service';
import { AccessoryModel } from '../../model/accessory.model';
import { NgForm } from '@angular/forms';
import { ItemModel } from '../../model/item.model';
import { Cookie } from 'ng2-cookies/ng2-cookies';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  laptop: LaptopModel = {} as any;
  lapId: any;

  //用来展示在页面上的配置的string
  specsString = [];
  //用来保存配置组合的list
  specsList = [];
  //同名的laptop
  sameLaptops: LaptopModel[];

  selectedNum: number;

  private routeParamSub: any;
  constructor(private route: ActivatedRoute,
    private customerService: CustomerService) { }

  ngOnInit() {
    this.getLapIdFromUrl();
    this.findLapById(this.lapId)
  }

  getLapIdFromUrl() {
    this.routeParamSub = this.route.params.subscribe(params => {
      this.lapId = params["lapId"];
      console.log(this.lapId)
    })
  }

  findLapById(lapId: string) {
    this.customerService.findLapById(lapId)
      .subscribe(res => {
        this.laptop = res;
        this.findSameLaptops(this.laptop.lapName);
      }, err => {
        console.log(err);

      })
  }

  findSameLaptops(name) {
    this.customerService.findLapByName(name)
      .subscribe(res => {
        // console.log('sameLaptops: ' + res);
        this.sameLaptops = res;
        res.forEach(element => {
          this.specsString.push(element.lapCPU + ' ,  ' + element.lapGraph)
          this.specsList.push([element.lapCPU, element.lapGraph]);
        });
        // console.log('first----cpu: ', this.specsList[1][0], '  graph: ', this.specsList[1][1]);
      })
  }

  //根据所选择的laptop更新laptop
  updateLaptop(i) {
    console.log('i-------', i);
    let name = this.laptop.lapName;
    let cpu = this.specsList[i][0];
    let graph = this.specsList[i][1];
    console.log(name, cpu, graph);

    this.customerService.findLapBySpec(name, cpu, graph)
      .subscribe(res => {
        this.laptop = res;
        console.log("updated laptop:  ", this.laptop);
      })
  }

  addToCart(form: NgForm) {
    console.log(form.value);

    if (Cookie.get('role') === 'Customer') {
      let item = new ItemModel(
        this.laptop._id,
        this.laptop.lapName,
        this.laptop.lapPrice,
        Cookie.get('username'),
        form.value.amount,
        this.laptop.lapCPU,
        this.laptop.lapGraph,
        'unpaid'
      );
      this.customerService.addToCart(item)
        .subscribe(res => {
          console.log(res);
          alert('Add to Cart succeed!')
        })

    } else {
      alert('Please login first!')
    }


  }

}
