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

  Userlist: userlist[] = [];
  filteredUserList: userlist[] = [];
  showAddUserForm: boolean = false;
  showEditUserForm: boolean = false;
  selectedUser: userlist = {
    id: '',
    userName: '',
    email: '',
    phoneNumber: ''
  };
  currentPage = 1;
  itemsPerPage = 5;
  totalPages = 1;
  searchQuery = '';
  showSuccessDialog = false;
  showErrorDialog = false;

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.userService.getallUser().subscribe({
      next: (response: userlist[]) => {
        console.log('Users loaded:', response);
        this.Userlist = response;
        this.filteredUserList = response;
        this.totalPages = Math.ceil(this.filteredUserList.length / this.itemsPerPage);
      },
      error: (error) => {
        console.error('Error fetching users:', error);
      }
    });
  }

  editUser(user: userlist): void {
    console.log('Editing user:', user);
    this.selectedUser = user;
    this.showEditUserForm = true;
  }

  closeEditUserForm(): void {
    this.showEditUserForm = false;
  }

  deleteUser(id: string): void {
    console.log('Deleting user with ID:', id);
    if (confirm('Are you sure you want to delete this user?')) {
      this.userService.deleteUser(id).subscribe({
        next: () => {
          console.log('User deleted successfully.');
          this.Userlist = this.Userlist.filter(user => user.id !== id);
          this.filteredUserList = this.filteredUserList.filter(user => user.id !== id);
          this.totalPages = Math.ceil(this.filteredUserList.length / this.itemsPerPage);
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

  searchUsers(): void {
    this.filteredUserList = this.Userlist.filter(user => 
      user.userName.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
      user.phoneNumber.includes(this.searchQuery)
    );
    this.totalPages = Math.ceil(this.filteredUserList.length / this.itemsPerPage);
    this.currentPage = 1;
  }

  get paginatedUsers(): userlist[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.filteredUserList.slice(startIndex, endIndex);
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  onAddUserSuccess(): void {
    this.showSuccessDialog = true;
    this.loadUsers();
  }

  onAddUserError(): void {
    this.showErrorDialog = true;
  }

  onEditUserSuccess(): void {
    this.showSuccessDialog = true;
    this.loadUsers();
  }

  onEditUserError(): void {
    this.showErrorDialog = true;
  }

  closeSuccessDialog(): void {
    this.showSuccessDialog = false;
  }

  closeErrorDialog(): void {
    this.showErrorDialog = false;
  }
}
