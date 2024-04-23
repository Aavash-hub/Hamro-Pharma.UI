import { Component, OnInit } from '@angular/core';
import { ReportService } from '../service/report.service';
import { SalesReportDto } from '../../models/sales-report.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-sales-report',
  templateUrl: './sales-report.component.html',
  styleUrls: ['./sales-report.component.css']
})
export class SalesReportComponent implements OnInit {
  salesReport$!: Observable<SalesReportDto[]>;

  constructor(private salesReportService: ReportService) { }

  ngOnInit(): void {
    this.fetchSalesReport();
  }

  fetchSalesReport(): void {
    this.salesReport$ = this.salesReportService.getSalesReport();
  }
}

