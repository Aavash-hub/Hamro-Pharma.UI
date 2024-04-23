import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DashboardDto } from '../../models/dashBoard.model';
import { Observable } from 'rxjs';
import { ExpiredDrugDto } from '../../models/ExpiredDrugDto.model';

@Injectable({
  providedIn: 'root'
})

export class DashboardService {
  private readonly apiUrl = 'https://localhost:7144/api/DashBoard';

  constructor(private http: HttpClient) {}

  getTotalSales(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/total-sales`);
  }

  getTotalPurchases(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/total-purchases`);
  }

  getCustomerCount(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/customer-count`);
  }

  getVendorCount(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/vendor-count`);
  }

  getExpiredDrugs(): Observable<ExpiredDrugDto[]> {
    return this.http.get<ExpiredDrugDto[]>(`${this.apiUrl}/expired-drugs`);
  }
}