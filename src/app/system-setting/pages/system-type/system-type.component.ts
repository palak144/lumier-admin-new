import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UtilityService } from 'app/shared/utility/utility.service'; 
import { SystemSettingsService } from '../../../shared/services/system-settings.service';
import { Table } from 'primeng/table';
import { Subject } from 'rxjs';
import { takeUntil, startWith, debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { LazyLoadEvent, ConfirmationService } from 'primeng/api';
import { ExcelServiceService } from 'app/shared/services/excel-service.service';
import { CommonServiceService } from 'app/shared/services/common-service.service';
@Component({
  selector: 'app-system-type',
  templateUrl: './system-type.component.html',
  styleUrls: ['./system-type.component.scss']
})
export class SystemTypeComponent implements OnInit {
  
  
  page:number = 0;
  @ViewChild(Table) tableComponent: Table;
  @ViewChild(Table) primeNGTable: Table;
  supplyList:any[];
  totalCount: any;
  searchTerms$ = new Subject<string>();
  searchBar: any = "";
  private _unsubscribe = new Subject<boolean>();
 exportAll = "false";
  action: any;
  countries:any[];
  countryId : number = null;
  constructor(
    private router:Router, 
    private activateRoute : ActivatedRoute,
    private utilityService:UtilityService,
    private commonService:CommonServiceService,
    private SystemSettingsService:SystemSettingsService,
    private confirmationService: ConfirmationService,
    private excelService:ExcelServiceService,
  ) { }
  setStatus(id:Number,adminStatus:Number){

    let statusData = {id,adminStatus}
    
 this.SystemSettingsService.updateSellerStatus(statusData).subscribe(
   (success:any)=>
   {
   
    this.ngOnInit()
} )
  }
  ngOnInit() {
    this.initiateSearch();
    this.getCountry();
  }
  loadDataLazy(event: LazyLoadEvent) {
 
    this.page = event.first / 10;
    // if there is a search term present in the search bar, then paginate with the search term
    if (!this.searchBar && !this.countryId) {
      this.getAllSupplyType(this.page);
      
    } 
    else if(!this.countryId){
      this.getAllSupplyType(this.page);
      
          }
    else {
      this.getAllSupplysSearch(this.page, this.searchBar , this.exportAll,this.countryId);
    
    }

    
  }
  getAllSupplyType(page) {
    this.SystemSettingsService.getAllSupplyType(page).subscribe(
      (success: any) => {
        this.supplyList = success.data.results;
        this.totalCount = success.data.total;
      },
      error => {
      
        this.utilityService.resetPage();
      }
    );
  }
  initiateSearch() {
    this.searchTerms$.pipe(
      takeUntil(this._unsubscribe),
      startWith(''),
      distinctUntilChanged(),
      // switch to new search observable each time the term changes
      switchMap((term: string) => this.SystemSettingsService.getAllSupplysSearch(this.page, term ,this.exportAll,this.countryId
      ))
    ).subscribe((success: any) => {
      this.supplyList = success.data.results;
      this.totalCount = success.data.total;
      this.utilityService.resetPage();
    })
  } 
  getAllSupplysSearch(page, searchBar , exportAll ,countryId ) {
  
    
    this.SystemSettingsService.getAllSupplysSearch(page, searchBar , exportAll ,countryId)
      .pipe(
        takeUntil(this._unsubscribe)
      )
      .subscribe((success: any) => {
        this.supplyList = success.data.results;
        this.totalCount = success.data.total;
        this.utilityService.resetPage();
        if(exportAll == "true"){
   
          this.excelService.exportAsExcelFile(this.supplyList, 'Supply List')
          this.exportAll = "false"
        }
      })
  }
  filterGlobal(searchTerm) {
    // indexing starts from 0 in primeng
    this.primeNGTable.first = 0;
    this.page = 0;
    this.searchTerms$.next(searchTerm);
  } 
  getDropDownValue(event, id) { 
    if(event.currentTarget.firstChild.data === 'Delete') {

      this.confirmationService.confirm({
        message: 'Are you sure that you want to perform this action?',
        accept: () => {
          this.SystemSettingsService.deleteSupply(id).pipe(takeUntil(this._unsubscribe)).subscribe(
            (success: any) => {
              this.getAllSupplyType(this.page);
              // this.customerList = this.customerList.filter((item: any) => {
              //   return id !== item.customerId
              // })
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
          this.router.navigate(['../edit',id], {relativeTo: this.activateRoute})
          
    }
  }
  exportAsXLSX(id:number) {
   
    if (id==0){
  
      this.excelService.exportAsExcelFile(this.supplyList, 'Seller List')
      debugger
    }
    else{
    
      this.exportAll = "true"
      console.log(this.exportAll);
     this.getAllSupplysSearch(this.page, this.searchBar,this.exportAll,this.countryId);
    
    }
   }
   
   onChange(deviceValue) {
     if(deviceValue)
 { 
   this.countryId=deviceValue;
 }
   else
   {
   }
   
     this.getAllSupplysSearch(this.page, this.searchBar , this.exportAll, this.countryId);
 }
 getCountry()
 {
   this.commonService.getCountry().pipe(takeUntil(this._unsubscribe)).subscribe(
     (success:any) => {
       this.countries = success.data;
     },
     error => {
     }
   )
 }
}
