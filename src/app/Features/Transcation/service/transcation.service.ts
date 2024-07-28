import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, catchError, throwError } from 'rxjs';
import { Transaction } from '../../models/Transcation.model';
import { TransactionDto } from '../../models/TranscationDto.model';

@Injectable({
  providedIn: 'root'
})
export class TranscationService {
  private apiUrl = "https://localhost:7144/api/transcation";

  constructor(private http: HttpClient) {}
 

  addTransaction(orderId: string, transactionDto: TransactionDto): Observable<Transaction> {
    const url = `${this.apiUrl}/${orderId}`;  // Changed from `/add/${orderId}` to `/${orderId}`
    return this.http.post<Transaction>(url, transactionDto)
      .pipe(
        catchError(this.handleError)
      );
  }
  private handleError(error: any) {
    console.error('An error occurred:', error);
    // More detailed error handling would go here
    return throwError(() => new Error('An error occurred while processing your request'));
  }
}