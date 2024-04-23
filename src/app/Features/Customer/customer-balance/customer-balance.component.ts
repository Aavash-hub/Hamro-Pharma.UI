import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../service/customer.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-customer-balance',
  templateUrl: './customer-balance.component.html',
  styleUrls: ['./customer-balance.component.css']
})
export class CustomerBalanceComponent implements OnInit {
  customerId: string = '';
  customerName: string = '';
  balance: number = 0;
  amount: number = 0;

  constructor(
    private route: ActivatedRoute,
    private customerService: CustomerService,
    private paymentService: CustomerService
  ) { }

  ngOnInit(): void {
    const customerId = this.route.snapshot.paramMap.get('id');
    if (customerId) {
      this.customerId = customerId;
      this.customerService.getCustomerById(customerId).subscribe({
        next: (customer) => {
          this.customerName = customer.name;
          this.balance = customer.customerBalance;
        },
        error: (error) => {
          console.error('Failed to retrieve customer:', error);
        }
      });
    }
  }

  payCustomerBalance(customerId: string, amount: number): void {
    if (amount <= 0) {
      console.error('Invalid payment amount');
      return;
    }

    if (this.balance < amount) {
      console.error('Insufficient customer balance');
      return;
    }

    this.paymentService.payCustomerBalance(customerId, amount).subscribe(
      () => {
        // Handle success
        console.log('Payment successful');
        // Optionally, you can update the balance displayed on the UI after successful payment
        this.balance -= amount;
      },
      (error) => {
        // Handle error
        console.error('Payment failed:', error);
      }
    );
  }
}
