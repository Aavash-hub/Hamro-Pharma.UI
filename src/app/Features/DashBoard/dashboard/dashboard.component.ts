import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { DashboardService } from '../service/dashboard.service';
import { ExpiredDrugDto } from '../../models/ExpiredDrugDto.model';
import { UserService } from '../../User/services/user.service';
import { ProductService } from '../../Product/services/product.service';
import { Subscription } from 'rxjs';
import { Chart, registerables } from 'chart.js';
import { SalesData } from '../../models/sales-data.model';
import { ChangePasswordDto } from '../../models/Change-password-user.model';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {
  totalSales: number | undefined;
  totalPurchases: number | undefined;
  numberOfCustomers: number | undefined;
  numberOfVendors: number | undefined;
  expiredDrugs: ExpiredDrugDto[] = [];
  userList: any[] = [];
  productsList: any[] = [];
  selectedUserId: string | null = null;
  changePasswordDto: ChangePasswordDto = { userId: '', newPassword: '', confirmPassword: '' };
  isChangePasswordModalOpen = false;
  private subscriptions: Subscription = new Subscription();

  constructor(
    private dashboardService: DashboardService,
    private productService: ProductService,
    private userService: UserService,
    private cdr: ChangeDetectorRef
  ) {
    Chart.register(...registerables); // Registers Chart.js components
  }

  ngOnInit(): void {
    this.fetchSalesData();
    this.getDashboardData();
    this.loadUsersAndProducts();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe(); // Unsubscribe to all subscriptions
  }

  private fetchSalesData(): void {
    this.subscriptions.add(
      this.dashboardService.getSalesGrowth().subscribe({
        next: (data) => this.createChart(data),
        error: (error) => console.error('Error fetching sales growth data:', error)
      })
    );
  }

  private getDashboardData(): void {
    this.subscriptions.add(
      this.dashboardService.getTotalSales().subscribe({
        next: (data) => {
          this.totalSales = data;
          this.cdr.detectChanges();
        },
        error: (error) => console.error('Failed to load total sales:', error)
      })
    );

    this.subscriptions.add(
      this.dashboardService.getTotalPurchases().subscribe({
        next: (data) => {
          this.totalPurchases = data;
          this.cdr.detectChanges();
        },
        error: (error) => console.error('Failed to load total purchases:', error)
      })
    );

    this.subscriptions.add(
      this.dashboardService.getCustomerCount().subscribe({
        next: (data) => {
          this.numberOfCustomers = data;
          this.cdr.detectChanges();
        },
        error: (error) => console.error('Failed to load customer count:', error)
      })
    );

    this.subscriptions.add(
      this.dashboardService.getVendorCount().subscribe({
        next: (data) => {
          this.numberOfVendors = data;
          this.cdr.detectChanges();
        },
        error: (error) => console.error('Failed to load vendor count:', error)
      })
    );

    this.subscriptions.add(
      this.dashboardService.getExpiredDrugs().subscribe({
        next: (data) => {
          this.expiredDrugs = data;
          this.cdr.detectChanges();
        },
        error: (error) => console.error('Failed to load expired drugs:', error)
      })
    );
  }

  private loadUsersAndProducts(): void {
    this.subscriptions.add(this.userService.getallUser().subscribe(users => {
      this.userList = users;
      this.cdr.detectChanges();
    }));

    this.subscriptions.add(this.productService.getAllProducts().subscribe(products => {
      this.productsList = products;
      this.cdr.detectChanges();
    }));
  }

  openChangePasswordPanel(userId: string): void {
    this.selectedUserId = userId;
    this.changePasswordDto.userId = userId;
    this.isChangePasswordModalOpen = true;
  }

  closeChangePasswordPanel(): void {
    this.isChangePasswordModalOpen = false;
    this.selectedUserId = null;
    this.changePasswordDto = { userId: '', newPassword: '', confirmPassword: '' };
  }

  changePassword(): void {
    if (this.changePasswordDto.newPassword !== this.changePasswordDto.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    this.userService.changePassword(this.changePasswordDto).subscribe(
      () => {
        alert('Password changed successfully!');
        this.closeChangePasswordPanel();
      },
      (error) => {
        console.error('Error changing password:', error);
        alert('Failed to change password.');
      }
    );
  }

  private createChart(data: SalesData[]): void {
    const canvas = document.getElementById('salesGrowthChart') as HTMLCanvasElement;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      const chart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: data.map(d => d.date),
          datasets: [{
            label: 'Total Sales',
            data: data.map(d => d.totalSales),
            borderColor: 'rgb(75, 192, 192)',
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
          }, {
            label: 'Growth',
            data: data.map(d => d.growth),
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
              // grid: {
              //   display: false // Disable grid lines
              // }
            },
            x: {
              grid: {
                display: false // Disable grid lines
              }
            }
          }
        }
      });
    } else {
      console.error('Failed to get context from canvas');
    }
  }
}