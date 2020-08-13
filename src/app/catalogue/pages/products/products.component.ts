import { Component, OnInit ,ViewChild} from '@angular/core';
import { Validators, FormControl, FormBuilder, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {NgbTabsetConfig} from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
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
import { CompaniesModule } from 'app/companies/companies.module';
import { NgbModal, ModalDismissReasons, NgbAccordionConfig } from '@ng-bootstrap/ng-bootstrap';
interface Country {
  _id:string, 
  country:string
}
interface seller {
  _id:string, 
  seller:string
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
  providers: [NgbTabsetConfig,NgbAccordionConfig]
})

export class ProductsComponent implements OnInit {

  productTitle:string;
  addProductForm: FormGroup; 
  VariantForm:FormGroup;
  isSubmittedaddProductForm: boolean = false;
  productValue: any;
  // private _unsubscribe = new Subject<boolean>();
  titles: string[];
  editMode = false;
  id: number;
  addProductFormDetails: any;
  product: any;
  countries:Country[];
  sellerList:any[];
  CategoryListdata:any[];
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
  exportAll = "false";
    countryId : number = null;
    sellerId : number =null;
    categoryId : number =null;
  exportAllData: any[];
  productListExport: any;
  action: any;
  variantlist: any;
  providers: any;
  closeResult: string;
  display: boolean =false;
  VariantData: any;
  constructor(config: NgbTabsetConfig, private router:Router, 
    private activateRoute : ActivatedRoute,
    private utilityService:UtilityService,
    private categoryService:CategoryService,
    private ProductService:ProductService,
    private modalService: NgbModal,
    private toastr: ToastrService,
    private confirmationService: ConfirmationService,
    private commonService : CommonServiceService,
    private excelService:ExcelServiceService,) {
    // customize default values of tabsets used by this component tree
    // config.justify = 'center';
    config.type = 'pills';
  }
  setStatus(id:Number,adminStatus:Number){

    let statusData = {id,adminStatus}
    
 this.ProductService.updateproductStatus(statusData).subscribe(
   (success:any)=>
   {
  
    this.ngOnInit()
} )
  }
  ngOnInit() {
     
  this.VariantForm = new FormGroup({
    "variant": new FormControl(null, Validators.required),
    "quantity": new FormControl(null, Validators.required),
    "sellPrice": new FormControl(null, Validators.required),
    "sellerFee":new FormControl(null, Validators.required),
    "walletPrice": new FormControl(null),
  
 });
    this.exportData = [];
    this.exportAllData = [];
      this.initiateSearch();
      this.getCountry();
      this.getSeller();
      this.getCategoryList();
  }

