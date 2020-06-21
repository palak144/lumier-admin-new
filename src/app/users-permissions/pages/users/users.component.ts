import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  userList:any[] = [];
  constructor() { }

  ngOnInit() {

    this.userList = [
      {
        id: '101',
        fullname: 'user1',
        group: 'usergroup',
        status: 1
      },
      {
        id: '102',
        fullname: 'user1',
        group: 'usergroup',
        status: 1
      }
    ]
  }

}
