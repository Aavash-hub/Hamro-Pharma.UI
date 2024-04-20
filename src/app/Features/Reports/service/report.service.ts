import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PurchaseReport } from '../../models/PurchaseReport.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  private apiUrl = 'api/purchase'; // Adjust the URL based on your backend API endpoint

  constructor(private http: HttpClient) { }

  // Method to fetch purchase report
  getPurchaseReport(): Observable<PurchaseReport[]> {
    return this.http.get<PurchaseReport[]>(this.apiUrl);
  }
}
