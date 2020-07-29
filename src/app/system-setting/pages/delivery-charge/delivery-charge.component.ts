import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-delivery-charge',
  templateUrl: './delivery-charge.component.html',
  styleUrls: ['./delivery-charge.component.scss']
})
export class DeliveryChargeComponent implements OnInit {

  constructor(
    private router: Router, 
    private route : ActivatedRoute,
  ) { }

  onAddDeliverycharge(){
    
    this.router.navigate(['../new-delivery-charge'],{relativeTo : this.route})
  }

  ngOnInit() {
  }

}
