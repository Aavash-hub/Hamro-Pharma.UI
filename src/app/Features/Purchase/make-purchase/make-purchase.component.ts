import { Component, OnInit } from '@angular/core';
import { PurchaseService } from '../services/purchase.service';
import { VendorService } from '../../Vendor/service/vendor.service';
import { ProductService } from '../../Product/services/product.service';
import { Purchase } from '../../models/Purchase.model';
import { Vendor } from '../../models/vendor.model';
import { Products } from '../../models/Product.model';

@Component({
  selector: 'app-make-purchase',
  templateUrl: './make-purchase.component.html',
  styleUrls: ['./make-purchase.component.css']
})
export class MakePurchaseComponent implements OnInit {

  purchaseDto: Purchase = {
    id: '',
    quantity: 0,
    price: 0,
    purchaseDate: new Date(),
    totalAmount: 0,
    vendorId: '',
    productId: ''
  };

  productList: Products[] = [];
  vendorList: Vendor[] = [];

  showSuccessDialog = false;
  showErrorDialog = false;

  constructor(
    private purchaseService: PurchaseService,
    private productService: ProductService,
    private vendorService: VendorService
  ) {}

  ngOnInit(): void {
    this.loadProducts();
    this.loadVendors();
  }

  makePurchase(): void {
    this.purchaseService.makePurchase(this.purchaseDto).subscribe({
      next: () => {
        console.log('Purchase successful');
        this.showSuccessDialog = true;
        this.resetPurchaseDto();
      },
      error: (error) => {
        console.error('Failed to make purchase:', error);
        this.showErrorDialog = true;
      }
    });
  }

  resetPurchaseDto(): void {
    this.purchaseDto = {
      id: '',
      quantity: 0,
      price: 0,
      purchaseDate: new Date(),
      totalAmount: 0,
      vendorId: '',
      productId: ''
    };
  }

  closeSuccessDialog(): void {
    this.showSuccessDialog = false;
  }

  closeErrorDialog(): void {
    this.showErrorDialog = false;
  }

  loadProducts(): void {
    this.productService.getAllProducts().subscribe({
      next: (products) => {
        this.productList = products;
      },
      error: (error) => {
        console.error('Failed to retrieve products:', error);
      }
    });
  }

  loadVendors(): void {
    this.vendorService.getAllVendors().subscribe({
      next: (vendors) => {
        this.vendorList = vendors;
      },
      error: (error) => {
        console.error('Failed to retrieve vendors:', error);
      }
    });
  }
}

