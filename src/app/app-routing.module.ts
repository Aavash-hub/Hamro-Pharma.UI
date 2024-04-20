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
    path: 'Customer/add-customer',
    component: AddCustomerComponent
  },  
  {
    path: 'customer/customer-edit',
    component:EditCustomerComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
