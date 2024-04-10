import { Component } from '@angular/core';
import { AuthService } from './Features/auth/Services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private authservices: AuthService){}

  title = 'HP-UI';

  isLoggedIn(): boolean {
    // Implement your authentication logic here
    return this.authservices.isLoggedIn();
  }
}
