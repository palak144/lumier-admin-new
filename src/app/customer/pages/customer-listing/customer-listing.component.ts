import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UtilityService } from 'app/shared/utility/utility.service'; 
import { CustomerService } from '../../../shared/services/customer.service';
import { Table } from 'primeng/table';
import { Subject } from 'rxjs';
import { takeUntil, startWith, debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { LazyLoadEvent, ConfirmationService } from 'primeng/api';
import { ExcelServiceService } from 'app/shared/services/excel-service.service';

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
  actions:Action[];
  actionListFromAPI:string[];
  page:number = 0;
  customer:any;
  totalCount: number;
  action:string;
  id: number;
  Date = new Date();
  status:string
  countries:any[];

  @ViewChild(Table) tableComponent: Table;
  @ViewChild(Table) primeNGTable: Table;

   // Real time search
   searchTerms$ = new Subject<string>();
   searchBar: any = "";
   private _unsubscribe = new Subject<boolean>();
  exportAll: string = "false"

  constructor(
    private router:Router, 
    private activateRoute : ActivatedRoute,
    private utilityService:UtilityService,
    private customerService:CustomerService,
    private confirmationService: ConfirmationService,
    private excelService:ExcelServiceService,
    ) {}
    setStatus(customerId:Number,adminStatus:Number){

      let statusData = {customerId,adminStatus}
      
   this.customerService.updateCustomerStatus(statusData).subscribe(
     (success:any)=>
     {
     
     this.ngOnInit()
} )
    }

  ngOnInit() {
    
    this.initiateSearch();
  }


  initiateSearch() {
    

    this.searchTerms$.pipe(
      takeUntil(this._unsubscribe),
      startWith(''),
      distinctUntilChanged(),
      // switch to new search observable each time the term changes
      switchMap((term: string) => this.customerService.getAllCustomersSearch(this.page, term 
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
      },
      error => {
        this.utilityService.routingAccordingToError(error);
        this.utilityService.resetPage();
      }
    );
  }

  getAllCustomersSearch(page, searchBar  ,exportAll) {
    this.customerService.getAllCustomersSearch(page, searchBar, exportAll)
      .pipe(
        takeUntil(this._unsubscribe)
      )
      .subscribe((success: any) => {
        this.customerList = success.data.results;
        this.totalCount = success.data.total;
        this.utilityService.resetPage();
        
        if(exportAll == "true"){
          
          this.excelService.exportAsExcelFile(this.customerList, 'Customer List')
          this.exportAll = "false"
        }
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
      this.utilityService.loaderStop();
    } else {
      this.getAllCustomersSearch(this.page, this.searchBar, this.exportAll);
      this.utilityService.loaderStop();
    }
  }

  filterGlobal(searchTerm) {
    // indexing starts from 0 in primeng
    this.primeNGTable.first = 0;
    this.page = 0;
    this.searchTerms$.next(searchTerm);
  }

  onAddCustomer(){
    this.router.navigate(['../new'],{relativeTo : this.activateRoute})
  }

  getDropDownValue(event, id) {
    if(event.currentTarget.firstChild.data === 'Delete') {

      this.confirmationService.confirm({
        message: 'Are you sure that you want to perform this action?',
        accept: () => {
          this.customerService.deleteCustomer(id).pipe(takeUntil(this._unsubscribe)).subscribe(
            (success: any) => {
              this.getAllCustomers(this.page);
            },
            error => {
            }
          )
        },
        reject: () => {
          this.action = null;
        }
    });
     
    }
    if(event.currentTarget.firstChild.data === 'Edit'){
      
          this.router.navigate(['../','edit',id], {relativeTo: this.activateRoute})
          
    }
  }
  exportAsXLSX(id:number) {
   
   if (id==0){
     
     this.excelService.exportAsExcelFile(this.customerList, 'Customer List')
   }
   else{
     
     this.exportAll = "true"
    this.getAllCustomersSearch(this.page, this.searchBar, this.exportAll);
   }
  }

}
