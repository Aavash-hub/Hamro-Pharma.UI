import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidebarComponent } from './Core/Components/sidebar/sidebar.component';
import { ProductListComponent } from './Features/Product/product-list/product-list.component';
import { AddCategoryComponent } from './Features/Product/add-category/add-category.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './Core/Components/header/header.component';



@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    ProductListComponent,
    AddCategoryComponent,
    HeaderComponent,
    SidebarComponent
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
