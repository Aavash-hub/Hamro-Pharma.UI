import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { DashboardService } from '../service/dashboard.service';
import { ExpiredDrugDto } from '../../models/ExpiredDrugDto.model';
import { UserService } from '../../User/services/user.service';
import { ProductService } from '../../Product/services/product.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  totalSales: number | undefined;
  totalPurchases: number | undefined;
  numberOfCustomers: number| undefined;
  numberOfVendors: number| undefined;
  expiredDrugs: ExpiredDrugDto[] = [];
  userList: any[] = [];
  productsList: any[] = [];
  private subscriptions: Subscription = new Subscription();

  constructor(
    private dashboardService: DashboardService,
    private productService: ProductService,
    private userService: UserService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    console.log('Component initialized');
    this.getDashboardData();

    this.subscriptions.add(this.userService.getallUser().subscribe(users => {
      this.userList = users;
      console.log('User List:', this.userList);
      this.cdr.detectChanges();
    }));

    this.subscriptions.add(this.productService.getAllProducts().subscribe(products => {
      this.productsList = products;
      console.log('Products List:', this.productsList);
      this.cdr.detectChanges();
    }));
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  getDashboardData(): void {
    this.subscriptions.add(
      this.dashboardService.getTotalSales().subscribe({
        next: (data) => {
          console.log('Total Sales received in component:', data);
          this.totalSales = data;
          this.cdr.detectChanges();
        },
        error: (error) => console.error('Failed to load total sales:', error)
      })
    );

    this.subscriptions.add(
      this.dashboardService.getTotalPurchases().subscribe({
        next: (data) => {
          console.log('Total Purchases received in component:', data);
          this.totalPurchases = data;
          this.cdr.detectChanges();
        },
        error: (error) => console.error('Failed to load total purchases:', error)
      })
    );

    this.subscriptions.add(
      this.dashboardService.getCustomerCount().subscribe({
        next: (data) => {
          console.log('Customer Count received in component:', data);
          this.numberOfCustomers = data;
          this.cdr.detectChanges();
        },
        error: (error) => console.error('Failed to load customer count:', error)
      })
    );

    this.subscriptions.add(
      this.dashboardService.getVendorCount().subscribe({
        next: (data) => {
          console.log('Vendor Count received in component:', data);
          this.numberOfVendors = data;
          this.cdr.detectChanges();
        },
        error: (error) => console.error('Failed to load vendor count:', error)
      })
    );

    this.subscriptions.add(
      this.dashboardService.getExpiredDrugs().subscribe({
        next: (data) => {
          console.log('Expired Drugs received in component:', data);
          this.expiredDrugs = data;
          this.cdr.detectChanges();
        },
        error: (error) => console.error('Failed to load expired drugs:', error)
      })
    );
  }
}
