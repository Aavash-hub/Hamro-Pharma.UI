import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Products } from '../../models/Product.model';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {

  product: Products = {
    id: '',
    name: '',
    description: '',
    quantity: 0,
    price: 0,
    expiryDate: new Date(),
    createdDate: new Date()
  };

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    const productId = this.route.snapshot.paramMap.get('id');
    if (productId) {
      this.productService.getProductById(productId).subscribe({
        next: (product) => {
          this.product = product;
        },
        error: (error) => {
          console.error('Failed to retrieve product:', error);
        }
      });
    }
  }

  saveProduct(): void {
    this.productService.editProduct(this.product.id, this.product).subscribe({
      next: () => {
        this.router.navigate(['/products']);
      },
      error: (error) => {
        console.error('Failed to update product:', error);
      }
    });
  }
}
