import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { userlist } from '../../models/userlist.model';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  
  Userlist?: userlist[];

  constructor(private Userservice: UserService){
  }

  ngOnInit(): void {
    this.Userservice.getallUser().subscribe({
      next: (response)=>{
        this.Userlist = response;
      }
    });
  }
}
