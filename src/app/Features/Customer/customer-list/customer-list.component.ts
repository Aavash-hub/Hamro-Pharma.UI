import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../service/customer.service';
import { Customer } from '../../models/Customer.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent implements OnInit {
customerList: Customer[] = [];
filteredCustomerList: Customer[] = [];
showAddCustomerForm = false;
showEditCustomerForm = false;
showPayCustomerBalanceForm = false;
showSuccessDialog = false;
showErrorDialog = false;
currentPage = 1;
itemsPerPage = 5;
totalPages = 1;
searchQuery = '';
selectedCustomer: Customer = {
  id: '',
  name: '',
  email: '',
  phoneNumber: '',
  address: '',
  customerBalance: 0
};

constructor(private customerService: CustomerService) { }

ngOnInit(): void {
  this.loadCustomers();
}

loadCustomers(): void {
  this.customerService.getAllCustomers().subscribe({
    next: (customers) => {
      this.customerList = customers;
      this.filteredCustomerList = customers;
      this.totalPages = Math.ceil(this.filteredCustomerList.length / this.itemsPerPage);
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
        this.customerList = this.customerList.filter(customer => customer.id !== id);
        this.filteredCustomerList = this.filteredCustomerList.filter(customer => customer.id !== id);
        this.totalPages = Math.ceil(this.filteredCustomerList.length / this.itemsPerPage);
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

closeEditCustomerForm(): void {
  this.showEditCustomerForm = false;
}

closePayCustomerBalanceForm(): void {
  this.showPayCustomerBalanceForm = false;
}

editCustomer(customer: Customer): void {
  this.selectedCustomer = { ...customer };  // Create a copy to avoid direct binding issues
  this.showEditCustomerForm = true;
}

payCustomerBalance(customer: Customer): void {
  this.selectedCustomer = { ...customer };  // Create a copy to avoid direct binding issues
  this.showPayCustomerBalanceForm = true;
}

onAddCustomerSuccess(): void {
  this.showAddCustomerForm = false;
  this.showSuccessDialog = true;
  this.loadCustomers(); // Reload customers after successful addition
}

onAddCustomerError(): void {
  this.showErrorDialog = true;
}

onEditCustomerSuccess(): void {
  this.showEditCustomerForm = false;
  this.showSuccessDialog = true;
  this.loadCustomers(); // Reload customers after successful edit
}

onEditCustomerError(): void {
  this.showErrorDialog = true;
}

onPayCustomerBalanceSuccess(): void {
  this.showPayCustomerBalanceForm = false;
  this.showSuccessDialog = true;
  this.loadCustomers(); // Reload customers after successful payment
}

onPayCustomerBalanceError(): void {
  this.showErrorDialog = true;
}

closeSuccessDialog(): void {
  this.showSuccessDialog = false;
}

closeErrorDialog(): void {
  this.showErrorDialog = false;
}

searchCustomers(): void {
  this.filteredCustomerList = this.customerList.filter(customer => 
    customer.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
    customer.email.toLowerCase().includes(this.searchQuery.toLowerCase())
  );
  this.totalPages = Math.ceil(this.filteredCustomerList.length / this.itemsPerPage);
  this.currentPage = 1;
}

get paginatedCustomers(): Customer[] {
  const startIndex = (this.currentPage - 1) * this.itemsPerPage;
  const endIndex = startIndex + this.itemsPerPage;
  return this.filteredCustomerList.slice(startIndex, endIndex);
}

nextPage(): void {
  if (this.currentPage < this.totalPages) {
    this.currentPage++;
  }
}

previousPage(): void {
  if (this.currentPage > 1) {
    this.currentPage--;
  }
}
}