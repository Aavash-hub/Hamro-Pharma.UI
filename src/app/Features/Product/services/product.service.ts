import { Injectable } from '@angular/core';
import { AddProductRequest } from '../../models/add-product-request.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  addProduct(model: AddProductRequest): Observable<void> {
    return this.http.post<void>('https://localhost:44300/api/Product/AddProduct', model);
  }
}
