import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../service/dashboard.service';
import { ExpiredDrugDto } from '../../models/ExpiredDrugDto.model';


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

  constructor(private dashboardService: DashboardService) {}

  ngOnInit(): void {
    this.getDashboardData();
  }

  getDashboardData(): void {
    this.dashboardService.getTotalSales().subscribe(data => {
      this.totalSales = data;
    });

    this.dashboardService.getTotalPurchases().subscribe(data => {
      this.totalPurchases = data;
    });

    this.dashboardService.getCustomerCount().subscribe(data => {
      this.numberOfCustomers = data;
    });

    this.dashboardService.getVendorCount().subscribe(data => {
      this.numberOfVendors = data;
    });

    this.dashboardService.getExpiredDrugs().subscribe(data => {
      this.expiredDrugs = data;
    });
  }
}
