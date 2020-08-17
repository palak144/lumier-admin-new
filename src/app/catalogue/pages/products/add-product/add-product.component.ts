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
  dynamicSeller: Array<DynamicGrid> = [];
  newSeller: any = {};
  dynamicQuantity: Array<DynamicGrid> = [];
  newQuantity: any = {};
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
  selected_category :any;
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
  isVarient: boolean = false;
  countryIdData: any = "";
  productNameData: any = "";
  languageIdData: any = "";
 

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private commonService: CommonServiceService,
    private toastr: ToastrService,
    private productService:ProductService,
  ) {    
    
  }
  ngOnInit() {
    this.newDynamic = {id: "", Varient: "",pcode:"",quantity: "",sellPrice:"",MRP:"",walletPrice:""};
    this.dynamicArray.push(this.newDynamic);
    this.newSeller = {id: "",sellerId:[],sellerFee:"",quantity: "", deliveryTime: ""};
    this.dynamicSeller.push(this.newSeller);
    this.newQuantity = {id: "",min_qunatity:"",max_qunatity:"",price: "", wallet: ""};
    this.dynamicQuantity.push(this.newQuantity);
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
    this.selected_category =[];
  }
  get signUpControls() {
    
    return this.addProductForm.controls
  }
  onSelect(event) {
   ( event.target.checked ) ?  this.isVarient = true :  this.isVarient = false
   
}
  editorValidation(event)
  {
  }
  fileChangeEvent1(fileInput : any){
    this.file = fileInput.target.files[0];
    
      // this.companyFlagSize = true;
      //  let reader = new FileReader();      
      //   reader.readAsDataURL(this.file);      
      //   reader.onload = (event) => {
      //      this.url = reader.result;
      //     this.companyLogo = this.url;        
      //   }
        this.addProductForm.controls['catelogue'].setValue(this.file ? this.file : '');
        this.file = this.file.name
      
    
  }
  fileChangeEvent(e : any){
    (this.files.length != 0) ? this.files = [] : ''
    // this.file = e.queue[0];
    // this.file = this.file.file 
  
    // if (this.file.size < 200000) { 
        e.queue.forEach(element => {
          this.files.push(
           element._file
          );
        });
        console.log(this.files)
        // this.addProductForm.controls['file'].setValue(this.file ? this.file : '');
        // this.file = this.file.name
      
      
    // }
      // else {
      //   this.companyFlagSize = false;
      //   document.getElementById('sizeValidations').style.color = '#ffae42';
      //   this.addProductForm.controls['file'].setValue(this.file ? '' : '');
      // }
  }
  scrollToElement(element) {
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }
  onSubmitAddProductForm(){
      
    console.log(this.dynamicSeller);

      event.preventDefault();
      this.isSubmittedaddProductForm = true
      if (this.addProductForm.invalid) {
        let invalidFields = [].slice.call(document.getElementsByClassName('ng-invalid'));
        this.scrollToElement(invalidFields[1]);
        return
      }
      this.countryIdData = this.addProductForm.get('countryId').value,
      this.productNameData = this.addProductForm.get('productName').value,
      this.languageIdData = this.addProductForm.get('languageId').value    
      let data=this.addProductForm.value;

      data.productsRelated = this.dataFormat(this.addProductForm.get('relatedItem').value)
      data.sellerProducts = this.addOtherKeysToSeller(this.dynamicSeller,this.countryIdData, this.productNameData ,this.languageIdData )
      data.productVariants = this.addOtherKeysToVarient(this.dynamicArray,this.countryIdData ,this.languageIdData)
      data.quantityDiscount = this.dynamicQuantity
      data.file = this.files
      if (this.id ) {
       data.id = this.id;
      }   
      
      if (this.editMode) {
        
        this.productService.addProduct(data).subscribe(
          data => {
          this.toastr.success("Product Edited Successfully")
            this.router.navigate(['/catalogues/products'],{relativeTo : this.activatedRoute})
          },
          error => {
            this.toastr.error(error.message)
          });
      }
      else{
      this.productService.addProduct(data).subscribe(
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
    let productName = "";
    let hyperlink = "";
    let file ="";
     let catelogue = ""
    // let sequenceNumber ="";
    let page ="";
    let position ="";

this.addProductForm = new FormGroup({

      "countryId":new FormControl(null,[Validators.required]),
      "productName": new FormControl( productName, Validators.required),
      "supplyTypeId": new FormControl( null, Validators.required),
      "manufactureId": new FormControl( null, Validators.required),
      "languageId":new FormControl(null, Validators.required),
      "PNCDE": new FormControl(null, Validators.required),
      "code": new FormControl(null, Validators.required),
      "noDiscount" : new FormControl(null),
      "isSale" : new FormControl(null),
      "shortDiscription" : new FormControl(null),
      "packageContent" : new FormControl(null),
      "MRP" : new FormControl(null, Validators.required),
      "sellPrice" : new FormControl(null, Validators.required),
      "metaTitle" : new FormControl(null),
      "isQuote" : new FormControl(null),
      "UOM" : new FormControl(null),
      "walletPrice" : new FormControl(null),
      "metaDescription" : new FormControl(null),
      "metaKeyword" : new FormControl(null),
      "categoryId" : new FormControl(null, Validators.required),
      "ribbenText" : new FormControl(null),
      "specialityId" : new FormControl(null),
      "currency":new FormControl(null, Validators.required),
      "countryOriginId" : new FormControl(null, Validators.required),
      "relatedItem": new FormControl(null),
      "isPackage": new FormControl(null),
      "description": new FormControl(null),
      "warranty": new FormControl(null),
      "features": new FormControl(null),
       "video" : new FormControl(null),

    });
    
        if(this.editMode){
          this.productTitle = "Edit Product"
          this.addProductForm.addControl(
            "file", new FormControl( file,),
          );
          this.addProductForm.addControl(
            "catelogue",new FormControl( catelogue,),
          );
          this.productService.getProductDetails(this.id).pipe(takeUntil(this._unsubscribe)).subscribe(
            (success:any)=>{          
              this.product=success.data
              
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
                  
                  // this.rows = [{id : 21,
                  //   itemName: "Seller New Palak"}]
                  this.sellerLists = this.arrayOfStringsToArrayOfObjects(success.data);

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
                  
                  this.categories = this.arrayOfStringsToArrayOfObjects(success.data);
                },
                error => {
                }
              )
              
              this.addProductForm.patchValue({
                "name" : this.product.name,
               
             })
            console.log(this.addProductForm.patchValue)
            this.file = this.product.logoName
            
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
              "catelogue", new FormControl( file,Validators.required),
            );
          }
    
    }
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
        
        this.currencies = this.arrayOfStringsToArrayOfObjects(success.data);
        
      },
      error => {
      }
    )
  }
  getlanguage(event:any)
  {
    
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
        
        this.languages = this.arrayOfStringsToArrayOfObjects(success.data);
        
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
    
    this.commonService.getManufacturerList(this.selectedCountryId).pipe(takeUntil(this._unsubscribe)).subscribe(
      (success:any) => {
        
        this.manufacturerBrands = this.arrayOfStringsToArrayOfObjects(success.data);
        
      },
      error => {
      }
    )
  }
  getSellerList()
  {
    this.commonService.getSellerList(this.selectedCountryId).pipe(takeUntil(this._unsubscribe)).subscribe(
      (success:any) => {
        
        // if(success.data != []) {
        // this.rows = [{id : 21,
        //   itemName: "Seller New Palak"}]
        // }
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
    
    this.commonService.getRelatedProducts(this.selectedLanguageId).pipe(takeUntil(this._unsubscribe)).subscribe(
      (success:any) => {
        
        this.autocompleteItemsAsObjects = success.data;
      },
      error => {
      }
    )
  }
  getSpecialities(){
    this.commonService.getSpeciality().pipe(takeUntil(this._unsubscribe)).subscribe(
      (success:any) => {
        
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
    
  }
  arrayOfStringsToArrayOfObjects(arr: any[]) {
    
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
  dataFormat(arr: any[]) {
    
    const newArray = [];
    if (arr != null) {
    arr.forEach(element => {
      newArray.push({
        relatedId: element.id,
      });
    });
  }
    return newArray;
  }
  addOtherKeysToVarient(arr: any[] ,  countryIdData : string ,  languageIdData : string) {
    if (arr != []) {
    var result = arr.map(function(el) {
      var element = Object.assign({}, el);
      element.countryId = countryIdData,
      element.languageId = languageIdData    
       return element;
    })
  }
    return result;
  }
  addOtherKeysToSeller(arr: any[], countryIdData : string ,  productNameData : string , languageIdData : string ) {
    
    if (arr != []) {
    var result = arr.map(function(el) {
      var element = Object.assign({}, el);
      element.countryId = countryIdData,
      element.productName= productNameData,
      element.languageId = languageIdData   
       return element;
    })
  }
    return result;
  }
addRow(index) {  
  this.newDynamic ={id: "", Varient: "",pcode:"",quantity: "",sellPrice:"",MRP:"",walletPrice:""};
  this.dynamicArray.push(this.newDynamic);
  return true;
}
//       [{"variant":"Coronamask1","countryId":25,"languageId":1,"quantity":10,"MRP":200,"sellPrice":150,"walletPrice":0,"isQuote":"No","deliveryTime":10,"sellerFee":150}]
// sellerProducts:{"productName":"Medicine","quantity":20,"price":200,"countryId":25,"languageId":1,"sellerId":17, "sellerFee":200,"deliveryTime":10,"billingAddress":"Address1"}
     
deleteRow(index) {
  if(this.dynamicArray.length ==1) {
    this.toastr.error("Can't delete the row when there is only one row", 'Warning');
      return false;
  } else {
      this.dynamicArray.splice(index, 1);
      return true;
  }
}
addsellerRow(index) {  
  this.newSeller = {id: "",sellerId:[],sellerFee:"",quantity: "", deliveryTime: ""};
  this.dynamicSeller.push(this.newSeller);
  return true;
}

deletesellerRow(index) {
  if(this.dynamicSeller.length ==1) {
    this.toastr.error("Can't delete the row when there is only one row", 'Warning');
      return false;
  } else {
      this.dynamicSeller.splice(index, 1);
      return true;
  }
}
addQuantity(index) {  
  this.newQuantity = {id: "",min_qunatity:"",max_qunatity:"",price: "", wallet: ""};
  this.dynamicQuantity.push(this.newQuantity);
  return true;
}

deleteQuantity(index) {
  if(this.dynamicQuantity.length ==1) {
    this.toastr.error("Can't delete the row when there is only one row", 'Warning');
      return false;
  } else {
      this.dynamicQuantity.splice(index, 1);
      return true;
  }
}
}
