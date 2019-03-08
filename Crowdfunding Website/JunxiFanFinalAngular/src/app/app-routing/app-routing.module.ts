import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule} from '@angular/router';
import { AuthGaurdService,Role } from './../auth/auth.gaurd';

import { RoleComponent } from './../admin/role/role.component';
import { RegistrationComponent } from './../admin/registration/registration.component';
import { AdminHomeComponent } from './../admin/admin-home/admin-home.component';
import { LoginComponent } from './../login/login.component';
import { UserRoleComponent } from './../admin/user-role/user-role.component'

// imports 
import {Routes}from '@angular/router';
import { CategoryComponent } from '../admin/category/category.component';
import { IdeaComponent } from '../idea/idea.component';
import { FundingComponent } from '../funding/funding.component';
import { UsersComponent } from '../users/users.component';
import { FunderIdeaComponent } from '../funder/funder-idea/funder-idea.component';
import { FunderFundingComponent } from '../funder/funder-funding/funder-funding.component';
import { CartComponent } from '../funder/cart/cart.component';
import { MyideaComponent } from '../creator/myidea/myidea.component';
import { StartupServiceComponent } from '../startup/startup-service/startup-service.component';
import { MyserviceComponent } from '../creator/myservice/myservice.component';
import { AdminServiceComponent } from '../admin/admin-service/admin-service.component';
import { StartupBidComponent } from '../startup/startup-bid/startup-bid.component';
import { ReportComponent } from '../startup/report/report.component';


const routes: Routes = [
  {path: 'home', component: AdminHomeComponent, canActivate:[AuthGaurdService],data:{role:Role.Admin} },
  {path: 'category', component: CategoryComponent , canActivate:[AuthGaurdService],data:{role:Role.Admin} },
  {path: 'users', component: UsersComponent , canActivate:[AuthGaurdService],data:{role:Role.Admin} },

  {path: 'funder/idea', component: FunderIdeaComponent , canActivate:[AuthGaurdService],data:{role:[Role.Funder]} },
  {path: 'cart', component: CartComponent , canActivate:[AuthGaurdService],data:{role:Role.Funder} },

  {path: 'role', component: RoleComponent , canActivate:[AuthGaurdService],data:{role:Role.Admin} },
  {path: 'login', component:LoginComponent,data:{role:Role.Guest}  },  
  // {path: 'role/:id/user',component:UserRoleComponent,canActivate:[AuthGaurdService],data:{
  //                                   role:[
  //                       Role.Admin,Role.Startup]}
  //                     },
  {path: 'role/:id/user',component:UserRoleComponent,canActivate:[AuthGaurdService],data:{role:Role.Admin}},
  {path: 'cate/:cateId/idea',component:IdeaComponent,canActivate:[AuthGaurdService],data:{role:Role.Admin}},
  {path: 'idea/:ideaId/funding',component:FundingComponent,canActivate:[AuthGaurdService],data:{role:Role.Admin}},
  {path: 'admin/idea/:ideaId/service',component:AdminServiceComponent,canActivate:[AuthGaurdService],data:{role:Role.Admin}},
  

  {path: 'funder/idea/:ideaId/funding',component:FunderFundingComponent,canActivate:[AuthGaurdService],data:{role:Role.Funder}},

  // creator
  {path: 'creator/idea', component: FunderIdeaComponent , canActivate:[AuthGaurdService],data:{role:[Role.Creator]} },
  {path: 'creator/idea/:ideaId/funding',component:FunderFundingComponent,canActivate:[AuthGaurdService],data:{role:Role.Creator}},
  {path: 'creator/myidea', component: MyideaComponent , canActivate:[AuthGaurdService],data:{role:[Role.Creator]} },
  {path: 'creator/myservice', component: MyserviceComponent , canActivate:[AuthGaurdService],data:{role:[Role.Creator]} },
  {path: 'creator/idea/:ideaId/service',component:StartupServiceComponent,canActivate:[AuthGaurdService],data:{role:Role.Creator}},
  {path: 'creator/service/:servId/bid',component:MyserviceComponent,canActivate:[AuthGaurdService],data:{role:Role.Creator}},
  {path: 'creator/bid/:bidId/report',component:ReportComponent,canActivate:[AuthGaurdService],data:{role:Role.Creator}},
  
  //startup
  {path: 'startup/mybid', component: StartupBidComponent , canActivate:[AuthGaurdService],data:{role:[Role.Startup]} },
  {path: 'startup/idea', component: FunderIdeaComponent , canActivate:[AuthGaurdService],data:{role:[Role.Startup]} },
  {path: 'startup/idea/:ideaId/service',component:StartupServiceComponent,canActivate:[AuthGaurdService],data:{role:Role.Startup}},
  {path: 'startup/bid/:bidId/report',component:ReportComponent,canActivate:[AuthGaurdService],data:{role:Role.Startup}},
  
  
  {path: 'register', component: RegistrationComponent,data:{role:Role.Guest}  },
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: '**', component: LoginComponent}
];


@NgModule({
  imports: [
    RouterModule.forRoot(routes,{useHash: true}),    
    CommonModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
