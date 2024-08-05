import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AddUserRequest } from '../../models/add-user-request.model';
import { Observable } from 'rxjs';
import { userlist } from '../../models/userlist.model';
import { ChangePasswordDto } from '../../models/Change-password-user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl ='https://localhost:7144/api/User';

  constructor(private http: HttpClient) { }

  adduser(model: AddUserRequest): Observable<void> {
    return this.http.post<void>(`https://localhost:7144/api/auth/Adduser`, model);
  }

  getallUser(): Observable<userlist[]> {
    return this.http.get<userlist[]>(this.apiUrl);
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
  changePassword(changePasswordDto: ChangePasswordDto): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/changepassword`, changePasswordDto);
  }
}



