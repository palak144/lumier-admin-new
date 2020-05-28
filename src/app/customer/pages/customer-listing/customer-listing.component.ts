<<<<<<< HEAD
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UtilityService } from '../../../shared/utility/utility.service';
import { CustomerService } from '../../../shared/services/customer.service';
=======
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UtilityService } from 'app/shared/utility/utility.service';
import { CustomerService } from '../../../shared/services/customer.service';
import { Table } from 'primeng/table';
import { Subject } from 'rxjs';
import { takeUntil, startWith, debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { LazyLoadEvent } from 'primeng/api';
>>>>>>> d55323642e8eee6ba2b3d7b53b78e604e8c0a335

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
<<<<<<< HEAD
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

=======
  actions:Action[];
  actionListFromAPI:string[];
  page:number = 0;
  customer:any;
  totalCount: number;

  @ViewChild(Table) tableComponent: Table;
  @ViewChild(Table) primeNGTable: Table;

   // Real time search
   searchTerms$ = new Subject<string>();
   searchBar: any;
   private _unsubscribe = new Subject<boolean>();

  constructor(
    private router:Router, 
    private route : ActivatedRoute,
    private utilityService:UtilityService,
    private customerService:CustomerService
    ) {}
>>>>>>> d55323642e8eee6ba2b3d7b53b78e604e8c0a335

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
<<<<<<< HEAD
    ]
=======
    ];
>>>>>>> d55323642e8eee6ba2b3d7b53b78e604e8c0a335

    this.actionListFromAPI = ['View', 'Edit', 'Adjust Wallet','Wallet History', 'Adjust Reward Pts', 'Order History', 'Delete Customer'];
    this.actions = this.utilityService.arrayOfStringsToArrayOfObjects(this.actionListFromAPI);

<<<<<<< HEAD
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
=======
    this.initiateSearch();
  }


  initiateSearch() {
    this.searchTerms$.pipe(
      takeUntil(this._unsubscribe),
      startWith(''),
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),
      distinctUntilChanged(),
      // switch to new search observable each time the term changes
      switchMap((term: string) => this.customerService.getAllCustomers(this.page, term
      ))
    ).subscribe((success: any) => {
      this.customerList = success.data.results;
      this.totalCount = success.data.total;
      this.utilityService.resetPage();
    }, error => {
      this.utilityService.routingAccordingToError(error);
    })
  }

  getAllCustomers(page) {
    this.customerService.getAllCustomers(page).subscribe(
      (success: any) => {
        this.customerList = success.data.results;
        this.totalCount = success.data.total;
        console.log('customer:', success);
      },
      error => {
        this.utilityService.routingAccordingToError(error);
        this.utilityService.resetPage();
      }
    );
  }

  getAllCustomersSearch(page, searchBar) {
    this.customerService.getAllCustomers(page, searchBar)
      .pipe(
        takeUntil(this._unsubscribe)
      )
      .subscribe((success: any) => {
        this.customerList = success.data.results;
        this.totalCount = success.data.total;
        this.utilityService.resetPage();
      }, error => {
        this.utilityService.routingAccordingToError(error);
      })

  }





  loadDataLazy(event: LazyLoadEvent) {
    this.utilityService.loaderStart();
    this.page = event.first / 10;
    // if there is a search term present in the search bar, then paginate with the search term
    if (!this.searchBar) {
      this.getAllCustomers(this.page);
    } else {
      this.getAllCustomersSearch(this.page, this.searchBar);
    }
  }

  filterGlobal(searchTerm) {
    // indexing starts from 0 in primeng
    this.primeNGTable.first = 0;
    this.page = 0;
    this.searchTerms$.next(searchTerm);
  }


  // clearInput() {
  //   this.searchBar = null;
  //   this.getAllCustomers(this.page);
  // }

  onAddCustomer(){
    this.router.navigate(['new'],{relativeTo : this.route})
>>>>>>> d55323642e8eee6ba2b3d7b53b78e604e8c0a335
  }
}
