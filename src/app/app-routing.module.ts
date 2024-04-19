import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductListComponent } from './Features/Product/product-list/product-list.component';
import { UserListComponent } from './Features/User/user-list/user-list.component';
import { AdduserComponent } from './Features/User/adduser/adduser.component';
import { LoginComponent } from './Features/auth/login/login.component';
import { ProductEditComponent } from './Features/Product/product-edit/product-edit.component';
import { AddProductComponent } from './Features/Product/add-product/add-product.component';



const routes: Routes = [
  {
    path: 'products',
    children: [
      { path: 'product-list', component: ProductListComponent },
    ]
  },
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
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
