import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Products } from '../../models/Product.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  productList: Products[] = [];
  showAddProductForm: boolean = false;
  showEditProductForm: boolean = false;
  editingProduct: Products | null = null;

  constructor(private productService: ProductService, private router: Router) { }

  ngOnInit(): void {
    this.productService.getAllProducts().subscribe({
      next: (products) => {
        this.productList = products;
      },
      error: (error) => {
        console.error('Failed to retrieve products:', error);
      }
    });
  }
  deleteProduct(id: string): void {
    if (confirm('Are you sure you want to delete this product?')) {
      this.productService.deleteProduct(id).subscribe({
        next: () => {
          // Remove the deleted product from the productList
          this.productList = this.productList.filter(product => product.id !== id);
        },
        error: (error) => {
          console.error('Failed to delete product:', error);
        }
      });
    }
  }
  toggleAddProductForm(): void {
    this.showAddProductForm = !this.showAddProductForm;
  }
  
}

