import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ProductmanagementComponent } from './productmanagement/productmanagement.component';
import { FindOrderComponent } from './find-order/find-order.component';
import { ManagermentCaterogyComponent } from './managerment-caterogy/managerment-caterogy.component';
import { ManagermentSupplierComponent } from './managerment-supplier/managerment-supplier.component';
import { CartComponent } from './cart/cart.component';
import { ManagermentCustomerComponent } from './managerment-customer/managerment-customer.component';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProductmanagementComponent,
    FindOrderComponent,
    ManagermentCaterogyComponent,
    ManagermentSupplierComponent,
    CartComponent,
    ManagermentCustomerComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule ,
    ReactiveFormsModule
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
