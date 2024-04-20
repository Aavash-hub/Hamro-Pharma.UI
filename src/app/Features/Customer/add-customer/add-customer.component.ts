import { Component } from '@angular/core';
import { Customer } from '../../models/Customer.model';
import { CustomerService } from '../service/customer.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.css']
})
export class AddCustomerComponent {

  formData: Customer = {
    name: '',
    email: '',
    address: '',
    customerBalance: 0,
    id: '',
    phoneNumber: ''
  };

  constructor(private customerService: CustomerService, private router: Router) { }

  onFormSubmit(): void {
    this.customerService.addCustomer(this.formData).subscribe({
      next: () => {
        this.router.navigate(['/customer/customer-list']);
      },
      error: (error) => {
        console.error('Failed to add customer:', error);
      }
    });
  }
}