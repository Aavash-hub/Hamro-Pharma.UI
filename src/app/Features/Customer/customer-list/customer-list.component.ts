import { Component, OnInit } from '@angular/core';
import { Customer } from '../../models/Customer.model';
import { CustomerService } from '../service/customer.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent implements OnInit {
  showAddCustomerForm: boolean = false;
  showEditCustomerForm: boolean = false;
  // selectedCustomer: Customer | null = null;
  customerList: Customer[] = [];
  customer: Customer = { 
    id: '',
    name: '',
    email: '',
    address: '',
    customerBalance: 0,
    phoneNumber: ''
  };

  constructor(private customerService: CustomerService,
    private route:ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.customerService.getAllCustomers().subscribe({
      next: (customers) => {
        this.customerList = customers;
      },
      error: (error) => {
        console.error('Failed to retrieve customers:', error);
      }
    });
  }

  deleteCustomer(id: string): void {
    if (confirm('Are you sure you want to delete this customer?')) {
      this.customerService.deleteCustomer(id).subscribe({
        next: () => {
          // Remove the deleted customer from the customerList
          this.customerList = this.customerList.filter(customer => customer.id !== id);
        },
        error: (error) => {
          console.error('Failed to delete customer:', error);
        }
      });
    }
  }
  toggleAddCustomerForm(): void {
    this.showAddCustomerForm = !this.showAddCustomerForm;
  }
  toggleEditCustomerForm() {
    this.showEditCustomerForm = !this.showEditCustomerForm;
  }
}
