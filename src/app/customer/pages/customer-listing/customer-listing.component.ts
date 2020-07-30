import { Component, OnInit, ViewChild , Inject,LOCALE_ID} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UtilityService } from 'app/shared/utility/utility.service'; 
import { CustomerService } from '../../../shared/services/customers/customer.service';
import { Table } from 'primeng/table';
import { Subject } from 'rxjs';
import { takeUntil, startWith, debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { LazyLoadEvent, ConfirmationService } from 'primeng/api';
import { ExcelServiceService } from 'app/shared/services/excel-service.service';
import { formatDate } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

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
  exportData: any;
  exportAllData: any[];
  customerListExport: any;

  constructor(
    @Inject(LOCALE_ID) private locale: string,
        private router:Router, 
        private toastr: ToastrService,
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
    this.exportAllData = [];
    this.exportData = [];
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
      this.toastr.error(error.message)
    })
  }


  getAllCustomers(page) {
    this.customerService.getAllCustomers(page).subscribe(
      (success: any) => {
        this.customerList = success.data.results;
        this.totalCount = success.data.total;
       
      },
      error => {
        this.toastr.error(error.message)
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
          
        if(exportAll == "true"){
          
          this.customerListExport = [];
          this.customerListExport = success.data.results;
          this.customerListExport.forEach(element=>{
            this.exportAllData.push({
              Title : element.title,
              first_Name:element.firstName,
              last_Name : element.lastName,
              Email : element.Email,
              Mobile_Number : element.mobileNumber,
              Clinic_Name : element.clinicName,
              Registration_Date : formatDate(element.created_at,'yyyy-MM-dd',this.locale),
              Admin_Status : element.adminStatus,
              Customer_Id : element.customerId,
              Country_Code : element.countryCode,
            })
          })
          
          this.excelService.exportAsExcelFile(this.exportAllData, 'Customer List')
          this.exportAll = "false"
          this.exportAllData= [];
        }
        else{
          this.customerList = success.data.results;
        this.totalCount = success.data.total;
        this.utilityService.resetPage();
        }
      }, error => {
        this.toastr.error(error.message)
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
              this.toastr.error(error.message)
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
    this.customerList.forEach(element=>{
      this.exportData.push({
        Title : element.title,
        first_Name:element.firstName,
        last_Name : element.lastName,
        Email : element.Email,
        Mobile_Number : element.mobileNumber,
        Clinic_Name : element.clinicName,
        Registration_Date : formatDate(element.created_at,'yyyy-MM-dd',this.locale),
        Admin_Status : element.adminStatus,
        Customer_Id : element.customerId,
        Country_Code : element.countryCode,
      })
    })
    
    this.excelService.exportAsExcelFile(this.exportData, 'Customer List')
    this.exportData= [];
   }
   else{
     
     this.exportAll = "true"
    this.getAllCustomersSearch(this.page, this.searchBar, this.exportAll);
   }
  }

}
