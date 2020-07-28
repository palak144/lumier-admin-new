import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-banner',
  templateUrl: './add-banner.component.html',
  styleUrls: ['./add-banner.component.scss']
})
export class AddBannerComponent implements OnInit {
  bannerTitle:string;
  position: string[];

  constructor() { }

  ngOnInit() {
    {
      this.bannerTitle = "Add New Banner";
      this.position = ['Dental', 'Madical'];
      
    }
  }

}
