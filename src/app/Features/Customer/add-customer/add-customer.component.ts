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
    phoneNumber: '',
    customerBalance: 0,
  };

  showSuccessDialog = false;
  showErrorDialog = false;

  constructor(private customerService: CustomerService, private router: Router) { }

  onFormSubmit(): void {
    this.customerService.addCustomer(this.formData).subscribe({
      next: () => {
        this.showSuccessDialog = true;
      },
      error: (error) => {
        console.error('Failed to add customer:', error);
        this.showErrorDialog = true;
      }
    });
  }

  closeSuccessDialog() {
    this.showSuccessDialog = false;
    this.router.navigate(['/customer/customer-list']);
  }

  closeErrorDialog() {
    this.showErrorDialog = false;
  }
}