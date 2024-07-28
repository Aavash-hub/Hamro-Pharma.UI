import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PurchaseReport } from '../../models/PurchaseReport.model';
import { Observable } from 'rxjs';
import { SalesReportDto } from '../../models/sales-report.model';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  private apiUrl = 'https://localhost:7144/api/purchase';
  private salesReportUrl = 'https://localhost:7144/api/Transcation/report';

  constructor(private http: HttpClient) { }

  // Method to fetch purchase report
  getPurchaseReport(): Observable<PurchaseReport[]> {
    return this.http.get<PurchaseReport[]>(this.apiUrl);
  }

  getSalesReport(): Observable<SalesReportDto[]> {
    return this.http.get<SalesReportDto[]>(this.salesReportUrl);
  }
}