import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DashboardDto } from '../../models/dashBoard.model';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { ExpiredDrugDto } from '../../models/ExpiredDrugDto.model';

@Injectable({
  providedIn: 'root'
})

export class DashboardService {
  private readonly apiUrl = 'https://localhost:7144/api/DashBoard';

  constructor(private http: HttpClient) {}

  getTotalSales(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/total-sales`).pipe(
      tap(data => console.log('Total Sales:', data)), // Log the data being received
      catchError((error: any) => {
        console.error('Error getting total sales', error);
        return throwError(() => new Error('Failed to get total sales'));
      })
    );
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