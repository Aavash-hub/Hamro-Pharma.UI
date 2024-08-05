import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Products } from '../../models/Product.model';
import { AuthService } from '../../auth/Services/auth.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  productList: Products[] = [];
  filteredProductList: Products[] = [];
  showAddProductForm = false;
  showEditProductForm = false;
  showSuccessDialog = false;
  showErrorDialog = false;
  currentPage = 1;
  itemsPerPage = 5;
  totalPages = 1;
  searchQuery = '';
  selectedProduct: Products = {
    id: '',
    name: '',
    description: '',
    quantity: 0,
    price: 0,
    expiryDate: new Date(),
    createdDate: new Date()
  };


  constructor(private productService: ProductService, public authservice: AuthService) { }

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productService.getAllProducts().subscribe({
      next: (products) => {
        this.productList = products;
        this.filteredProductList = products;
        this.totalPages = Math.ceil(this.filteredProductList.length / this.itemsPerPage);
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
          this.filteredProductList = this.filteredProductList.filter(product => product.id !== id);
          this.totalPages = Math.ceil(this.filteredProductList.length / this.itemsPerPage);
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

  closeEditProductForm(): void {
    this.showEditProductForm = false;
  }

  editProduct(product: Products): void {
    this.selectedProduct = { ...product };  // Create a copy to avoid direct binding issues
    this.showEditProductForm = true;
  }

  onAddProductSuccess(): void {
    this.showAddProductForm = false;
    this.showSuccessDialog = true;
    this.loadProducts(); // Reload products after successful addition
  }

  onAddProductError(): void {
    this.showErrorDialog = true;
  }

  onEditProductSuccess(): void {
    this.showEditProductForm = false;
    this.showSuccessDialog = true;
    this.loadProducts(); // Reload products after successful edit
  }

  onEditProductError(): void {
    this.showErrorDialog = true;
  }

  closeSuccessDialog(): void {
    this.showSuccessDialog = false;
  }

  closeErrorDialog(): void {
    this.showErrorDialog = false;
  }

  searchProducts(): void {
    this.filteredProductList = this.productList.filter(product => 
      product.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
    this.totalPages = Math.ceil(this.filteredProductList.length / this.itemsPerPage);
    this.currentPage = 1;
  }

  get paginatedProducts(): Products[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.filteredProductList.slice(startIndex, endIndex);
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
}
