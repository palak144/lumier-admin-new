import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UtilityService } from 'app/shared/utility/utility.service';
import { CustomerService } from '../../../shared/services/customer.service';
import { ExcelServiceService } from '../../../shared/services/excel-service.service';
import { Table } from 'primeng/table';
import { Subject } from 'rxjs';
import { takeUntil, startWith, debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { LazyLoadEvent } from 'primeng/api';
import { ToastrService } from 'ngx-toastr';

interface Action {
  name:string,
  code:string
}
interface Status {
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
  page:number = 0;
  customer:any;
  totalCount: number;
  id: number;
  Date = new Date();
  status:string

  @ViewChild(Table) tableComponent: Table;
  @ViewChild(Table) primeNGTable: Table;

   // Real time search
   searchTerms$ = new Subject<string>();
   searchBar: any;
   private _unsubscribe = new Subject<boolean>();
  paging: number;

  constructor(
    private router:Router, 
    private activatedRoute : ActivatedRoute,
    private utilityService:UtilityService,
    private customerService:CustomerService,
    private excelService:ExcelServiceService,
    private toastr: ToastrService,

    ) {}

    setStatus(customerId:Number,adminStatus:Number, event: LazyLoadEvent){

      let statusData = {customerId,adminStatus}
      
   this.customerService.updateCustomerStatus(statusData).subscribe(
     (success:any)=>
     {
       debugger
     this.getAllCustomers(this.page)
} )
    }
  ngOnInit() {
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
    debugger
    this.customerService.getAllCustomers(page).subscribe(
      (success: any) => {
        this.customerList = success.data.results;
        this.totalCount = success.data.total;
        console.log('customer:', success);
      },
      error => {
        debugger
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
    this.router.navigate(['../new'],{relativeTo : this.activatedRoute})
  }
  getDropDownValue(e,id:number){
    if(e.currentTarget.firstChild.data === 'Edit'){
      this.router.navigate(['../',id,'edit'], {relativeTo: this.activatedRoute})
    }
    if(e.currentTarget.firstChild.data.value === 'Delete') {	
      console.log('delete id', id);	
      this.customerService.deleteCustomer(id).pipe(takeUntil(this._unsubscribe)).subscribe(	
        (success: any) => {	
          console.log(success);	
          this.customerList = this.customerList.filter((item: any) => {	
            return id !== item.customerId	
          })	
        },	
        error => {	
          console.log(error);	
        }	
      )	
    }
  }
  exportAsXLSX():void {
    this.excelService.exportAsExcelFile(this.customerList, 'Customers List');
  }
}
