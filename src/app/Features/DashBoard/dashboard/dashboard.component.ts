import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../service/dashboard.service';
import { ExpiredDrugDto } from '../../models/ExpiredDrugDto.model';
import { UserService } from '../../User/services/user.service';
import { ProductService } from '../../Product/services/product.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  totalSales: number = 0;
  totalPurchases: number = 0;
  numberOfCustomers: number = 0;
  numberOfVendors: number = 0;
  expiredDrugs: ExpiredDrugDto[] = [];
  userList: any;
  productsList: any;
 

  constructor(private dashboardService: DashboardService,
    private productService: ProductService,
    private userService: UserService

  ) {}

  ngOnInit(): void {
    this.getDashboardData();

    this.userService.getallUser().subscribe(users => {
      this.userList = users;
  });
  this.productService.getAllProducts().subscribe(products => {
    this.productsList = products;
  });
  }

  getDashboardData(): void {
    this.dashboardService.getTotalSales().subscribe({
      next: (data) => {
        console.log('Total Sales received in component:', data);
        this.totalSales = data;
      },
      error: (error) => {
        console.error('Failed to load total sales in component:', error);
      }
    });
  
    // Repeat for other service calls
    this.dashboardService.getTotalPurchases().subscribe({
      next: (data) => {
        console.log('Total Purchases received in component:', data);
        this.totalPurchases = data;
      },
      error: (error) => console.error('Failed to load total purchases:', error)
    });
  
    this.dashboardService.getCustomerCount().subscribe({
      next: (data) => {
        console.log('Customer Count received in component:', data);
        this.numberOfCustomers = data;
      },
      error: (error) => console.error('Failed to load customer count:', error)
    });
  
    this.dashboardService.getVendorCount().subscribe({
      next: (data) => {
        console.log('Vendor Count received in component:', data);
        this.numberOfVendors = data;
      },
      error: (error) => console.error('Failed to load vendor count:', error)
    });
  
    this.dashboardService.getExpiredDrugs().subscribe({
      next: (data) => {
        console.log('Expired Drugs received in component:', data);
        this.expiredDrugs = data;
      },
      error: (error) => console.error('Failed to load expired drugs:', error)
    });
  }
}  
