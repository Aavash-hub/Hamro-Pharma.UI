import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {

    user: any = {
      id: '',
      username: '',
      email: '',
      phoneNumber: ''
    };
  
    constructor(
      private userService: UserService,
      private route: ActivatedRoute,
      private router: Router
    ) { }
  
    ngOnInit(): void {
      const userId = this.route.snapshot.paramMap.get('id');
      if (userId) {
        this.userService.getUserById(userId).subscribe({
          next: (user) => {
            this.user = user;
          },
          error: (error) => {
            console.error('Failed to retrieve user:', error);
          }
        });
      } else {
        console.error('User id is undefined');
        // Handle the case where userId is undefined, e.g., display an error message
      }
    }
    
  
    saveUser(): void {
      this.userService.editUser(this.user.id, this.user).subscribe({
        next: () => {
          this.router.navigate(['/users']);
        },
        error: (error) => {
          console.error('Failed to update user:', error);
        }
      });
    }
}
