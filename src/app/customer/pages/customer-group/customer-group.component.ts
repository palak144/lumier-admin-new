import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Table } from 'primeng/table';
import { Subject } from 'rxjs';
import { takeUntil, startWith, debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { CustomerService } from '../../../shared/services/customer.service';
import { UtilityService } from '../../../shared/utility/utility.service';
import { LazyLoadEvent } from 'primeng/api';

interface Action {
  name: string,
  code: string
}

@Component({
  selector: 'app-customer-group',
  templateUrl: './customer-group.component.html',
  styleUrls: ['./customer-group.component.scss']
})
export class CustomerGroupComponent implements OnInit {

  
  customerList:any[];
  actions:Action[];
  actionListFromAPI:string[];
  totalCount: number;
  page: number = 0;
  searchKey: string;
  searchValue: string;

  @ViewChild(Table) tableComponent: Table;
  @ViewChild(Table) primeNGTable: Table;

   // Real time search
   searchTerms$ = new Subject<string>();
   searchBar: any;
   private _unsubscribe = new Subject<boolean>();

  constructor(
    private router: Router, 
    private route : ActivatedRoute,
    private customerService: CustomerService,
    private utilityService: UtilityService
    ) {}

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

    this.actionListFromAPI = ['View', 'Edit', 'Delete'];
    this.actions = this.utilityService.arrayOfStringsToArrayOfObjects(this.actionListFromAPI);

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
      switchMap((term: string) => this.customerService.getCustomerGroupParams(this.page, term
      ))
    ).subscribe((success: any) => {
      this.customerList = success.data.results;

      this.totalCount = success.data.total;
      this.utilityService.resetPage();
    }, error => {
      this.utilityService.routingAccordingToError(error);
    })
  }


  getAllCustomers() {
    this.customerService.getCustomerGroup().subscribe(
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
    this.customerService.getCustomerGroupParams(page, searchBar)
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

  filterGlobal(searchTerm) {
    // indexing starts from 0 in primeng
    this.primeNGTable.first = 0;
    this.page = 0;
    this.searchTerms$.next(searchTerm);
  }


  loadDataLazy(event: LazyLoadEvent) {
    this.utilityService.loaderStart();
    this.page = event.first / 10;
    // if there is a search term present in the search bar, then paginate with the search term
    if (!this.searchBar) {
      this.getAllCustomers();
    } else {
      this.getAllCustomersSearch(this.page, this.searchBar);
    }
  }

  onAddCustomerGroup(){
    this.router.navigate(['../newGroup'],{relativeTo : this.route})
  }

  getDropdownValue(event, id) {
    console.log('event target value', event.value);
    if(event.value === 'Delete') {

      console.log('delete id', id);
      this.customerService.deleteCustomer(id).pipe(takeUntil(this._unsubscribe)).subscribe(
        (success: any) => {
          console.log(success);
          this.initiateSearch();
        },
        error => {
          console.log(error);
        }
      )
    }
  }

}
