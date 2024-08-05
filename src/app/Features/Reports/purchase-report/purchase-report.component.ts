import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { PurchaseReport } from '../../models/PurchaseReport.model';
import { ReportService } from '../service/report.service';


@Component({
  selector: 'app-purchase-report',
  templateUrl: './purchase-report.component.html',
  styleUrls: ['./purchase-report.component.css']
})
export class PurchaseReportComponent implements OnInit {
  purchaseReports: PurchaseReport[] = [];
  filteredPurchaseReports: PurchaseReport[] = [];
  paginatedPurchaseReports: PurchaseReport[] = [];
  selectedDate: string = '';
  currentPage = 1;
  itemsPerPage = 10;
  totalPages = 0;

  constructor(private reportService: ReportService) {}

  ngOnInit(): void {
    this.loadPurchaseReports();
  }

  loadPurchaseReports(): void {
    this.reportService.getPurchaseReport().subscribe({
      next: (reports: PurchaseReport[]) => {
        this.purchaseReports = reports;
        this.filteredPurchaseReports = [...this.purchaseReports];
        this.updatePagination();
      },
      error: (error) => {
        console.error("Error loading purchase reports:", error);
      }
    });
  }

  filterPurchaseReports(): void {
    if (!this.selectedDate) {
      this.filteredPurchaseReports = [...this.purchaseReports];
    } else {
      this.filteredPurchaseReports = this.purchaseReports.filter(report => {
        return report.purchasedate === this.selectedDate;
      });
    }
    this.currentPage = 1;
    this.updatePagination();
  }

  updatePagination(): void {
    this.totalPages = Math.ceil(this.filteredPurchaseReports.length / this.itemsPerPage);
    this.setPage(this.currentPage);
  }

  setPage(page: number): void {
    this.currentPage = page;
    const start = (page - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    this.paginatedPurchaseReports = this.filteredPurchaseReports.slice(start, end);
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.setPage(this.currentPage - 1);
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.setPage(this.currentPage + 1);
    }
  }
}
