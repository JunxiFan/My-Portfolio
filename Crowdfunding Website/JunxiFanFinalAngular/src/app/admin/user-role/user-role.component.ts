import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-role',
  templateUrl: './user-role.component.html',
  styleUrls: ['./user-role.component.css']
})
export class UserRoleComponent implements OnInit {

  public roleId:number;
  public roleName:string;
  private routeParamSub:any;
  private routeQueryParamSub:any;
  

  constructor( private route: ActivatedRoute,
    private router: Router ) { }

  ngOnInit() {
    this.routeParamSub = this.route
        .params.subscribe(params => {
      this.roleId = +params['id']; // (+) converts string 'id' to a number

      // In a real app: dispatch action to load the details here.
   });

   this.routeQueryParamSub = this.route
   .queryParams.subscribe(params => {
    this.roleName = params['roleName']; 
});
  }

  ngOnDestroy() {
    this.routeParamSub.unsubscribe();
    this.routeQueryParamSub.unsubscribe();
  }

}
