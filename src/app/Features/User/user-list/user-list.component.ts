import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { userlist } from '../../models/userlist.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  
  Userlist?: userlist[];
  showAddUserForm: boolean = false;

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.userService.getallUser().subscribe({
      next: (response: userlist[]) => {
        this.Userlist = response;
      },
      error: (error) => {
        console.error('Error fetching users:', error);
      }
    });
  }

editUser(userId: string): void {
    if (userId) {
        this.router.navigate(['/user/edit', userId]);
    } else {
        console.error("Invalid user id:", userId);
    }
}


  deleteUser(id: string): void {
    if (confirm('Are you sure you want to delete this user?')) {
      this.userService.deleteUser(id).subscribe({
        next: () => {
          console.log('User deleted successfully.');
          // Remove the deleted user from the user list
          this.Userlist = this.Userlist?.filter(user => user.id !== id);
        },
        error: (error) => {
          console.error('Error deleting user:', error);
        }
      });
    }
  }
  toggleAddUserForm(): void {
    this.showAddUserForm = !this.showAddUserForm;
  }
}
