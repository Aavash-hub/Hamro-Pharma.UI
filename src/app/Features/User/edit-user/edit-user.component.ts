import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UserService } from '../services/user.service';
import { userlist } from '../../models/userlist.model';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {

  @Input() user: userlist = {
    id: '',
    userName: '',
    email: '',
    phoneNumber: ''
  };
  @Output() success = new EventEmitter<void>();
  @Output() error = new EventEmitter<void>();
  showEditUserForm: boolean = true;

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    if (!this.user.id) {
      const userId = this.route.snapshot.paramMap.get('id');
      if (userId) {
        this.userService.getUserById(userId).subscribe({
          next: (user) => {
            this.user = user;
          },
          error: (error) => {
            this.error.emit();
            console.error('Failed to retrieve user:', error);
          }
        });
      } else {
        console.error('User id is undefined');
      }
    }
  }

  saveUser(): void {
    this.userService.editUser(this.user.id, this.user).subscribe({
      next: () => {
        this.success.emit();
        this.router.navigateByUrl('/users').then(() => {
          window.location.reload();
        });
      },
      error: (error) => {
        this.error.emit();
        console.error('Failed to update user:', error);
      }
    });
  }

  closeEditUserForm(): void {
    this.showEditUserForm = false;
  }
}
