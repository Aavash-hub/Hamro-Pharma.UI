import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Vendor } from '../../models/vendor.model';
import { PaymentRequest } from '../../models/Payment-Request.model';import { AddVendorRequest } from '../../models/Add-vendor-request.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VendorService {
  private apiUrl = 'https://localhost:7144/api/vendor';

  constructor(private http: HttpClient) { }

  getAllVendors(): Observable<Vendor[]> {
    return this.http.get<Vendor[]>(this.apiUrl);
  }

  addVendor(AddVendorRequest: any): Observable<Vendor> {
    return this.http.post<Vendor>(this.apiUrl, AddVendorRequest);
  }

  getVendorById(id: string): Observable<Vendor> {
    return this.http.get<Vendor>(`${this.apiUrl}/${id}`);
  }

  editVendor(id: string, vendor: Vendor): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, vendor);
  }

  deleteVendor(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
  payVendorBalance(id: string, amount: number, p0: { responseType: string; }): Observable<any> {
    const paymentRequest: PaymentRequest = { amount };
    return this.http.put<any>(`${this.apiUrl}/pay/${id}`, paymentRequest);
  }
}