  onVariantFormSubmit()
  {
    console.log(this.VariantForm.value);
    let data=  this.VariantForm.value;
    data.id=this.id;
    this.ProductService.updateVariant(data).pipe(takeUntil(this._unsubscribe)).subscribe(
      (success:any) => {
     console.log(success);
        this.toastr.success('Variant Updated Successfully!');
        this.router.navigate(['/catalogues/products']);
this.display=false;
this.getAllproduct(this.page);
      },
      error => {
        this.toastr.error(error.error.message);
      }
    )
  }
    initiateSearch() {
      this.searchTerms$.pipe(
        takeUntil(this._unsubscribe),
        startWith(''),
        distinctUntilChanged(),
        // switch to new search observable each time the term changes
        switchMap((term: string) => this.ProductService.getAllproductSearch(this.page, term, this.exportAll, this.countryId , this.sellerId, this.categoryId
        ))
      ).subscribe((success: any) => {
   
        this.productList = success.data.results;
    
        this.totalCount = success.data.total;
        this.utilityService.resetPage();
      })
    }
    getAllproductSearch(page, searchBar , exportAll,countryId,sellerId,categoryId) {
    
      console.log(page,searchBar,exportAll,countryId);
      this.ProductService.getAllproductSearch(page, searchBar , exportAll ,countryId ,sellerId,categoryId)
        .pipe(
          takeUntil(this._unsubscribe)
        )
        .subscribe((success: any) => {

         
          if(exportAll == "true"){
            this.productListExport = [];
            this.productListExport = success.data.results;
            this.productListExport.forEach(element=>{
              this.exportAllData.push({
                Id:element.id,
                Admin_Status : element.adminStatus,
                Category_Name : element.category.categoryName,
                Country : element.country.countryName,
                isDelete : element.isDelete,
                Product_Code : element.PNCDE,
                Product_Name : element.productName,
                Seller : element.country.countryName
              })
            })
            this.excelService.exportAsExcelFile(this.exportAllData, 'Product List')
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
      var data=[];
      this.ProductService.getAllproduct(page).subscribe(
        (success: any) => {
      
          console.log(success);
          this.productList = success.data.results;
            
      
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
      debugger
      this.page = event.first / 10;
 
      //if there is a search term present in the search bar, then paginate with the search term
      if (!this.searchBar && !this.countryId) {

        this.getAllproduct(this.page);
      }
      else if (!this.countryId) {
   
        this.getAllproduct(this.page);
      }
      else {
        console.log("page124");
        this.getAllproductSearch(this.page,this.searchBar,this.exportAll, this.countryId, this.sellerId, this.categoryId);
      }
    }

    getCountry() {
      this.commonService.getCountry().pipe(takeUntil(this._unsubscribe)).subscribe(
        (success: any) => {
          this.countries = success.data;
          console.log(this.countries);

        },
        error => {
        }
      )
    }
    getSeller() {
      this.commonService.getSeller().pipe(takeUntil(this._unsubscribe)).subscribe(
        (success: any) => {
          console.log(success);
          this.sellerList = success.data;
          console.log(this.sellerList);

        },
        error => {
        }
      )
    }
    getCategoryList() {
      this.commonService.getCategoryList().pipe(takeUntil(this._unsubscribe)).subscribe(
        (success: any) => {
          console.log(success);
          this.CategoryListdata = success.data;
          console.log(this.CategoryListdata);

        },
        error => {
        }
      )
    }
    onChange(deviceValue) {
      console.log(deviceValue);
      if (deviceValue) {
        this.countryId = deviceValue;
        console.log(this.countryId);
      }
      else {
      }
    
      this.getAllproductSearch(this.page,this.searchBar,this.exportAll,this.countryId,this.sellerId, this.categoryId);
    }
    onChangeseller(deviceValue) {
      console.log(deviceValue);
      if (deviceValue) {
        this.sellerId = deviceValue;
        console.log(this.sellerId);
      }
      else {
      }
    
      this.getAllproductSearch(this.page,this.searchBar,this.exportAll,this.countryId,this.sellerId,this.categoryId);
    }
    onChangecategory(deviceValue)
    {
      console.log(deviceValue);
      if (deviceValue) {
        this.categoryId = deviceValue;
        console.log(this.categoryId);
      }
      else {
      }
    
      this.getAllproductSearch(this.page,this.searchBar,this.exportAll,this.countryId,this.sellerId,this.categoryId);
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
    console.log( this.productList);
      this.exportData.push({
        Id:element.id,
        Admin_Status : element.adminStatus,
        Category_Name : element.category.categoryName,
        Country : element.country.countryName,
        isDelete : element.isDelete,
        Product_Code : element.PNCDE,
        Product_Name : element.productName,
        Seller : element.country.countryName
      })
    })
        this.excelService.exportAsExcelFile(this.exportData, 'product List')
        this.exportData = [];
    
      }
      else {
    
        this.exportAll = "true"
        this.getAllproductSearch(this.page, this.searchBar, this.exportAll, this.countryId, this.sellerId, this.categoryId);
      }
    }
    getDropDownvariantValue1(event, id) {
      this.id=id;

        this.confirmationService.confirm({ 
          message: 'Are you sure that you want to perform this action?',
          accept: () => {
            console.log(id);
            this.ProductService.deletevariant(id).pipe(takeUntil(this._unsubscribe)).subscribe(
              (success: any) => {
                console.log(success);
                this.getAllproduct(this.page);
                this.productList = this.productList.filter((item: any) => {
                  console.log(this.productList);
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
  getDropDownvariantValue2(event, id) {
    this.id=id;
console.log(event);
console.log(id);
    this.display =true;
    console.log(id);
    this.ProductService.getvariantDetails(id).pipe(takeUntil(this._unsubscribe)).subscribe(
      (success:any) => {
        console.log(success);
        this.VariantData = success.data;
        console.log(this.VariantData);
          this.patchForm(this.VariantData); 
      },
      error => {
      }
    ) 
  
    }
  
  
  patchForm(item)
  {
  console.log(item);
  this.VariantForm.controls.variant.patchValue(item.variant);  
  this.VariantForm.controls.quantity.patchValue(item.quantity);
  this.VariantForm.controls.sellPrice.patchValue(item.sellPrice);
  this.VariantForm.controls.sellerFee.patchValue(item.sellerFee);
  this.VariantForm.controls.walletPrice.patchValue(item.walletPrice);
  }
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
        return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
        return 'by clicking on a backdrop';
    } else {
        return `with: ${reason}`;
    }
  }
}
