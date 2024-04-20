import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AddUserRequest } from '../../models/add-user-request.model';
import { Observable } from 'rxjs';
import { userlist } from '../../models/userlist.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'https://localhost:7144/api/user';

  constructor(private http: HttpClient) { }

  adduser(model: AddUserRequest): Observable<void>{
    return this.http.post<void>('https://localhost:7144/api/Auth/Adduser',model);
  }
  getallUser(): Observable<userlist[]>{
    return this.http.get<userlist[]>('https://localhost:7144/api/user');
  }
  editUser(id: string, userDto: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, userDto);
  }
  deleteUser(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
  getUserById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }
}
