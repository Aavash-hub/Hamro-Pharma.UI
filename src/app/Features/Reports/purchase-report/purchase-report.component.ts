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
  purchaseReport$!: Observable<PurchaseReport[]>;
  filteredPurchaseReport: PurchaseReport[] = [];
  selectedDate: Date = new Date();

  constructor(private reportService: ReportService) { }

  ngOnInit(): void {
    this.loadPurchaseReport();
  }

  loadPurchaseReport(): void {
    this.purchaseReport$ = this.reportService.getPurchaseReport();
    this.purchaseReport$.subscribe(data => {
      this.filteredPurchaseReport = data;
    });
  }

  filterPurchaseReport(): void {
    const selectedDateString = this.selectedDate.toISOString().slice(0, 10);
    this.filteredPurchaseReport = this.filteredPurchaseReport.filter(purchase => {
      return purchase.purchaseDate.toISOString().slice(0, 10) === selectedDateString;
    });
  }
}
