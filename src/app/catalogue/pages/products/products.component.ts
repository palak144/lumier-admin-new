import { Component, OnInit ,ViewChild} from '@angular/core';
import { Validators, FormControl, FormBuilder, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {NgbTabsetConfig} from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { UtilityService } from '../../../shared/utility/utility.service'; 
import { CategoryService } from '../../../shared/services/catalogue/category.service';
import { ProductService } from '../../../shared/services/catalogue/product.service';
import { Table } from 'primeng/table';
import { Subject } from 'rxjs';
import { takeUntil, startWith, debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { LazyLoadEvent, ConfirmationService } from 'primeng/api';
import { ExcelServiceService } from '../../../shared/services/excel-service.service';
import { CommonServiceService } from '../../../shared/services/common-service.service';
import { trigger,state,style,transition,animate } from '@angular/animations';
import { NgbModal, ModalDismissReasons, NgbAccordionConfig } from '@ng-bootstrap/ng-bootstrap';
import * as XLSX from 'xlsx';

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
  variantDetails:any;
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
  willDownload = false;
  variants: any;
  valueList: any;
  adminStatus: string;
  list: any;

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
  onFileChange(ev) {
    
let workBook = null;
let jsonData = null;
const reader = new FileReader();
const file = ev.target.files[0];
reader.onload = (event) => {
  const data = reader.result;
  workBook = XLSX.read(data, { type: 'binary' });
  jsonData = workBook.SheetNames.reduce((initial, name) => {
    const sheet = workBook.Sheets[name];
    initial[name] = XLSX.utils.sheet_to_json(sheet);
    return initial;
  }, {});
  var counter = 0;
var tempArr =[]

for (var i = 0; i < jsonData.Sheet1.length ; i ++) {
    if (jsonData.Sheet1[i].package === 'P'){
        counter ++ 
        jsonData.Sheet1[i].elemID = counter
        tempArr.push(jsonData.Sheet1[i])
        
    } 
    else if (jsonData.Sheet1[i].package ==='V') {
      jsonData.Sheet1[i].elemID = counter
        tempArr.push(jsonData.Sheet1[i])
    }
    jsonData.Sheet1[i].rowNumber = i+1
}

  const dataString = JSON.stringify(jsonData.Sheet1);
  
  console.log(dataString)
}
reader.readAsBinaryString(file);
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
        console.log(success);
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
          console.log(success);
        
          if(exportAll == "true"){
            this.productListExport = [];
         
            this.productListExport = success.data.results;
         console.log(this.productListExport.length);
         var i=this.productListExport.length;
            this.productListExport.forEach((element, index) =>{
              console.log(element);
              console.log(index);
              if(element.adminStatus=='1')
              {
                this.adminStatus="Active";
              }
              else
  
              {
                this.adminStatus="Inactive";
              }
           
            
              
                this.exportAllData.push({
                  Tag:"product",
                 S_No:index,
                  ProductCode : element.PNCDE,
                  ProductId:element.id,
                  Product_Name : element.productName,
                  price:element.MRP,
                  Brand_name:element.manufactureDetail.manufacturerName,
                  Seller : element.sellerDetail.sellerName,
                  Is_Variant:element.isPackage,
                  Admin_Status :  this.adminStatus,
                  
              
                })
         console.log(element.productVariants)
         this.variantlist=element.productVariants;
          console.log(this.variantlist);
          for(var j=0; j<this.variantlist.length; j++)
          {
            console.log(this.variantlist[j])
            if(element.id==this.variantlist[j].productId)
            {
              console.log(this.variantlist[j].productId);
              this.exportAllData.push({
                Tag:"variant",
                // ProductID:this.variantlist[j].productId,
                varainID:this.variantlist[j].id,
                varaintName:this.variantlist[j].variant,
                Stock:this.variantlist[j].quantity,
                variant_price:this.variantlist[j].MRP,
                Variant_Refrence:this.variantlist[j].isQuote
              })

            }
           
          }
             
              
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
          this.router.navigate(['../edit-product',id], {relativeTo: this.activateRoute})
    }
  }
  
    loadDataLazy(event: LazyLoadEvent) {
      
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
    
        this.productList.forEach((element,index)=>{
         
          
          console.log(element);
          console.log(index);
          if(element.adminStatus=='1')
          {
            this.adminStatus="Active";
          }
          else

          {
            this.adminStatus="Inactive";
          }
       
        
          
            this.exportData.push({
              Tag:"product",
             S_No:index,
              ProductCode : element.PNCDE,
              ProductId:element.id,
              Product_Name : element.productName,
              price:element.MRP,
              Brand_name:element.manufactureDetail.manufacturerName,
              Seller : element.sellerDetail.sellerName,
              Is_Variant:element.isPackage,
              Admin_Status :  this.adminStatus,
              
          
            })
     console.log(element.productVariants)
     this.variantlist=element.productVariants;
      console.log(this.variantlist);
      for(var j=0; j<this.variantlist.length; j++)
      {
        console.log(this.variantlist[j])
        if(element.id==this.variantlist[j].productId)
        {
          console.log(this.variantlist[j].productId);
          this.exportData.push({
            Tag:"variant",
            // ProductID:this.variantlist[j].productId,
            varainID:this.variantlist[j].id,
            varaintName:this.variantlist[j].variant,
            Stock:this.variantlist[j].quantity,
            variant_price:this.variantlist[j].MRP,
            Variant_Refrence:this.variantlist[j].isQuote
          })

        }
       
      }
         
          
        })
     

    
    
            
       
       
        this.excelService.exportAsExcelFile(this.exportData, 'Product List')
     
        this.exportData = [];
      
      }
      else {
    
        this.exportAll = "true"
        this.getAllproductSearch(this.page, this.searchBar, this.exportAll, this.countryId, this.sellerId, this.categoryId);
      }
    }
    exportAsXLSXMacro(){
    //  this.excelService.exportAsExcelFile(this.exportData, 'Bulk_Upload_file_Toolv1')
    }
    download(){
      
     window.open("assets/Bulk_Upload_file_Toolv1.xlsm", "_blank")
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
  open(content ) {
    
    this.modalService.open(content).result.then((result) => {
        this.closeResult = `Closed with: ${result}`;
        
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
  });
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
