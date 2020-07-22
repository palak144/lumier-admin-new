import { Component, OnInit, ViewChild  } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UtilityService } from 'app/shared/utility/utility.service'; 
import { CategoryService } from '../../../shared/services/catalogue/category.service';
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
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {

  categoriesList:any[];
  actions:Action[];
  actionListFromAPI:string[];
  page:number = 0;
  category:any;
  totalCount: number;
  action:string;
  id: number;
  status:string
  countries:any[];

  @ViewChild(Table) tableComponent: Table;
  @ViewChild(Table) primeNGTable: Table;

  // Real time search
  searchTerms$ = new Subject<string>();
  searchBar: any = "";
  private _unsubscribe = new Subject<boolean>();
  exportAll = "false";
  countryId: number = null;

   constructor(
    private router:Router, 
    private activateRoute : ActivatedRoute,
    private utilityService:UtilityService,
    private categoryService:CategoryService,
    private confirmationService: ConfirmationService,
    private commonService : CommonServiceService,
    private excelService:ExcelServiceService,
    
    ) {}
    setStatus(id:Number,adminStatus:Number){

      let statusData = {id,adminStatus}
      
   this.categoryService.updateCategoryStatus(statusData).subscribe(
     (success:any)=>
     {
     console.log(success);
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
      switchMap((term: string) => this.categoryService.getAllCategoriesSearch(this.page, term, this.exportAll, this.countryId
      ))
    ).subscribe((success: any) => {
      console.log(success);
      this.categoriesList = success.data.results;
      this.totalCount = success.data.total;
      this.utilityService.resetPage();
    })
  }

  getAllCategories(page) { 

    this.categoryService.getAllCategories(page).subscribe(
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

  getAllCategoriesSearch(page, searchBar , exportAll,countryId) {
    
      
    this.categoryService.getAllCategoriesSearch(page, searchBar , exportAll ,countryId )
      .pipe(
        takeUntil(this._unsubscribe)
      )
      .subscribe((success: any) => {
        console.log(success);
        this.categoriesList = success.data.results;
        this.totalCount = success.data.total;
        this.utilityService.resetPage();
        if(exportAll == "true"){
   
          this.excelService.exportAsExcelFile(this.categoriesList, 'Category List')
          this.exportAll = "false"
        }
      })
  }
  loadDataLazy(event: LazyLoadEvent) {

    this.page = event.first / 10;
    // if there is a search term present in the search bar, then paginate with the search term
    if (!this.searchBar && !this.countryId) {

      this.getAllCategories(this.page);

    }
    else if (!this.countryId) {

      this.getAllCategories(this.page);

    }
    else {

      this.getAllCategoriesSearch(this.page, this.searchBar, this.exportAll, this.countryId);
    }
  }
  filterGlobal(searchTerm) {
    console.log(searchTerm);
       this.primeNGTable.first = 0;
       this.page = 0; 
       this.searchTerms$.next(searchTerm);
     }

  onAddcountry(){
    this.router.navigate(['../new-country'],{relativeTo : this.activateRoute})
  }

 
  getDropDownValue(event, id) {
    if(event.currentTarget.firstChild.data === 'Delete') {

      this.confirmationService.confirm({ 
        message: 'Are you sure that you want to perform this action?',
        accept: () => {
          this.categoryService.deleteCategory(id).pipe(takeUntil(this._unsubscribe)).subscribe(
            (success: any) => {
            
              this.getAllCategories(this.page);
              this.categoriesList = this.categoriesList.filter((item: any) => {
                return id !== item.countryId
              }) 
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
exportAsXLSX(id: number) {

  if (id == 0) {

    this.excelService.exportAsExcelFile(this.categoriesList, 'Category List')
  }
  else {

    this.exportAll = "true"
    this.getAllCategoriesSearch(this.page, this.searchBar, this.exportAll, this.countryId);
  }
}
getCountry() {
  this.commonService.getCountry().pipe(takeUntil(this._unsubscribe)).subscribe(
    (success: any) => {
      this.countries = success.data;
    },
    error => {
    }
  )
}
onChange(deviceValue) {
  if (deviceValue) {
    this.countryId = deviceValue;
  }
  else {
  }

  this.getAllCategoriesSearch(this.page, this.searchBar, this.exportAll, this.countryId);
}

  onAddCategories(){
    this.router.navigate(['../new-category'],{relativeTo : this.activateRoute})
  }
  
}
