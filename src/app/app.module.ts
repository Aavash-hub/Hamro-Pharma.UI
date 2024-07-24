import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


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
import { AddVendorComponent } from './Features/Vendor/add-vendor/add-vendor.component';
import { EditVendorComponent } from './Features/Vendor/edit-vendor/edit-vendor.component';
import { ProductEditComponent } from './Features/Product/product-edit/product-edit.component';
import { AddProductComponent } from './Features/Product/add-product/add-product.component';
import { EditUserComponent } from './Features/User/edit-user/edit-user.component';
import { VendorListComponent } from './Features/Vendor/vendor-list/vendor-list.component';
import { EditCustomerComponent } from './Features/Customer/edit-customer/edit-customer.component';
import { PurchaseReportComponent } from './Features/Reports/purchase-report/purchase-report.component';
import { OrderComponent } from './Features/Order/order/order.component';
import { SalesReportComponent } from './Features/Reports/sales-report/sales-report.component';
import { DashboardComponent } from './Features/DashBoard/dashboard/dashboard.component';
import { CustomerBalanceComponent } from './Features/Customer/customer-balance/customer-balance.component';
import { TranscationComponent } from './Features/Transcation/transcation/transcation.component';
import { SuccessDialogComponent } from './Core/Components/Dialogbox/success-dialog/success-dialog.component';
import { ErrordialogComponent } from './Core/Components/Dialogbox/errordialog/errordialog.component';


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
    AddVendorComponent,
    EditVendorComponent,
    ProductEditComponent,
    AddProductComponent,
    EditUserComponent,
    VendorListComponent,
    EditCustomerComponent,
    PurchaseReportComponent,
    OrderComponent,
    SalesReportComponent,
    DashboardComponent,
    CustomerBalanceComponent,
    TranscationComponent,
    SuccessDialogComponent,
    ErrordialogComponent,

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    RouterModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
