import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { ProductListComponent } from './Features/Product/product-list/product-list.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SidenavComponent } from './Core/Components/sidenav/sidenav.component';
import { CustomerListComponent } from './Features/Customer/customer-list/customer-list.component';
import { AddCustomerComponent } from './Features/Customer/add-customer/add-customer.component';
import { UserListComponent } from './Features/User/user-list/user-list.component';
import { AdduserComponent } from './Features/User/adduser/adduser.component';
import { LoginComponent } from './Features/auth/login/login.component';
import { MakePurchaseComponent } from './Features/Purchase/make-purchase/make-purchase.component';
import { PurcahseReportComponent } from './Features/Report/purcahse-report/purcahse-report.component';
import { AddVendorComponent } from './Features/Vendor/add-vendor/add-vendor.component';
import { EditVendorComponent } from './Features/Vendor/edit-vendor/edit-vendor.component';
import { ProductEditComponent } from './Features/Product/product-edit/product-edit.component';
import { AddProductComponent } from './Features/Product/add-product/add-product.component';


@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    SidenavComponent,
    CustomerListComponent,
    AddCustomerComponent,
    UserListComponent,
    AdduserComponent,
    LoginComponent,
    MakePurchaseComponent,
    PurcahseReportComponent,
    AddVendorComponent,
    EditVendorComponent,
    ProductEditComponent,
    AddProductComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
