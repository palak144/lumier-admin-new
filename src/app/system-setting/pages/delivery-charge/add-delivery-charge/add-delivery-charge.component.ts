import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-delivery-charge',
  templateUrl: './add-delivery-charge.component.html',
  styleUrls: ['./add-delivery-charge.component.scss']
})
export class AddDeliveryChargeComponent implements OnInit {
  deliveryChargeTitle:string; 

  constructor() { }

  ngOnInit() {
    this.deliveryChargeTitle = "Add New Delivery Charge";
  }

}
