import { Component, OnInit } from '@angular/core';
import { Customer } from '../../models/Customer.model';
import { Order } from '../../models/Order.model';
import { TranscationService } from '../service/transcation.service';
import { CustomerService } from '../../Customer/service/customer.service';
import { TransactionDto } from '../../models/TranscationDto.model';
import { OrderService } from '../../Order/service/order.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-transcation',
  templateUrl: './transcation.component.html',
  styleUrls: ['./transcation.component.css']
})
export class TranscationComponent implements OnInit {
  order!: Order;
  customers: Customer[] = [];
  selectedCustomerId!: string;
  discount: number = 0;
  totalAmount!: number;
  transactionDate: Date = new Date();
  showSuccessDialog = false; // For showing the success dialog
  showErrorDialog = false; 

  constructor(
    private router: Router,
    private transactionService: TranscationService,
    private customerService: CustomerService,
    private orderService: OrderService, // Inject OrderService
    private route: ActivatedRoute // To get the order ID from the route if necessary
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const orderId = params.get('id'); // Use 'id' to match the route configuration
      if (orderId) {
        this.loadOrder(orderId);
      } else {
        console.error('No Order ID found');
      }
    });
    this.loadCustomers();
  }
  
  loadCustomers() {
    this.customerService.getAllCustomers().subscribe(
      data => this.customers = data,
      error => console.error('Error fetching customers', error)
    );
  }
  
  navigateToOrderPage() {
    this.router.navigate(['/Order']); // Navigates back to the Order page
  }
  

  loadOrder(orderId: string) {
    this.orderService.getOrderById(orderId).subscribe({
      next: (order) => {
        this.order = order;
        this.totalAmount = order.totalamount; // Assuming totalAmount is a property of Order
      },
      error: (error) => console.error('Failed to load order', error)
    });
  }

  createTransaction() {
    if (!this.order) {
      console.error('Order is not defined');
      this.showErrorDialog = true; // Show error dialog if the order is not defined
      return;
    }
  
    const transactionDto: TransactionDto = {
      TranscationOrderId: this.order.id,
      CustomerId: this.selectedCustomerId,
      Discount: this.discount,
      TotalAmount: this.totalAmount,
      PurchaseDate: this.transactionDate
    };
  
    this.transactionService.addTransaction(this.order.id, transactionDto).subscribe({
      next: (newTransaction) => {
        console.log('Transaction created', newTransaction);
        this.showSuccessDialog = true;
      },
      error: (error) => {
        console.error('Error creating transaction', error);
        this.showErrorDialog = true; // Show error dialog on failure
      }
    });
  }  
  closeSuccessDialog() {
    this.showSuccessDialog = false; // Hide success dialog
  }
  
  closeErrorDialog() {
    this.showErrorDialog = false; // Hide error dialog
  }
  
}
