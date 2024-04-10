import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AddUserRequest } from '../../models/add-user-request.model';
import { Observable } from 'rxjs';
import { userlist } from '../../models/userlist.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  adduser(model: AddUserRequest): Observable<void>{
    return this.http.post<void>('https://localhost:7144/api/Auth/Adduser',model);
  }
  getallUser(): Observable<userlist[]>{
    return this.http.get<userlist[]>('https://localhost:7144/api/user');
  }
}
