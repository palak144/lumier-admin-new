import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-banners',
  templateUrl: './banners.component.html',
  styleUrls: ['./banners.component.scss']
})
export class BannersComponent implements OnInit {

  constructor(
    private router: Router, 
    private route : ActivatedRoute,
  ) { }

  
  onAddBanner(){
    
    this.router.navigate(['../new-banner'],{relativeTo : this.route})
  }

  ngOnInit() {
  }

}
