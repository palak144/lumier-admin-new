import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-seller',
  templateUrl: './add-seller.component.html',
  styleUrls: ['./add-seller.component.scss']
})
export class AddSellerComponent implements OnInit {
  

  constructor() { }

  ngOnInit() {
    this.sellerTitle = "Add New Sellers";
  }

}  
