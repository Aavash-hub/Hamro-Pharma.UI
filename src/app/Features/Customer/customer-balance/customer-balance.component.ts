import { CustomerService } from '../service/customer.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Customer } from '../../models/Customer.model';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-customer-balance',
  templateUrl: './customer-balance.component.html',
  styleUrls: ['./customer-balance.component.css']
})
export class CustomerBalanceComponent implements OnInit {
  @Input() customer: Customer | null = null;
  @Output() success = new EventEmitter<void>();
  @Output() error = new EventEmitter<void>();
  amount: number = 0;
  showSuccessDialog = false;
  showErrorDialog = false;

  constructor(private customerService: CustomerService, private router: Router) {}

  ngOnInit(): void {}

  payCustomerBalance(): void {
    if (this.customer && this.amount > 0 && this.customer.customerBalance >= this.amount) {
      this.customerService.payCustomerBalance(this.customer.id, this.amount, { responseType: 'text' }).subscribe({
        next: (response) => {
          console.log('Response:', response);
          this.success.emit();
          this.customer!.customerBalance -= this.amount;
        },
        error: (error) => {
          console.error('Failed to update customer balance:', error);
          this.error.emit();
        }
      });
    } else {
      this.error.emit();
    }
  }
  

  closeSuccessDialog(): void {
    this.showSuccessDialog = false;
    this.router.navigateByUrl('/customers').then(() => {
      window.location.reload();
    });
  }

  closeErrorDialog(): void {
    this.showErrorDialog = false;
  }
}