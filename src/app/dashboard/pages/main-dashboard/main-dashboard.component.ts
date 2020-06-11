import { Component, OnInit } from '@angular/core';
import { UtilityService } from 'app/shared/utility/utility.service';
import { DashboardService } from 'app/shared/services/dashboard.service';

// export interface Chart {
//   type: ChartType;
//   data: Chartist.IChartistData;
//   options?: any;
//   responsiveOptions?: any;
//   events?: ChartEvent;
// }

@Component({
  selector: 'app-main-dashboard',
  templateUrl: './main-dashboard.component.html',
  styleUrls: ['./main-dashboard.component.scss']
})
export class MainDashboardComponent implements OnInit {

  dashboard: any;
  Chart: any

  constructor(
    private utilityService: UtilityService,
    private dashboardService: DashboardService
  ) { }

  ngOnInit() {
    // this.dashboardStats();
  }

  // dashboardStats() {
  //   this.utilityService.loaderStart();
  //   this.dashboardService.dashboard().subscribe(
  //     (success: any) => {
  //       this.dashboard = success.data;
  //       // console.log(this.dashboard);
  //       this.utilityService.resetPage();
  //     },
  //     error => {
  //       this.utilityService.routingAccordingToError(error);
  //       this.utilityService.resetPage();
  //     }
  //   );

  // }


}
