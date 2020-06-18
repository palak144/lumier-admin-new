import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-permissions',
  templateUrl: './permissions.component.html',
  styleUrls: ['./permissions.component.scss']
})
export class PermissionsComponent implements OnInit {

  userList: any[] = [];
  constructor() { }

  ngOnInit() {

    this.userList = [
      {
        id: '101',
        country: 'user1',
        group: 'usergroup',
        permission: 'permission1',
        status: 1
      },
      {
        id: '102',
        country: 'user1',
        group: 'usergroup',
        status: 1
      }
    ]
  }

}
