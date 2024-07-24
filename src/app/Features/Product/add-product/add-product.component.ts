import { Component } from '@angular/core';
import { AddProductRequest } from '../../models/Add-product-request.model';
import { ProductService } from '../services/product.service';
import { Router } from '@angular/router';

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
  showSuccessDialog = false;
  showErrorDialog = false;


  constructor(private productService: ProductService,private router: Router) { }

  onFormSubmit(): void {
    this.productService.addProduct(this.formData).subscribe({
      next: () => {
        this.showSuccessDialog = true;
      },
      error: () => {
        this.showErrorDialog = true;
      }
    });
  }
  closeSuccessDialog() {
    this.showSuccessDialog = false;
    this.router.navigateByUrl('product/product-list').then(() => {
      window.location.reload();
    });
  }

  closeErrorDialog() {
    this.showErrorDialog = false;
    this.router.navigateByUrl('product/product-list').then(() => {
      window.location.reload();
    });
  }
}