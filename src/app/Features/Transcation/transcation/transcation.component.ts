import { Component, OnInit } from '@angular/core';
import { Customer } from '../../models/Customer.model';
import { Order } from '../../models/Order.model';
import { TranscationService } from '../service/transcation.service';
import { CustomerService } from '../../Customer/service/customer.service';

@Component({
  selector: 'app-transcation',
  templateUrl: './transcation.component.html',
  styleUrls: ['./transcation.component.css']
})
export class TranscationComponent implements OnInit {
  order = { id: '', totalamount: 0, orderDate: new Date(), orderDetails: [] };
  customers: Customer[] = [];
  selectedCustomerId!: string;
  discount: number = 0;
  totalAmount!: number;
  transcationDate: Date = new Date();

  constructor(
    private transactionService: TranscationService,
    private customerService: CustomerService
  ) {}

  ngOnInit(): void {
    this.loadCustomers();
  }

  loadCustomers() {
    this.customerService.getAllCustomers().subscribe(
      data => this.customers = data,
      error => console.error('Error fetching customers', error)
    );
  }

  createTransaction() {
    const transactionDto = {
      TranscationOrderId: this.order.id, // Assuming the order id is already available
      CustomerId: this.selectedCustomerId,
      Discount: this.discount,
      TotalAmount: this.totalAmount,
      transcationDate: this.transcationDate
    };

    this.transactionService.addTransaction(transactionDto).subscribe(
      newTransaction => {
        console.log('Transaction created', newTransaction);
        // Further actions after creating transaction
      },
      error => console.error('Error creating transaction', error)
    );
  }
}
