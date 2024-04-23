import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OrderDetail } from '../../models/Order-details.model';
import { Order } from '../../models/Order.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private apiUrl = 'https://localhost:7144/api/orders'

  constructor(private http: HttpClient) { }

  createOrder(orderDetails: OrderDetail[]): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'  // Ensuring the content type is set to application/json
    });
    return this.http.post<any>(this.apiUrl, orderDetails, { headers });
  }
  getOrderById(id: string): Observable<Order> {
    return this.http.get<Order>(`${this.apiUrl}/${id}`);
  }
}
