import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductListComponent } from './Features/Product/product-list/product-list.component';
import { AddCategoryComponent } from './Features/Product/add-category/add-category.component';


const routes: Routes = [
  {
    path: 'product/product-list',
    component: ProductListComponent
  },
  {
    path: 'Product/add-Product',
    component: AddCategoryComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
