import { Component, Input } from '@angular/core';
import { Customer } from '../../models/Customer.model';
import { CustomerService } from '../service/customer.service';
import { Router } from '@angular/router';
import { AddCustomerRequest } from '../../models/Add-customer-request.model';

@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.css']
})
export class AddCustomerComponent {
  
  formData: AddCustomerRequest = {
    name: '',
    email: '',
    address: '',
    customerBalance: 0,
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