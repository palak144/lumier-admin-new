import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UtilityService } from 'app/shared/utility/utility.service';
import { UserService } from 'app/shared/services/user.service';


@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {

  userInfo: any;

  constructor(
    private route: ActivatedRoute,
    private utilityService: UtilityService,
    private userService: UserService
  ) { }

  ngOnInit() {
    const userId = this.route.snapshot.params.id;
    this.getUserDetailByUserId(userId);
  }

  getUserDetailByUserId(userId) {
    this.utilityService.loaderStart();
    this.userService.getUserDetailByUserId({ 'userId': userId }).subscribe(
      (success: any) => {
        this.userInfo = success.data;
        this.utilityService.resetPage();
      },
      error => {
        this.utilityService.routingAccordingToError(error);
        this.utilityService.resetPage();
      }
    );
  }

}
