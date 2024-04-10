import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductListComponent } from './Features/Product/product-list/product-list.component';
import { AddCategoryComponent } from './Features/Product/add-category/add-category.component';
import { UserListComponent } from './Features/User/user-list/user-list.component';
import { AdduserComponent } from './Features/User/adduser/adduser.component';
import { LoginComponent } from './Features/auth/login/login.component';



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
    path: 'Product/add-Product',
    component: AddCategoryComponent
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
