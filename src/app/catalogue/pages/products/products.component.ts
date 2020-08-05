import { Component, OnInit ,ViewChild} from '@angular/core';
import { Validators, FormControl, FormBuilder, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {NgbTabsetConfig} from '@ng-bootstrap/ng-bootstrap';

import { UtilityService } from 'app/shared/utility/utility.service'; 
import { CategoryService } from '../../../shared/services/catalogue/category.service';
import { ProductService } from '../../../shared/services/catalogue/product.service';
import { Table } from 'primeng/table';
import { Subject } from 'rxjs';
import { takeUntil, startWith, debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { LazyLoadEvent, ConfirmationService } from 'primeng/api';
import { ExcelServiceService } from 'app/shared/services/excel-service.service';
import { CommonServiceService } from 'app/shared/services/common-service.service';
import { trigger,state,style,transition,animate } from '@angular/animations';
interface Country {
  _id:string, 
  country:string
}

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
  animations: [
      trigger('rowExpansionTrigger', [
          state('void', style({
              transform: 'translateX(-10%)',
              opacity: 0
          })),
          state('active', style({
              transform: 'translateX(0)',
              opacity: 1
          })),
          transition('* <=> *', animate('400ms cubic-bezier(0.86, 0, 0.07, 1)'))
      ])
  ],
  providers: [NgbTabsetConfig]
})

export class ProductsComponent implements OnInit {

  productTitle:string;
  addProductForm: FormGroup; 
  isSubmittedaddProductForm: boolean = false;
  productValue: any;
  // private _unsubscribe = new Subject<boolean>();
  titles: string[];
  editMode = false;
  id: number;
  addProductFormDetails: any;
  product: any;
  countries:Country[];

  @ViewChild(Table) tableComponent: Table;
  @ViewChild(Table) primeNGTable: Table;

  // Real time search
  searchTerms$ = new Subject<string>();
  searchBar: any = "";
  private _unsubscribe = new Subject<boolean>();
  page:number = 0;
  totalCount: any;
  productList: any;
  exportData: any[];
  exportAll: string;
  countryId: any;
  exportAllData: any[];
  productListExport: any;
  action: any;
  constructor(config: NgbTabsetConfig, private router:Router, 
    private activateRoute : ActivatedRoute,
    private utilityService:UtilityService,
    private categoryService:CategoryService,
    private ProductService:ProductService,
    private confirmationService: ConfirmationService,
    private commonService : CommonServiceService,
    private excelService:ExcelServiceService,) {
    // customize default values of tabsets used by this component tree
    // config.justify = 'center';
    config.type = 'pills';
  }



  

  ngOnInit() {

      this.initiateSearch();
      this.getCountry();
  }
  filterGlobal(searchTerm) {
    console.log(searchTerm);
       this.primeNGTable.first = 0;
       this.page = 0; 
       this.searchTerms$.next(searchTerm);

     }
     exportAsXLSX(id: number) {

      if (id == 0) {
    
    this.productList.forEach(element=>{
      this.exportData.push({
        Id:element.id,
        Admin_Status : element.adminStatus,
        Category_Name : element.categoryName,
        Country : element.country.countryName,
        isDelete : element.isDelete,
        Language : element.language.language,
        Parent_Category : element.parentCategory.categoryName,
        Parent_Child_Category : element.parentChildCategory
      })
    })
        this.excelService.exportAsExcelFile(this.exportData, 'Category List')
        this.exportData = [];
    
      }
      else {
    
        this.exportAll = "true"
        this.getAllproductSearch(this.page, this.searchBar, this.exportAll, this.countryId);
      }
    }
    getAllproductSearch(page, searchBar , exportAll,countryId) {
    
      
      this.ProductService.getAllproductSearch(page, searchBar , exportAll ,countryId )
        .pipe(
          takeUntil(this._unsubscribe)
        )
        .subscribe((success: any) => {
  console.log(success);
         
          if(exportAll == "true"){
            this.productListExport = [];
            this.productListExport = success.data.results;
            this.productListExport.forEach(element=>{
              this.exportAllData.push({
                Id:element.id,
                Admin_Status : element.adminStatus,
                Category_Name : element.categoryName,
                Country : element.country.countryName,
                isDelete : element.isDelete,
                Language : element.language.language,
                Parent_Category : element.parentCategory.categoryName,
                Parent_Child_Category : element.parentChildCategory
              })
            })
            this.excelService.exportAsExcelFile(this.exportAllData, 'Category List')
            this.exportAll = "false"
            this.exportAllData = [];
          }
          else{
          this.productList = success.data.results;
          this.totalCount = success.data.total;
          this.utilityService.resetPage();
          }
        },
        error => {
          this.utilityService.routingAccordingToError(error);
        })
    }
    getAllproduct(page) { 

      this.ProductService.getAllproduct(page).subscribe(
        (success: any) => {
          console.log(success);
          
          this.productList = success.data.results;
          console.log(this.productList);
          this.totalCount = success.data.total;
        },
        error => {
        
          this.utilityService.resetPage();
        }
      );
    }
    getDropDownValue(event, id) {
      if(event.currentTarget.firstChild.data === 'Delete') {
  
        this.confirmationService.confirm({ 
          message: 'Are you sure that you want to perform this action?',
          accept: () => {
            this.ProductService.deleteProduct(id).pipe(takeUntil(this._unsubscribe)).subscribe(
              (success: any) => {
                this.getAllproduct(this.page);
                this.productList = this.productList.filter((item: any) => {
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
          this.router.navigate(['../edit-category',id], {relativeTo: this.activateRoute})
          
    }
  }
    loadDataLazy(event: LazyLoadEvent) {
      this.page = event.first / 10;
      // if there is a search term present in the search bar, then paginate with the search term
      if (!this.searchBar && !this.countryId) {
        this.getAllproduct(this.page);
      }
      else if (!this.countryId) {
        this.getAllproduct(this.page);
      }
      else {
        this.getAllproductSearch(this.page, this.searchBar, this.exportAll, this.countryId);
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
    
      this.getAllproductSearch(this.page, this.searchBar, this.exportAll, this.countryId);
    }
     initiateSearch() {
      this.searchTerms$.pipe(
        takeUntil(this._unsubscribe),
        startWith(''),
        distinctUntilChanged(),
        // switch to new search observable each time the term changes
        switchMap((term: string) => this.ProductService.getAllproductSearch(this.page, term, this.exportAll, this.countryId
        ))
      ).subscribe((success: any) => {
        console.log(success);
        this.productList = success.data.results;
        this.totalCount = success.data.total;
        this.utilityService.resetPage();
      })
    }
}
