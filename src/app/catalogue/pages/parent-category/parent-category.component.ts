import { Component, OnInit, ViewChild } from '@angular/core';
import { Table } from 'primeng/table';
import { Subject } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { UtilityService } from 'app/shared/utility/utility.service';
import { SellerService } from 'app/shared/services/seller.service';
import { ConfirmationService, LazyLoadEvent } from 'primeng/api';
import { ExcelServiceService } from 'app/shared/services/excel-service.service';
import { takeUntil, startWith, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { ManufactureService } from 'app/shared/services/manufacture.service';
import { CommonServiceService } from 'app/shared/services/common-service.service';
import { SystemSettingsService } from '../../../shared/services/system-settings.service';
interface Action {
  name:string, 
  code:string
}
@Component({
  selector: 'app-parent-category',
  templateUrl: './parent-category.component.html',
  styleUrls: ['./parent-category.component.scss']
})
export class ParentCategoryComponent implements OnInit {
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
  categoriesList: any;
  constructor(
    private router:Router, 
    private activateRoute : ActivatedRoute,
    private utilityService:UtilityService,
    private manufactureService:ManufactureService,
    private commonService:CommonServiceService,
    private SystemSettingsService:SystemSettingsService,
    private confirmationService: ConfirmationService,
    private excelService:ExcelServiceService,
  ) { }

  // parentcategoriesList:any[];
  // actions:Action[];
  // actionListFromAPI:string[];
  // page:number = 0;
  // parentcategories:any;
  // totalCount: number;
  // action:string;
  // id: number;
  // status:string
  // countries:any[];

   // Real time search
  //  searchTerms$ = new Subject<string>();
  //  searchBar: any = "";
  //  private _unsubscribe = new Subject<boolean>();
  // exportAll: string = "false";
  //  countryId: any = null ;

  //  constructor(
  //   private router:Router, 
  //   private activateRoute : ActivatedRoute,
  //   private utilityService:UtilityService,
  //   // private catalogueService:CatalogueService,
  //   private confirmationService: ConfirmationService,
  //   private excelService:ExcelServiceService,
  //   ) {}
    setStatus(id:Number,adminStatus:Number){

      let statusData = {id,adminStatus}
      
   this.manufactureService.updateparentCategoryStatus(statusData).subscribe(
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
      switchMap((term: string) => this.manufactureService.getAllParentCategorysSearch(this.page, term ,this.exportAll, this.countryId
      ))
    ).subscribe((success: any) => {

      this.categoriesList = success.data.results;
      this.totalCount = success.data.total;
      this.utilityService.resetPage();
    })
  } 
  loadDataLazy(event: LazyLoadEvent) {

    this.page = event.first / 10;
    // if there is a search term present in the search bar, then paginate with the search term
    if (!this.searchBar) {
   
      this.getAllParentCategory(this.page);
      
    } 
    else if(!this.countryId){

this.getAllParentCategory(this.page);

    }
    else {
      this.getAllParentCategorysSearch(this.page, this.searchBar , this.exportAll, this.countryId);
    
    }

    
  }
  filterGlobal(searchTerm) {
    // indexing starts from 0 in primeng
    this.primeNGTable.first = 0;
    this.page = 0;
    this.searchTerms$.next(searchTerm);
  }
  getCountry()
  {
    this.commonService.getCountry().pipe(takeUntil(this._unsubscribe)).subscribe(
      (success:any) => {
        console.log(success);
        this.countries = success.data;
   console.log( this.countries);
      },
      error => {
      }
    )
  }
  getAllParentCategory(page) {
    this.manufactureService.getAllParentCategory(page).subscribe(
      (success: any) => {
      console.log(success);
        this.categoriesList = success.data.results;
        this.totalCount = success.data.total;
      },
      error => {
      
        this.utilityService.resetPage();
      }
    );
  }
  getAllParentCategorysSearch(page, searchBar , exportAll, countryId) {
 
      
      this.manufactureService.getAllParentCategorysSearch(page, searchBar , exportAll , countryId)
        .pipe(
          takeUntil(this._unsubscribe)
        )
        .subscribe((success: any) => {
     console.log(success);
          this.categoriesList = success.data.results;
          this.totalCount = success.data.total;
          this.utilityService.resetPage();
          if(exportAll == "true"){

            this.excelService.exportAsExcelFile(this.categoriesList, 'Seller List')
            this.exportAll = "false"
          }
        })
    }
    getDropDownValue1(event, id) {

      if(event.currentTarget.firstChild.data === 'Delete') {
  
        this.confirmationService.confirm({
          message: 'Are you sure that you want to perform this action?',
          accept: () => {
            this.manufactureService.deleteParentCategory(id).pipe(takeUntil(this._unsubscribe)).subscribe(
              (success: any) => {
                this.getAllParentCategory(this.page);
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

        this.excelService.exportAsExcelFile(this.categoriesList, 'Brand List')
      }
      else{
      
        this.exportAll = "true"
       this.getAllParentCategorysSearch(this.page, this.searchBar,this.exportAll , this.countryId);
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
    
      this.getAllParentCategorysSearch(this.page, this.searchBar , this.exportAll, this.countryId);
  }
  onAddParentCategories(){
    this.router.navigate(['../new-parent-categories'],{relativeTo : this.activateRoute})
  }

}
