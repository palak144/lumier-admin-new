import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UtilityService } from 'app/shared/utility/utility.service'; 
import { SellerService } from '../../../shared/services/seller.service';
import { Table } from 'primeng/table';
import { Subject } from 'rxjs';
import { takeUntil, startWith, debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { LazyLoadEvent, ConfirmationService } from 'primeng/api';
import { ExcelServiceService } from 'app/shared/services/excel-service.service';
import { CommonServiceService } from 'app/shared/services/common-service.service';

interface Action { 
  name:string, 
  code:string
}

@Component({ 
  selector: 'app-seller-listing',
  templateUrl: './seller-listing.component.html',
  styleUrls: ['./seller-listing.component.scss']
})
export class SellerListingComponent implements OnInit {

  sellerList:any[];
  actions:Action[];
  actionListFromAPI:string[];
  page:number = 0;
  seller:any;
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
  exportAll = "false";
    countryId : number = null;
 

  constructor(
    private router:Router, 
    private activateRoute : ActivatedRoute,
    private utilityService:UtilityService,
    private commonService:CommonServiceService,
    private sellerService:SellerService,
    private confirmationService: ConfirmationService,
    private excelService:ExcelServiceService,
    ) {}
    setStatus(id:Number,adminStatus:Number){

      let statusData = {id,adminStatus}
      
   this.sellerService.updateSellerStatus(statusData).subscribe(
     (success:any)=>
     {
     
      this.ngOnInit()
} )
    }

    
  ngOnInit() {
    this.initiateSearch();
    this.getCountry();
  }


  initiateSearch() {
    this.searchTerms$.pipe(
      takeUntil(this._unsubscribe),
      startWith(''),
      distinctUntilChanged(),
      // switch to new search observable each time the term changes
      switchMap((term: string) => this.sellerService.getAllSellersSearch(this.page, term ,this.exportAll, this.countryId
      ))
    ).subscribe((success: any) => {
      this.sellerList = success.data.results;
      this.totalCount = success.data.total;
      this.utilityService.resetPage();
    })
  } 

  getAllSellers(page) {
    this.sellerService.getAllSellers(page).subscribe(
      (success: any) => {
        this.sellerList = success.data.results;
        this.totalCount = success.data.total;
      },
      error => {
      
        this.utilityService.resetPage();
      }
    );
  }

  getAllSellersSearch(page, searchBar , exportAll, countryId) {
    this.sellerService.getAllSellersSearch(page, searchBar , exportAll , countryId)
      .pipe(
        takeUntil(this._unsubscribe)
      )
      .subscribe((success: any) => {
        
        this.sellerList = success.data.results;
        this.totalCount = success.data.total;
        this.utilityService.resetPage();
        if(exportAll == "true"){
   
          this.excelService.exportAsExcelFile(this.sellerList, 'Seller List')
          this.exportAll = "false"
        }
      })
  }

  loadDataLazy(event: LazyLoadEvent) {
    this.page = event.first / 10;
    // if there is a search term present in the search bar, then paginate with the search term
    if (!this.searchBar && !this.countryId)  {
      
      this.getAllSellers(this.page);
    } 
    else {
      this.getAllSellersSearch(this.page, this.searchBar , this.exportAll, this.countryId);
    
    }
  }


  filterGlobal(searchTerm) {
    // indexing starts from 0 in primeng
    this.primeNGTable.first = 0;
    this.page = 0;
    this.searchTerms$.next(searchTerm);
  }

  onAddSeller(){
    this.router.navigate(['../new'],{relativeTo : this.activateRoute})
  }

  getDropDownValue(event, id) {
    if(event.currentTarget.firstChild.data === 'Delete') {

      this.confirmationService.confirm({ 
        message: 'Are you sure that you want to perform this action?',
        accept: () => {
          this.sellerService.deleteSeller(id).pipe(takeUntil(this._unsubscribe)).subscribe(
            (success: any) => {
              this.getAllSellers(this.page);
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
 
      this.excelService.exportAsExcelFile(this.sellerList, 'Seller List')
    }
    else{
    
      this.exportAll = "true"
     this.getAllSellersSearch(this.page, this.searchBar,this.exportAll , this.countryId);
    }
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
  onChange(deviceValue) {
    if(deviceValue)
{

  this.countryId=deviceValue;
}
    this.getAllSellersSearch(this.page, this.searchBar , this.exportAll, this.countryId);
}
}
