import { HttpClient, HttpErrorResponse } from '@angular/common/http';
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
 
  addTransaction(transactionDto: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/add`, transactionDto).pipe(
      catchError(this.handleError)
    );
}

private handleError(error: HttpErrorResponse) {
    // User-friendly error message to display
    const message = `An error occurred: ${error.error.message || "Unknown error"}`;
    console.error(message);
    
    // You might want to output the whole error to the console for debug purposes
    console.error(error);
    
    return throwError(() => new Error(message));
}

}
