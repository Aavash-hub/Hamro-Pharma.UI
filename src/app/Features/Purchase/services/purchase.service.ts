import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Purchase } from '../../models/Purchase.model';


@Injectable({
  providedIn: 'root'
})
export class PurchaseService {

  private apiUrl = 'api/purchase';

  constructor(private http: HttpClient) { }

  makePurchase(purchaseDto: any): Observable<Purchase> {
    return this.http.post<Purchase>(`${this.apiUrl}`, purchaseDto);
  }

  getPurchaseById(id: string): Observable<Purchase> {
    return this.http.get<Purchase>(`${this.apiUrl}/${id}`);
  }
}
