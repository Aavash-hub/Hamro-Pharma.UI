import { Component, OnDestroy } from '@angular/core';
import { AddUserRequest } from '../../models/add-user-request.model';
import { Subscription } from 'rxjs/internal/Subscription';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-adduser',
  templateUrl: './adduser.component.html',
  styleUrls: ['./adduser.component.css']
})
export class AdduserComponent implements OnDestroy {
  model: AddUserRequest;
  private addUserSubscription?: Subscription;
  constructor(private userservice: UserService){
    this.model ={
      name: '',
      Email: '',
      password: '',
      Number: ''
    };
  }
  onFormSubmit(){
    this.addUserSubscription = this.userservice.adduser(this.model).subscribe({
      next: (Response)=>{
        console.log("User add sucessfully")
      },
      error: (error)=>{
        console.log("therer was an error while adding User")
      }
    })
  }
  ngOnDestroy(): void {
    this.addUserSubscription?.unsubscribe();
  }
}
