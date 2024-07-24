import { Component, EventEmitter, OnDestroy, Output } from '@angular/core';
import { AddUserRequest } from '../../models/add-user-request.model';
import { Subscription } from 'rxjs/internal/Subscription';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-adduser',
  templateUrl: './adduser.component.html',
  styleUrls: ['./adduser.component.css']
})
export class AdduserComponent implements OnDestroy {
  model: AddUserRequest;
  private addUserSubscription?: Subscription;
  constructor(private userservice: UserService,private router: Router ){
    this.model ={
      name: '',
      Email: '',
      password: '',
      Number: ''
    };
  }
  @Output() success = new EventEmitter<void>();
  @Output() error = new EventEmitter<void>();
  
  onFormSubmit(){
    this.addUserSubscription = this.userservice.adduser(this.model).subscribe({
      next: () => {
        this.success.emit();
        this.router.navigateByUrl('/users').then(() => {
          window.location.reload();
        });
      },
      error: () => {
        this.error.emit();
      }
    });
  }

  ngOnDestroy(): void {
    this.addUserSubscription?.unsubscribe();
  }
}
