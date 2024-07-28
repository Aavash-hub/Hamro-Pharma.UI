import { Component, OnInit } from '@angular/core';
import { ReportService } from '../service/report.service';
import { SalesReportDto } from '../../models/sales-report.model';
import { BehaviorSubject, combineLatest, map, Observable } from 'rxjs';

@Component({
  selector: 'app-sales-report',
  templateUrl: './sales-report.component.html',
  styleUrls: ['./sales-report.component.css']
})
export class SalesReportComponent implements OnInit {
  salesReports: SalesReportDto[] = [];
  filteredSalesReports: SalesReportDto[] = [];
  paginatedSalesReports: SalesReportDto[] = [];
  selectedDate: string = '';
  currentPage = 1;
  itemsPerPage = 10;
  totalPages = 0;

  constructor(private reportService: ReportService) {}

  ngOnInit(): void {
    this.loadSalesReports();
  }

  loadSalesReports(): void {
    this.reportService.getSalesReport().subscribe({
      next: (reports: SalesReportDto[]) => {
        this.salesReports = reports;
        this.filteredSalesReports = [...reports];
        this.updatePagination();
      },
      error: (error) => {
        console.error("Error loading sales reports:", error);
      }
    });
  }

  filterSalesReports(): void {
    if (!this.selectedDate) {
      this.filteredSalesReports = [...this.salesReports];
    } else {
      const selectedDateString = new Date(this.selectedDate).toISOString().split('T')[0];
      this.filteredSalesReports = this.salesReports.filter(report => {
        const reportDate = new Date(report.transactionDate).toISOString().split('T')[0];
        return reportDate === selectedDateString;
      });
    }
    this.currentPage = 1;
    this.updatePagination();
  }

  updatePagination(): void {
    this.totalPages = Math.ceil(this.filteredSalesReports.length / this.itemsPerPage);
    this.setPage(this.currentPage);
  }

  setPage(page: number): void {
    const start = (page - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    this.paginatedSalesReports = this.filteredSalesReports.slice(start, end);
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePagination();
    }
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePagination();
    }
  }
}

