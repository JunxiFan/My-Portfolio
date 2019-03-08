import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

import { FormsModule } from '@angular/forms';//ngModel,ngForm
import { ReactiveFormsModule } from '@angular/forms';//formController
// import { ModalModule } from 'ngx-modal';
import { Http, HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { HomepageComponent } from './homepage/homepage.component';
import { LoginService } from './service/login.service';
import { MessageService } from './message/message.service';
import { AdminHomeComponent } from './admin/admin-home/admin-home.component';
// import {Cookie} from "ng2-cookies/ng2-cookies";
import { AuthGuard } from './guard/auth.guard';
import { AdminLaptopComponent } from './admin/admin-laptop/admin-laptop.component';
import { AdminAccesorryComponent } from './admin/admin-accesorry/admin-accesorry.component';
import { ModalModule, BsModalService } from 'ngx-bootstrap';
import { AdminService } from './service/admin.service';
import { AdminWelcomeComponent } from './admin/admin-welcome/admin-welcome.component';
import { AdminStuffComponent } from './admin/admin-stuff/admin-stuff.component';
import { CustomerService } from './service/customer.service';
import { ProductListComponent } from './product/product-list/product-list.component';
import { ProductDetailComponent } from './product/product-detail/product-detail.component';
import { RegisterComponent } from './register/register.component';
import { CartComponent } from './cart/cart.component';
import { HistoryComponent } from './history/history.component';
import { ErrorComponent } from './product/error/error.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    HomepageComponent,
    AdminHomeComponent,
    AdminLaptopComponent,
    AdminAccesorryComponent,
    AdminWelcomeComponent,
    AdminStuffComponent,
    ProductListComponent,
    ProductDetailComponent,
    RegisterComponent,
    CartComponent,
    HistoryComponent,
    ErrorComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ModalModule,
    HttpModule,
    ModalModule.forRoot(),
    // Cookie
  ],
  providers: [
    LoginService,
    MessageService,
    AuthGuard,
    AdminService,
    CustomerService

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
