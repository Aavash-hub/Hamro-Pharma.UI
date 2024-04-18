import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Products } from '../../models/Product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private apiUrl = 'https://localhost:7144/api/Product';

  constructor(private http: HttpClient) { }

  getAllProducts(): Observable<Products[]> {
    return this.http.get<Products[]>(this.apiUrl);
  }

  addProduct(AddProductRequest: any): Observable<Products> {
    return this.http.post<Products>(this.apiUrl, AddProductRequest);
  }

  getProductById(id: string): Observable<Products> {
    return this.http.get<Products>(`${this.apiUrl}/${id}`);
  }

  editProduct(id: string, productDto: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, productDto);
  }

  deleteProduct(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}
