import { Component, OnInit } from '@angular/core';

import { Modal } from 'ngx-modal';
import { SearchItem } from './../itunes/itunes.model';
import { Observable } from 'rxjs/Observable';
import { NgModel, NgForm } from '@angular/forms';
import { FormControl } from '@angular/forms';

import { Router,ActivatedRoute } from '@angular/router';


import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';
import { Idea } from './idea.model';
import { IdeaService } from './idea.service';

@Component({
  moduleId: module.id.toString(),
  selector: 'app-idea',
  templateUrl: './idea.component.html',
  styleUrls: ['./idea.component.css']
})
export class IdeaComponent implements OnInit {

  ideas: Idea[];
  idea: Idea = {} as any;

  modal: Modal;
  modalError = false;
  addEnabled: boolean = false;
  results: Observable<SearchItem[]>;
  // addRoleCheckbox: NgModel;
  searchField: FormControl;

  //传来的值
  public cateIdString: string;
  private routeParamSub: any;



  constructor(private ideaService: IdeaService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.routeParamSub = this.route.params.subscribe(params => {
      this.cateIdString = params["cateId"];
    });


    this.refreshIdea();
  }

  toggleAdd = () => {
    this.addEnabled = !this.addEnabled;
  };

  refreshIdea = () => {
    this.ideaService.viewIdeasByCateIdAdmin(this.cateIdString)
      .subscribe(
      (ideas) => {
        this.ideas = ideas;
      }
      );
  }

  disableIdea= (idea:Idea) => {
    this.ideaService.disableIdea(idea)
    .catch(
      (error) => {
        console.log('testing');
        // this.notifyService.popError();
        return Observable.throw(error);
      }
      )
      .subscribe((res) => {
        this.refreshIdea();
      },
      (error) => {
        console.log(error)

      }
      );
  }



  viewIdeaFunding = (value:Idea) =>{
    console.log('Viewing fundings')
    // this.router.navigate(['/role'+role.roleId+'/user'],{ queryParams: { roleName: role.roleName } });
    this.router.navigate(['/idea',value.ideaId,'funding']);
  }
 
  viewIdeaService= (value: Idea) => {
    console.log('Viewing fundings')
    // this.router.navigate(['/role'+role.roleId+'/user'],{ queryParams: { roleName: role.roleName } });
    this.router.navigate(['/admin/idea', value.ideaId, 'service']);
    // funder/idea/:ideaId/funding
  }

}
