import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-customer-listing',
  templateUrl: './customer-listing.component.html',
  styleUrls: ['./customer-listing.component.scss']
})
export class CustomerListingComponent implements OnInit {

  customerList:any[];
  constructor(private router:Router, private route : ActivatedRoute) {}

  ngOnInit() {
    this.customerList = [
      {
        id:101,
        name: 'Cusotmer 1',
        email: 'customer@engineerbabu.in',
        mobile: '1234567890',
        clinic: 'abcc',
        register: '12/01/2020',
        status: 'active'
      },
      {
        id:102,
        name: 'Cusotmer 1',
        email: 'customer@engineerbabu.in',
        mobile: '1234567890',
        clinic: 'abcc',
        register: '12/01/2020',
        status: 'active'
      },
      {
        id:103,
        name: 'Cusotmer 1',
        email: 'customer@engineerbabu.in',
        mobile: '1234567890',
        clinic: 'abcc',
        register: '12/01/2020',
        status: 'active'
      }
    ]
  }
  onAddCustomer(){
    debugger
    this.router.navigate(['new'],{relativeTo : this.route})
  }
}
