import { Component, OnInit, ViewChild } from '@angular/core';
import { Table } from 'primeng/table';
import { Subject } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { UtilityService } from 'app/shared/utility/utility.service';
import { SellerService } from 'app/shared/services/seller.service';
import { ConfirmationService, LazyLoadEvent } from 'primeng/api';
import { ExcelServiceService } from 'app/shared/services/excel-service.service';
import { takeUntil, startWith, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { ManufactureService } from 'app/shared/services/catalogue/manufacture.service';
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
      switchMap((term: string) => this.manufactureService.getAllParentCategorysSearch(this.page, term ,this.countryId
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
    if (!this.searchBar && !this.countryId) {
   
      this.getAllParentCategory(this.page);
      
    } 
    else {
      this.getAllParentCategorysSearch(this.page, this.searchBar ,  this.countryId);
    
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
        this.countries = success.data;
      },
      error => {
      }
    )
  }
  getAllParentCategory(page) {
    
    this.manufactureService.getAllParentCategory(page).subscribe(
      (success: any) => {
        this.categoriesList = success.data.results;
        this.totalCount = success.data.total;
      },
      error => {
      
        this.utilityService.resetPage();
      }
    );
  }
  getAllParentCategorysSearch(page, searchBar , countryId) {
 
      this.manufactureService.getAllParentCategorysSearch(page, searchBar, countryId)
        .pipe(
          takeUntil(this._unsubscribe)
        )
        .subscribe((success: any) => {
          this.categoriesList = success.data.results;
          this.totalCount = success.data.total;
          this.utilityService.resetPage();
        })
    }
    getDropDownValue(event, id) {

      if(event.currentTarget.firstChild.data === 'Delete') {
  
        this.confirmationService.confirm({
          message: 'Are you sure that you want to perform this action?',
          accept: () => {
            this.manufactureService.deleteParentCategory(id).pipe(takeUntil(this._unsubscribe)).subscribe(
              (success: any) => {
                this.getAllParentCategory(this.page);
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
            this.router.navigate(['../edit-parent-category',id], {relativeTo: this.activateRoute})          
      }
    }

     onChange(deviceValue) {
      if(deviceValue)
  {
    
    this.countryId=deviceValue;
  }
      this.getAllParentCategorysSearch(this.page, this.searchBar , this.countryId);
  }
  onAddParentCategories(){
    this.router.navigate(['../new-parent-categories'],{relativeTo : this.activateRoute})
  }
}
