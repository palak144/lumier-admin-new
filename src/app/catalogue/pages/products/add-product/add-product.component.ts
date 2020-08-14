import { Component, OnInit, LOCALE_ID, Inject } from '@angular/core';
import { Validators, FormControl, FormBuilder, FormGroup } from '@angular/forms';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { CommonServiceService } from 'app/shared/services/common-service.service';
import { ToastrService } from 'ngx-toastr';
import { ProductService } from 'app/shared/services/prod.service';
import { FileUploader } from 'ng2-file-upload';
import { DynamicGrid } from '../../../../grid.model';
const URL = 'https://evening-anchorage-3159.herokuapp.com/api/';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
  
})
export class AddProductComponent implements OnInit {
  dynamicArray: Array<DynamicGrid> = [];
  newDynamic: any = {};
  public uploader: FileUploader = new FileUploader({
    url: URL,
    isHTML5: true
  });
  

  languages = [];
  selectedCategoryLanguages:any;
  language: any;
  countryLanguage: any;
  selectedLanguageId: any;
  productTitle:string;
  addProductForm: FormGroup; 
  isSubmittedaddProductForm: boolean = false;
  permissions: any;
  closeResult: string;
  fieldArray: Array<any> = [];
   newAttribute: any = {};
   basedArray: Array<any> = [];
  manufacturerBrands: any[];
  categories: any[];
  specialityTypes: string[];
  countries: any[];
  autocompleteItemsAsObjects:any[]
  c_origins:any[];
  private _unsubscribe = new Subject<boolean>();
  supplyTypes: any[];
  selectedCountryId: any[];
  dLogo: string;
  id: number;
  editMode: boolean;
  file: any;
  files: Array<any> = [];
  companyFlagSize: boolean = false;
  companyLogo: any;
  selected_supplyType: any;
  selected_brand:any;
  selected_country: any;
  selected_cOrigin: any;
  addProductFormDetails: any;
  url: string | ArrayBuffer;
  product: any;
  sellerLists: any[];
  dropdowns: any[];
  currencies: any[];
  currencyValue: any;
  specialities : any = [];
  editing = {};
  rows = [];

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private commonService: CommonServiceService,
    private toastr: ToastrService,
    private productService:ProductService,
  ) {    
    
  }
  ngOnInit() {
    this.newDynamic = {id: "", Varient: "",pcode:"",quantity: "", is_sale: "",sale_price:"",price:"",wallet:""};
    this.dynamicArray.push(this.newDynamic);
    this.productTitle = "Add New Product"
    this.dLogo = "assets/img/defaultImg.png";
    this.activatedRoute.params.subscribe(
      (id: Params) => {
        this.id = +id['id']
        this.editMode = id['id'] != null
        this.getCountry();
        this.getCountryOrigin();
        this.getSpecialities();
      
      }
    )

    this.initForm()
    this.selected_country = [];
    this.selected_cOrigin = [];
    this.selected_supplyType = [];
    this.selected_brand = [];
  }
  get signUpControls() {
      return this.addProductForm.controls
  }
  editorValidation(event)
  {
  }
  fileChangeEvent1(fileInput : any){
  
    this.file = fileInput.target.files[0];
    
    var last = this.file.name.substring(this.file.name.lastIndexOf(".") + 1, this.file.name.length); 
    if (this.file.size < 200000) {
    {
      this.companyFlagSize = true;
       let reader = new FileReader();      
        reader.readAsDataURL(this.file);      
        reader.onload = (event) => {
           this.url = reader.result;
          this.companyLogo = this.url;        
          document.getElementById('sizeValidations').style.color = 'black';
        }
        this.addProductForm.controls['file'].setValue(this.file ? this.file : '');
        this.file = this.file.name
      }
    }
      else {
        this.companyFlagSize = false;
        
        document.getElementById('sizeValidations').style.color = '#ffae42';
        this.addProductForm.controls['file'].setValue(this.file ? '' : '');
      }
  }
  fileChangeEvent(e : any){
    this.file = e.queue[0];
    this.file = this.file.file 
    for (var i = 0; i < e.queue.length; i++) { 
      this.files.push(e.queue[i]);
    }
    console.log(this.files)
    if (this.file.size < 200000) {
    {
      this.companyFlagSize = true;
       let reader = new FileReader();      
       debugger
        this.addProductForm.controls['file'].setValue(this.file ? this.file : '');
        // this.file = this.file.name
      }
      
    }
      else {
        this.companyFlagSize = false;
        document.getElementById('sizeValidations').style.color = '#ffae42';
        this.addProductForm.controls['file'].setValue(this.file ? '' : '');
      }
  }
  onSubmitAddProductForm(){
    debugger
      event.preventDefault();
      this.isSubmittedaddProductForm = true
      if (this.addProductForm.invalid) {
        return
      }

debugger
      this.addProductFormDetails = {
        "name": this.addProductForm.get('name').value,
      }
      debugger
      if (this.id ) {
        this.addProductFormDetails.id = this.id;
      }
      if (this.editMode) {
        
        this.productService.addProduct(this.addProductFormDetails ).subscribe(
          data => {
          this.toastr.success("Product Edited Successfully")
            this.router.navigate(['/catalogues/products'],{relativeTo : this.activatedRoute})
          },
          error => {
            this.toastr.error(error.message)
          });
      }
      else{
      this.productService.addProduct(this.addProductFormDetails).subscribe(
        data => {
          this.toastr.success("Product Added Successfully")
          this.router.navigate(['/catalogues/products'],{relativeTo : this.activatedRoute})
        },
        error => {
          this.toastr.error(error.message)
  
        });
      }
    
  }

  private initForm(){
    let fname = "";
    let hyperlink = "";
    let file ="";
     let fileCatelogue = ""
    // let sequenceNumber ="";
    let page ="";
    let position ="";

    this.addProductForm = new FormGroup({
      "countryId":new FormControl(null,[Validators.required]),
      "fname": new FormControl( fname, Validators.required),
      "supplyTypeId": new FormControl( null, Validators.required),
      "brandId": new FormControl( null, Validators.required),
      "languageId":new FormControl(null, Validators.required),
      "pnCode": new FormControl(null, Validators.required),
      "pncdecvarient" : new FormControl(null, Validators.required),
      "noDiscount" : new FormControl(null, Validators.required),
      "isSale" : new FormControl(null, Validators.required),
      "shortDiscription" : new FormControl(null, Validators.required),
      "packageContent" : new FormControl(null, Validators.required),
      "price" : new FormControl(null, Validators.required),
      "metaTag" : new FormControl(null, Validators.required),
      "isQuote" : new FormControl(null, Validators.required),
      "UOM" : new FormControl(null, Validators.required),
      "walletPrice" : new FormControl(null, Validators.required),
      "metaDesc" : new FormControl(null, Validators.required),
      "metaKeyword" : new FormControl(null, Validators.required),
      "categoryId" : new FormControl(null, Validators.required),
      "ribbonText" : new FormControl(null, Validators.required),
      "speciality" : new FormControl(null, Validators.required),
      "isPackage" : new FormControl(null, Validators.required),
      "sellerFee" : new FormControl(null, Validators.required),
      "isSaleSeller" : new FormControl (null,  Validators.required),
      "quantity" : new FormControl(null, Validators.required),
      "deliveryWithinDays" : new FormControl(null, Validators.required),
      "currency":new FormControl(null, Validators.required),
      "c_origin" : new FormControl(null, Validators.required),
      "relatedItem": new FormControl(null),
      "sellerName": new FormControl(null, Validators.required),
      "varient": new FormControl(null, Validators.required),
      "quantitySeller": new FormControl(null, Validators.required),
      "salePrice" : new FormControl(null, Validators.required),
      "priceSeller": new FormControl(null, Validators.required),
      "walletSeller" : new FormControl(null, Validators.required),
      "description": new FormControl(null, Validators.required),
      "warranty": new FormControl(null, Validators.required),
      "features": new FormControl(null, Validators.required),
       "embedeVideo" : new FormControl(null, Validators.required),
       "minQuantity" : new FormControl(null, Validators.required),
       "maxQuantity" : new FormControl(null, Validators.required),
       "priceQuantity" : new FormControl(null, Validators.required),
       "walletQuantity" : new FormControl(null, Validators.required),
    });
    
        if(this.editMode){
          this.productTitle = "Edit Product"
          this.addProductForm.addControl(
            "file", new FormControl( file,),
          );
          this.addProductForm.addControl(
            "fileCatelogue",new FormControl( fileCatelogue,),
          );
          this.productService.getProductDetails(this.id).pipe(takeUntil(this._unsubscribe)).subscribe(
            (success:any)=>{          
              this.product=success.data
              debugger
              this.commonService.getSupplyType(this.product.countryId).pipe(takeUntil(this._unsubscribe)).subscribe(
                (success:any) => {
                  this.supplyTypes = this.arrayOfStringsToArrayOfObjects(success.data);
                },
                error => {
                }
              )
              this.commonService.getManufacturerList(this.product.countryId).pipe(takeUntil(this._unsubscribe)).subscribe(
                (success:any) => {
                  this.manufacturerBrands = this.arrayOfStringsToArrayOfObjects(success.data);
                },
                error => {
                }
              )
              this.commonService.getSellerList(this.product.countryId).pipe(takeUntil(this._unsubscribe)).subscribe(
                (success:any) => {
                  debugger
                  this.rows = [{id : 21,
                    itemName: "Seller New Palak"}]
                  console.log("rows",success.data)
                  this.sellerLists = this.arrayOfStringsToArrayOfObjects(success.data);
                  console.log("success.data",success.data)

                },
                error => {
                }
              )
              this.commonService.getCountryLanguage(this.product.countryId).pipe(takeUntil(this._unsubscribe)).subscribe(
                (success:any) => {
                  this.languages = this.arrayOfStringsToArrayOfObjects(success.data);
                },
                error => {
                }
              )
              this.commonService.getCategory(this.product.languageId).pipe(takeUntil(this._unsubscribe)).subscribe(
                (success:any) => {
                  debugger
                  this.categories = this.arrayOfStringsToArrayOfObjects(success.data);
                },
                error => {
                }
              )
              debugger
              this.addProductForm.patchValue({
                "name" : this.product.name,
               
             })
            console.log(this.addProductForm.patchValue)
            this.file = this.product.logoName
            debugger
          }
          ,
            error=>{          
            }
          )
          }
          else{
            this.addProductForm.addControl(
              "file", new FormControl( file,Validators.required),
            );
            this.addProductForm.addControl(
              "fileCatelogue", new FormControl( file,Validators.required),
            );
          }
    
    }
    // newRow() {
    //   debugger
    //   return { varient: '', pncdecvarient: '', quantitySeller: '', isSaleSeller: '',
    //   salePrice: '', priceSeller: '', walletSeller: '' };
    // }
  getdropdown1(event:any){
    this.rows = []
    this.selectedCountryId = event.value
    this.getSupplyType();  
    this.getManufacturerBrands();
    this.getSellerList();
    this.getLanguage();
    this.getCurrency();
  }

  getCurrency()
  {
    this.commonService.getCountryCurrency(this.selectedCountryId).pipe(takeUntil(this._unsubscribe)).subscribe(
      (success:any) => {
        debugger
        this.currencies = this.arrayOfStringsToArrayOfObjects(success.data);
        debugger
      },
      error => {
      }
    )
  }
  getlanguage(event:any)
  {
    debugger
    this.selectedLanguageId = event.value ;
    this.getCategoryList();
    this.getRelatedProducts();
  }

  getCountry()
  {
    this.commonService.getCountry().pipe(takeUntil(this._unsubscribe)).subscribe(
      (success:any) => {
        
        this.countries = this.arrayOfStringsToArrayOfObjects(success.data);
      },
      error => {
      }
    )
  }
  getCountryOrigin(){
    this.commonService.getCountryOrigin().pipe(takeUntil(this._unsubscribe)).subscribe(
      (success:any) => {
        
        this.c_origins = this.arrayOfStringsToArrayOfObjects(success.data);
      },
      error => {
      }
    )
  }
  getLanguage()
  {
   
    this.commonService.getCountryLanguage(this.selectedCountryId).pipe(takeUntil(this._unsubscribe)).subscribe(
      (success:any) => {
        debugger
        this.languages = this.arrayOfStringsToArrayOfObjects(success.data);
        debugger
      },
      error => {
      }
    )
  }
  getSupplyType()
  {
    this.commonService.getSupplyType(this.selectedCountryId).pipe(takeUntil(this._unsubscribe)).subscribe(
      (success:any) => {
        this.supplyTypes = this.arrayOfStringsToArrayOfObjects(success.data);
      },
      error => {
      }
    )
  }
  getManufacturerBrands()
  {
    debugger
    this.commonService.getManufacturerList(this.selectedCountryId).pipe(takeUntil(this._unsubscribe)).subscribe(
      (success:any) => {
        debugger
        this.manufacturerBrands = this.arrayOfStringsToArrayOfObjects(success.data);
        debugger
      },
      error => {
      }
    )
  }
  getSellerList()
  {
    this.commonService.getSellerList(this.selectedCountryId).pipe(takeUntil(this._unsubscribe)).subscribe(
      (success:any) => {
        debugger
        if(success.data != []) {
        this.rows = [{id : 21,
          itemName: "Seller New Palak"}]
        }
        this.sellerLists = success.data
        this.dropdowns = this.arrayOfStringsToArrayOfObjects(success.data);
      },
      error => {
      }
    )
  }
  getCategoryList(){
    this.commonService.getCategory(this.selectedLanguageId).pipe(takeUntil(this._unsubscribe)).subscribe(
      (success:any) => {
        this.categories = this.arrayOfStringsToArrayOfObjects(success.data);
      },
      error => {
      }
    )
  }
  getRelatedProducts(){
    debugger
    this.commonService.getRelatedProducts(this.selectedLanguageId).pipe(takeUntil(this._unsubscribe)).subscribe(
      (success:any) => {
        debugger
        this.autocompleteItemsAsObjects = success.data;
      },
      error => {
      }
    )
  }
  getSpecialities(){
    this.commonService.getSpeciality().pipe(takeUntil(this._unsubscribe)).subscribe(
      (success:any) => {
        debugger
        success.data.result.forEach(element => {
          this.specialities.push({
            label: element.specialityName,
            value: element.specialityName
          });
    
        });
      },
      error => {
      }
    )
    debugger
  }
  arrayOfStringsToArrayOfObjects(arr: any[]) {
    debugger
    const newArray = [];
    if (arr != []) {
    arr.forEach(element => {
      newArray.push({
        label: element.itemName,
        value: element.id
      });
    });
  }
    return newArray;
  }
