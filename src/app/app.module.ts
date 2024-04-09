import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { ProductListComponent } from './Features/Product/product-list/product-list.component';
import { AddCategoryComponent } from './Features/Product/add-category/add-category.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SidenavComponent } from './Core/Components/sidenav/sidenav.component';
import { CustomerListComponent } from './Features/Customer/customer-list/customer-list.component';
import { AddCustomerComponent } from './Features/customer/add-customer/add-customer.component';




@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    AddCategoryComponent,
    SidenavComponent,
    CustomerListComponent,
    AddCustomerComponent,
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
