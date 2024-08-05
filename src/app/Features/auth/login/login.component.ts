import { Component } from '@angular/core';
import { LoginRequest } from '../models/login-request.model';
import { AuthService } from '../Services/auth.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { DashboardService } from '../../DashBoard/service/dashboard.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  model: LoginRequest;
  errorMessage: string = '';  // Add this line

  constructor(
    private authService: AuthService, 
    private cookieService: CookieService,
    private router: Router
  ) {
    this.model = {
      email: '',
      password: ''
    }
  }

  onFormSubmit(): void {
    this.authService.login(this.model).subscribe({
      next: (response) => {
        this.cookieService.set('Authorization', `Bearer ${response.token}`,
          undefined, '/', undefined, true, 'Strict'
        );
        this.authService.setUser({
          email: response.email,
          roles: response.roles
        });

        if (response.roles.includes('Writer')) {
          this.router.navigateByUrl('/Dashboard').then(() => window.location.reload());
        } else if (response.roles.includes('Reader')) {
          this.router.navigateByUrl('/Order').then(() => window.location.reload());
        } else {
          this.router.navigateByUrl('/').then(() => window.location.reload());
        }
      },
      error: (error) => {
        this.errorMessage = 'Invalid email or password';  // Set error message
        console.error('Login failed', error);
      }
    });
  }
}