//   addFieldValue() {
//     this.fieldArray.push(this.newAttribute)
//     this.newAttribute = {};
// }

// addBasedValue() {
//   this.basedArray.push(this.newAttribute)
//   this.newAttribute = {};
// }

// // deleteFieldValue(index) {
// //     this.fieldArray.splice(index, 1);
// // }



//   open(content , permission) {
    
//     this.permissions = permission
//     this.modalService.open(content).result.then((result) => {
//         this.closeResult = `Closed with: ${result}`;
        
//     }, (reason) => {
//       this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
//   });
// }

//   // This function is used in open
// private getDismissReason(reason: any): string {
//   if (reason === ModalDismissReasons.ESC) {
//       return 'by pressing ESC';
//   } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
//       return 'by clicking on a backdrop';
//   } else {
//       return `with: ${reason}`;
//   }
// }
addRow(index) {  
  this.newDynamic ={id: "", Varient: "",pcode:"",quantity: "", is_sale: "",sale_price:"",price:"",wallet:""};
  this.dynamicArray.push(this.newDynamic);
  this.toastr.success('New row added successfully', 'New Row');
  console.log(this.dynamicArray);
  return true;
}

deleteRow(index) {
  if(this.dynamicArray.length ==1) {
    this.toastr.error("Can't delete the row when there is only one row", 'Warning');
      return false;
  } else {
      this.dynamicArray.splice(index, 1);
      this.toastr.warning('Row deleted successfully', 'Delete row');
      return true;
  }
}

}
