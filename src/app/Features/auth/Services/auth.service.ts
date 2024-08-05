import { Injectable } from '@angular/core';
import { LoginRequest } from '../models/login-request.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { LoginResponse } from '../models/login-response.model';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user.model';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  $user = new BehaviorSubject<User| undefined>(undefined);

  constructor(private http: HttpClient,
    private cookieservice: CookieService
  ) { }

  login(request: LoginRequest):Observable<LoginResponse>
  {
    return this.http.post<LoginResponse>('https://localhost:7144/api/Auth/Login',{
    Email: request.email,
    password: request.password
    });

  }
  setUser (User: User): void{

    this.$user.next(User);
    localStorage.setItem('user-email', User.email);
    localStorage.setItem('user-roles', User.roles.join(','));
  }
  user(): Observable<User | undefined>{
    return this.$user.asObservable();
  }

  logout(): void {
    localStorage.clear();
    this.cookieservice.delete('Authorization', 'login');
    this.$user.next(undefined);
  }
  isLoggedIn(): boolean {
    // Check if user email exists in local storage
    const userEmail = localStorage.getItem('user-email');
    if (userEmail) {
      return true;
    }

    // Alternatively, you can check if there's a valid user object in the BehaviorSubject
    const currentUser = this.$user.getValue();
    if (currentUser) {
      return true;
    }
    return false;
  }
  hasRole(role: string): boolean {
    const roles = localStorage.getItem('user-roles');
    return roles ? roles.split(',').includes(role) : false;
  }
}
