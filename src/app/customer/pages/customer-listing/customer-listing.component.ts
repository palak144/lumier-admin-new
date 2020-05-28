import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UtilityService } from '../../../shared/utility/utility.service';
import { CustomerService } from '../../../shared/services/customer.service';

interface Action {
  name:string,
  code:string
}

@Component({
  selector: 'app-customer-listing',
  templateUrl: './customer-listing.component.html',
  styleUrls: ['./customer-listing.component.scss']
})
export class CustomerListingComponent implements OnInit {

  customerList:any[];
  sectionTitle:any;
  actions:Action[];
  actionListFromAPI:string[];
  page:number = 1;
  customer:any;


  constructor(
    private router: Router,
    private activateRoute:ActivatedRoute,
    private utilityService:UtilityService,
    private customerService: CustomerService
  ) { 
    this.sectionTitle = this.activateRoute.snapshot.data;
    console.log('section title::', this.sectionTitle);
  }


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

    this.actionListFromAPI = ['View', 'Edit', 'Adjust Wallet','Wallet History', 'Adjust Reward Pts', 'Order History', 'Delete Customer'];
    this.actions = this.utilityService.arrayOfStringsToArrayOfObjects(this.actionListFromAPI);

    this.getAllCustomers(this.page);
  }

  getAllCustomers(page) {
    debugger
    this.customerService.getAllCustomers(page).subscribe(
      (success: any) => {
        debugger
        this.customer = success.data;
        console.log('customer:', this.customer);
      },
      error => {
        debugger
        this.utilityService.routingAccordingToError(error);
        this.utilityService.resetPage();
      }
    );
  }

  onAddCustomer(){
    debugger
    this.router.navigate(['../new'],{relativeTo : this.activateRoute})
  }
}
