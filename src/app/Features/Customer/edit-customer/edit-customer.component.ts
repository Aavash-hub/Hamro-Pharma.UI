import { Component, Input, OnInit } from '@angular/core';
import { CustomerService } from '../service/customer.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Customer } from '../../models/Customer.model';

@Component({
  selector: 'app-edit-customer',
  templateUrl: './edit-customer.component.html',
  styleUrls: ['./edit-customer.component.css']
})
export class EditCustomerComponent implements OnInit {
  customer: Customer = {
    id: '',
    name: '',
    email: '',
    address: '',
    customerBalance: 0,
    phoneNumber: ''
  };

  constructor(
    private customerService: CustomerService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    const customerId = this.route.snapshot.paramMap.get('id');
    if (customerId) {
      this.customerService.getCustomerById(customerId).subscribe({
        next: (customer) => {
          this.customer = customer;
        },
        error: (error) => {
          console.error('Failed to retrieve customer:', error);
        }
      });
    }
  }

  saveCustomer(): void {
    this.customerService.editCustomer(this.customer.id, this.customer).subscribe({
      next: () => {
        this.router.navigate(['/customers']);
      },
      error: (error) => {
        console.error('Failed to update customer:', error);
      }
    });
  }
}
