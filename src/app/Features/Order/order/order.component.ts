import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../Product/services/product.service';
import { OrderService } from '../service/order.service';
import { Products } from '../../models/Product.model';
import { OrderDetail } from '../../models/Order-details.model';
import { HttpHeaders } from '@angular/common/http';


interface Order {
  id: String;
  // ... other order properties
}

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  products: Products[] = [];
  orderedItems: OrderDetail[] = [];
  currentOrderId!: string;

  constructor(
    private productService: ProductService,
    private orderService: OrderService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.loadProducts();
    this.setCurrentOrderId();
  }

  loadProducts(): void {
    this.productService.getAllProducts().subscribe(
      (response: Products[]) => {
        this.products = response;
      },
      (error: any) => {
        console.error('Error fetching products:', error);
      }
    );
  }
  setCurrentOrderId() {
    this.route.params.subscribe(params => {
      this.currentOrderId = params['orderId'];  // Make sure the 'orderId' matches your route configuration
    });
  }
  addToOrder(product: Products): void {
    // Check if the product already exists in the orderedItems
    const existingOrderIndex = this.orderedItems.findIndex(item => item.orderProductsId === product.id);

    if (existingOrderIndex !== -1) {
        // If the product exists, just update the quantity
        this.orderedItems[existingOrderIndex].quantity += 1;
    } else {
        // If the product does not exist, create a new entry
        const newOrderDetail: OrderDetail = {
            orderProductsId: product.id,
            orderId: this.currentOrderId,  // Ensure this is set from your order context
            productName: product.name,
            quantity: 1,
            price: product.price
        };
        this.orderedItems.push(newOrderDetail);
    }
}
 createOrder(orderItems: OrderDetail[]): void {
    console.log("Order items:", orderItems);  // Check the order items details
    this.orderService.createOrder(orderItems).subscribe({
      next: (order) => {
        console.log('Order created:', order);
        this.navigateToTransactionPage(order.id);
      },
      error: (error) => {
        console.error('Error creating order:', error);
      }
    });
  }
  

  navigateToTransactionPage(orderId: string) {
    this.router.navigate(['/transcation',orderId]);
  }  
  
  removeFromOrder(item: OrderDetail): void {
    // Assuming `orderProductsId` is the unique identifier
    const index = this.orderedItems.findIndex(i => i.orderProductsId === item.orderProductsId);
    if (index !== -1) {
        if (this.orderedItems[index].quantity > 1) {
            this.orderedItems[index].quantity--;
        } else {
            this.orderedItems.splice(index, 1);
        }
    }
}
}
