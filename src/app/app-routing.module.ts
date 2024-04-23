import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductListComponent } from './Features/Product/product-list/product-list.component';
import { UserListComponent } from './Features/User/user-list/user-list.component';
import { AdduserComponent } from './Features/User/adduser/adduser.component';
import { LoginComponent } from './Features/auth/login/login.component';
import { ProductEditComponent } from './Features/Product/product-edit/product-edit.component';
import { AddProductComponent } from './Features/Product/add-product/add-product.component';
import { EditUserComponent } from './Features/User/edit-user/edit-user.component';
import { VendorListComponent } from './Features/Vendor/vendor-list/vendor-list.component';
import { EditVendorComponent } from './Features/Vendor/edit-vendor/edit-vendor.component';
import { AddVendorComponent } from './Features/Vendor/add-vendor/add-vendor.component';
import { MakePurchaseComponent } from './Features/Purchase/make-purchase/make-purchase.component';
import { CustomerListComponent } from './Features/Customer/customer-list/customer-list.component';
import { AddCustomerComponent } from './Features/Customer/add-customer/add-customer.component';
import { EditCustomerComponent } from './Features/Customer/edit-customer/edit-customer.component';
import { PurchaseReportComponent } from './Features/Reports/purchase-report/purchase-report.component';
import { OrderComponent } from './Features/Order/order/order.component';
import { SalesReportComponent } from './Features/Reports/sales-report/sales-report.component';

import { CustomerBalanceComponent } from './Features/Customer/customer-balance/customer-balance.component';
import { DashboardComponent } from './Features/DashBoard/dashboard/dashboard.component';
import { TranscationComponent } from './Features/Transcation/transcation/transcation.component';



const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'product/product-list',
    component: ProductListComponent
  },
  {
    path: 'Product/edit/:id',
    component: ProductEditComponent
  },
  {
    path: 'Product/add-Product',
    component: AddProductComponent
  },
  {
    path: 'User/userlist',
    component: UserListComponent
  },
  {
    path:'user/adduser',
    component: AdduserComponent
  },
  {
    path: 'user/edit/:id',
    component: EditUserComponent
  },
  {
    path: 'vendor/vendor-list',
    component: VendorListComponent
  },
  {
    path: 'Vendor/edit/:id',
    component:EditVendorComponent
  },  
  {
    path: 'Vendor/add-vendor',
    component: AddVendorComponent
  },
  {
    path:'report/purchasereport',
    component:PurchaseReportComponent
  },
  {
    path:'purchase',
    component:MakePurchaseComponent
  },
  {
    path: 'Customer/customer-list',
    component:CustomerListComponent
  },
  {
    path:'Customer/balance/:id',
    component:CustomerBalanceComponent
  },
  {
    path: 'Customer/add-customer',
    component: AddCustomerComponent
  },  
  {
    path: 'Customer/customer-edit/:id',
    component:EditCustomerComponent
  },
  {
    path: 'Order',
    component:OrderComponent
  },
  {
    path:'Report/sales-report',
    component: SalesReportComponent
  },
  {
    path: 'transcation/:id',
    component: TranscationComponent
  },
  {
    path:'Dashboard',
    component: DashboardComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
