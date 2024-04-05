import { Component, OnDestroy } from '@angular/core';
import { AddProductRequest } from '../../models/add-product-request.model';
import { ProductService } from '../services/product.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnDestroy{
  model: AddProductRequest;
  private addprodcutSubscription?: Subscription;

  constructor(private productService: ProductService) {
    this.model = {
      name: ''
    };
  }

  onFormSubmit() {
    this.addprodcutSubscription = this.productService.addProduct(this.model)
    .subscribe({
      next: (Response)=>{
        console.log("Product added successfully.");
      },
      error: (error)=>{
        console.log("There was an error while adding the product.");
      }
    })
  }
  ngOnDestroy(): void {
    this.addprodcutSubscription?.unsubscribe();
  }
}
