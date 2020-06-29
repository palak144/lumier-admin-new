import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-seller-listing',
  templateUrl: './seller-listing.component.html',
  styleUrls: ['./seller-listing.component.scss']
})
export class SellerListingComponent implements OnInit {

  customerList:any;

  constructor() { }

  ngOnInit() {

    this.customerList=
    [
      {
        sellerId: '1',
        country: 'India',
        sellerName: 'Arihant',
        mobileNumber: '9039621870',
        Email:"arihant@gmail.com",
        pay32Sme: 'yes',
      }
      
    ]
  }

}
