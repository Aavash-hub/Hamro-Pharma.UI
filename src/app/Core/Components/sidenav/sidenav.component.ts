import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Features/auth/Services/auth.service';
import { User } from 'src/app/Features/auth/models/user.model';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {
  isReportMenuOpen = false;
  user?: User;

  constructor(public authservice: AuthService, private router: Router) {}

  toggleReportMenu() {
    this.isReportMenuOpen = !this.isReportMenuOpen;
  }

  ngOnInit(): void {
    this.authservice.user().subscribe({
      next: (response) => {
        this.user = response;
      }
    });
  }

  onLogout(): void {
    this.authservice.logout();
    this.router.navigateByUrl('login');
  }
}
