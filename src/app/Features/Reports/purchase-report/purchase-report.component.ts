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
    if (!(this.selectedDate instanceof Date) || isNaN(this.selectedDate.getTime())) {
        console.error('Selected date is not a valid Date object.');
        return; // Exit the function if the selectedDate is not a valid Date
    }
    // Continue with filtering logic
}
}
