import { Component } from '@angular/core';
import { AddProductRequest } from '../../models/Add-product-request.model';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent {

  formData: AddProductRequest = {
    name: '',
    description: '',
    quantity: 0,
    price: 0,
    expiryDate: new Date()
  };

  constructor(private productService: ProductService) { }

  onFormSubmit(): void {
    this.productService.addProduct(this.formData).subscribe({
      next: () => {
        console.log("Product added successfully.");
        // Optionally, you can navigate to another page or show a success message
      },
      error: (error) => {
        console.error("There was an error while adding the product:", error);
        // Optionally, you can show an error message to the user
      }
    });
  }
}