import {  NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProductmanagementComponent } from './productmanagement/productmanagement.component';
import { FindOrderComponent } from './find-order/find-order.component';
import { ManagermentCaterogyComponent } from './managerment-caterogy/managerment-caterogy.component';
import { ManagermentSupplierComponent } from './managerment-supplier/managerment-supplier.component';
import { CartComponent } from './cart/cart.component';
import { ManagermentCustomerComponent } from './managerment-customer/managerment-customer.component';
import { LoginComponent } from './login/login.component';


const routes: Routes = [
  {path: "product", component: HomeComponent},
  {path: "", redirectTo : "login" , pathMatch : "full"},
  {path: "productmanagement", component: ProductmanagementComponent},
  {path: "find-order", component : FindOrderComponent},
  {path: "category", component: ManagermentCaterogyComponent},
  {path: "supplier", component: ManagermentSupplierComponent},
  {path: "cart", component: CartComponent},
  {path: "customer", component: ManagermentCustomerComponent},
  {path: 'category/:id', component: HomeComponent},
  {path: 'login', component: LoginComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
