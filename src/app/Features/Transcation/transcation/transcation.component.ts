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
  showErrorDialog = false;
  errorMessage: string = '';

  // Variables to control showing the bill
  showBill: boolean = false;
  transactionId: string = '';

  constructor(
    private router: Router,
    private transactionService: TranscationService,
    private customerService: CustomerService,
    private orderService: OrderService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const orderId = params.get('id');
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
      this.showErrorDialog = true;
      this.errorMessage = 'Order is not defined';
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
        this.transactionId = newTransaction.id;
        this.showBill = true;  // Show the bill
      },
      error: (error) => {
        this.showErrorDialog = true;
        this.errorMessage = 'Error creating transaction: ' + error.message;
      }
    });
  }
  
  // New method to acknowledge the bill
  acknowledgeBillAndNavigate() {
    this.showBill = false; // Close the bill component
    this.navigateToOrderPage(); // Navigate to the order page
  }
  
  navigateToOrderPage() {
    this.router.navigate(['/Order']); // Corrected navigation
  }

  closeErrorDialog() {
    this.showErrorDialog = false;
  }
}
