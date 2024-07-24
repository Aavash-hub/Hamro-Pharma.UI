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
  currentPage: number = 1;
  itemsPerPage: number = 5;
  totalPages: number = 1;

  constructor(private productService: ProductService, private router: Router) { }

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productService.getAllProducts().subscribe({
      next: (products) => {
        this.productList = products;
        this.totalPages = Math.ceil(this.productList.length / this.itemsPerPage);
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
          this.productList = this.productList.filter(product => product.id !== id);
          this.totalPages = Math.ceil(this.productList.length / this.itemsPerPage);
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

  get paginatedProducts(): Products[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.productList.slice(startIndex, endIndex);
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }
}
