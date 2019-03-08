import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { HomepageComponent } from './homepage/homepage.component';
import { AdminHomeComponent } from './admin/admin-home/admin-home.component';
import { AuthGuard } from './guard/auth.guard';
import { CommonModule } from '@angular/common';
import { AdminLaptopComponent } from './admin/admin-laptop/admin-laptop.component';
import { AdminAccesorryComponent } from './admin/admin-accesorry/admin-accesorry.component';
import { AdminWelcomeComponent } from './admin/admin-welcome/admin-welcome.component';
import { AdminStuffComponent } from './admin/admin-stuff/admin-stuff.component';
import { ProductListComponent } from './product/product-list/product-list.component';
import { ProductDetailComponent } from './product/product-detail/product-detail.component';
import { RegisterComponent } from './register/register.component';
import { CartComponent } from './cart/cart.component';
import { HistoryComponent } from './history/history.component';
import { ErrorComponent } from './product/error/error.component';

const routes: Routes = [
  {
    path: 'adminhome', component: AdminHomeComponent, canActivate: [AuthGuard], data: { role: 'Admin' },
    children: [
      { path: 'welcome', component: AdminWelcomeComponent, canActivate: [AuthGuard], data: { role: 'Admin' } },
      { path: 'laptop', component: AdminLaptopComponent, canActivate: [AuthGuard], data: { role: 'Admin' } },
      { path: 'accessories', component: AdminAccesorryComponent, canActivate: [AuthGuard], data: { role: 'Admin' } },
      { path: 'stuff', component: AdminStuffComponent, canActivate: [AuthGuard], data: { role: 'Admin' } }
    ]
  },
  { path: 'product/detail/:lapId', component: ProductDetailComponent },
  { path: 'product/list/:searchValue', component: ProductListComponent },
  { path: 'product/list/brand/:lapBrand', component: ProductListComponent },

  { path: 'register', component: RegisterComponent },

  { path: 'cart', component: CartComponent, canActivate: [AuthGuard], data: { role: 'Customer' } },
  { path: 'orderHistory', component: HistoryComponent, canActivate: [AuthGuard], data: { role: 'Customer' } },

  { path: 'error', component: ErrorComponent },
  { path: 'home', component: HomepageComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', component: HomepageComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
