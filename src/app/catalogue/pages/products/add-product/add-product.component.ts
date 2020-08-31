import { Component, OnInit, LOCALE_ID, Inject } from '@angular/core';
import { Validators, FormControl, FormBuilder, FormGroup } from '@angular/forms';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { CommonServiceService } from 'app/shared/services/common-service.service';
import { ToastrService } from 'ngx-toastr';
import { ProductService } from 'app/shared/services/catalogue/product-add.service';
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
  dynamicSeller: any = {};
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
  selected_sellerId:any;
  selected_languageId:any;
  selected_country: any;
  selected_cOrigin: any;
  selected_speciality:any;
  selected_category :any;
  addProductFormDetails: any;
  url: string | ArrayBuffer;
  product: any = [];
  sellerLists: any[];
  dropdowns: any[];
  currencies: any[];
  specialities : any = [];
  editing = {};
  isVariant: boolean = false;
  isQuantityDiscount : boolean = false;
  countryIdData: any = "";
  productNameData: any = "";
  languageIdData: any = "";
  selectedCriteria: any
  priceZero: string = "";
  variantPriceZero: string = ""
  public disable: boolean = false;
  public disableSale: boolean = true;
  PNCDE_value: any = "";
  searchRelatedItem: any;
  public toggleButton: boolean = false;
  AllItemsRemoved: boolean = true;
  sellerDetail : boolean = true;
  PNSKU_id : string ;
  load_copiedData: any;
  isValid: boolean = false;
  image_Links: any;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private commonService: CommonServiceService,
    private toastr: ToastrService,
    private productService:ProductService,
  ) {    
    
  }
  ngOnInit() {
    this.newDynamic = { variant: "",PNCDE:"",quantity: "",sellPrice:"",MRP:"",walletPrice:"",
    isQuote:false,deliveryTime:"",sellerFee : ""};
    this.dynamicArray.push(this.newDynamic);
    this.newSeller = {sellerId:NaN,sellerFee:"",quantity: "", deliveryTime: ""};
    this.dynamicSeller = this.newSeller
    this.newQuantity = {minQuantity:"",maxQuantity:"",price: "", walletPrice: ""};
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
    this.selected_languageId = [];
    this.selected_cOrigin = [];
    this.selected_supplyType = [];
    this.selected_brand = [];
    this.selected_sellerId = [];
    this.selected_category =[];
    this.selected_speciality = [];
  }

  checkSellerDetailValidation(){

    return this.checkIfValid(this.dynamicSeller.sellerFee ) || this.checkIfValid(this.dynamicSeller.sellerId ) || this.checkIfValid(this.dynamicSeller.quantity ) || this.checkIfValid(this.dynamicSeller.deliveryTime )
    // sellerId: NaN, sellerFee: "", quantity: "", deliveryTime: ""
  }
  checkVariantValidation(){
    debugger
    return this.checkIfValid(this.newDynamic.variant ) ||  this.checkIfValid(this.newDynamic.quantity )

  }
  checkIfValid(dataToBeValidated){
    if(dataToBeValidated != null && dataToBeValidated != undefined && dataToBeValidated != '' &&
     dataToBeValidated != '' ){
      return false
    }
    return true
  }
  newtab(path){
    window.open(path);
  }
  checkIfImage(dataToBeValidated){
    if(dataToBeValidated != null && dataToBeValidated != undefined && dataToBeValidated != '' &&
     dataToBeValidated != '' ){
      return true
    }
    return false
  }
  
  PNCDE_Check(e){
    debugger
    if(e != ""){
 this.PNCDE_value = e
 if(this.PNCDE_value != "" && this.selectedCountryId != undefined ){
 this.productService.onCheckPncode(this.selectedCountryId, this.PNCDE_value).subscribe(
  (success:any)=>
  {
    document.getElementById('Validations').innerHTML = 'SKU/ PN CDE must be unique'
    document.getElementById('Validations').style.color = 'black';
 debugger
} ,
(error)=>{
  this.addProductForm.controls['PNCDE'].setValue('');
  document.getElementById('Validations').innerHTML = 'Entered SKU/ PN CDE already exists'
  document.getElementById('Validations').style.color = 'red';
  debugger
})
 }
}
  }
  load_data(){
    debugger
    if(this.PNSKU_id != undefined){
      this.productService.copyProductInfo(this.PNSKU_id).subscribe(
        (success:any)=>
        {
          this.load_copiedData = success.data
          this.commonService.getSupplyType(this.load_copiedData.country.id).pipe(takeUntil(this._unsubscribe)).subscribe(
            (success:any) => {
              this.supplyTypes = this.arrayOfStringsToArrayOfObjects(success.data);
            },
            error => {
            }
          )
          this.commonService.getManufacturerList(this.load_copiedData.country.id).pipe(takeUntil(this._unsubscribe)).subscribe(
            (success:any) => {
              this.manufacturerBrands = this.arrayOfStringsToArrayOfObjects(success.data);
            },
            error => {
            }
          )
          this.commonService.getSellerList(this.load_copiedData.country.id).pipe(takeUntil(this._unsubscribe)).subscribe(
            (success:any) => {
              debugger
              this.sellerLists = this.arrayOfStringsToArrayOfObjects(success.data);
              this.dropdowns = this.arrayOfStringsToArrayOfObjects(success.data);
              debugger
              if(this.dropdowns != []){
                this.sellerDetail = false
              }
            },
            error => {
            }
          )
          this.commonService.getCountryLanguage(this.load_copiedData.country.id).pipe(takeUntil(this._unsubscribe)).subscribe(
            (success:any) => {
              this.languages = this.arrayOfStringsToArrayOfObjects(success.data);
            },
            error => {
            }
          )
          this.commonService.getCategory(this.load_copiedData.language.id).pipe(takeUntil(this._unsubscribe)).subscribe(
            (success:any) => {
              
              this.categories = this.arrayOfStringsToArrayOfObjects(success.data);
            },
            error => {
            }
          )
          this.addProductForm.patchValue({
            "MRP" : this.load_copiedData.MRP,
            "PNCDE" : this.load_copiedData.PNCDE,
            "UOM" : this.load_copiedData.UOM,
            "shortDiscription" : this.load_copiedData.shortDesciption,
            "isSale" : this.load_copiedData.isSale,
             "isQuote" : this.load_copiedData.isQuote,
            "metaDescription" : this.load_copiedData.metaDescription,
            "description" : this.load_copiedData.description,
            "metaKeyword" : this.load_copiedData.metaKeyword,
            "metaTitle" : this.load_copiedData.metaTitle,
            "productName" : this.load_copiedData.productName,
            "sellPrice" : this.load_copiedData.sellPrice,
            "warranty" : this.load_copiedData.warranty,
            "features" : this.load_copiedData.features,

         })
        this.selected_speciality = this.load_copiedData.speciality
        this.selected_country= this.load_copiedData.country.id;
        this.dynamicSeller= this.load_copiedData.sellerDetail.id;
        this.selected_supplyType = this.load_copiedData.supplyTypeDetail.id;
        this.selected_category = this.load_copiedData.category.id;
        this.selected_cOrigin = this.load_copiedData.countryOrigin.id;
        this.selected_languageId = this.load_copiedData.language.id;
        this.selected_brand = this.load_copiedData.manufactureDetail.id;
        this.selected_sellerId = this.load_copiedData.sellerId
        this.dynamicSeller = this.load_copiedData.sellerProducts
        this.toastr.info("Change PRODUCT NAME & PN CODE before submit!", 'Note')

      } ,
      (error)=>{
        debugger
        this.toastr.error(error.error.message)
      })
    }
    else{
      this.toastr.error("Please Enter Product ID")
    }
  }
  get signUpControls() {
    return this.addProductForm.controls
  }
  onSelect(event) {
    
   ( event.target.checked ) ?  this.isVariant = true :  this.isVariant = false
   
}

onSelectDiscount(event) {
    
  ( event.target.checked ) ?  this.isQuantityDiscount = true :  this.isQuantityDiscount = false
  
}
onSelectQuote(event){
  if(event.target.checked){
    this.disable = true
    this.addProductForm.controls['MRP'].setValue(0)
  }
  else{
    this.disable = false
  }
  ( event.target.checked ) ?  this.priceZero = "0.0" :  this.priceZero = ''
}
onSelectSale(event){
  if(event.target.checked){
    this.disableSale = false
    this.addProductForm.controls['sellPrice'].setValue(0)
  }
  else{
    this.disableSale = true
  }
}
  editorValidation(event)
  {
  }
  fileChangeEvent1(fileInput : any){
    this.file = fileInput.target.files[0];
        this.addProductForm.controls['catelogue'].setValue(this.file ? this.file : '');
        // this.file = this.file.name
  }
  fileChangeEvent(e : any){
    (this.files.length != 0) ? this.files = [] : ''
        e.queue.forEach(element => {  
          this.files.push(
           element._file
          );
        });
  }
  scrollToElement(element) {
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }
  onSubmitAddProductForm(){
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
       debugger
      data.productsRelated = this.dataFormat(this.addProductForm.get('relatedItem').value )
      data.sellerProducts = this.addOtherKeysToSeller(this.dynamicSeller,this.countryIdData, this.productNameData ,this.languageIdData )
      data.productVariants = this.addOtherKeysToVarient(this.dynamicArray,this.countryIdData ,this.languageIdData)
      data.quantityDiscounts = this.dynamicQuantity
      data.file = this.files
      if (this.id ) {
        data.id = this.id;
      }
      data.catelogue = this.file
      if (this.editMode) {
        debugger
        this.productService.addProduct(data).subscribe(
          data => {
          this.toastr.success("Product Edited Successfully")
            this.router.navigate(['/catalogues/products'],{relativeTo : this.activatedRoute})
          },
          error => {
            this.toastr.error(error.error.message)
          });
      }
      else{
      this.productService.addProduct(data).subscribe(
        data => {
          this.toastr.success("Product Added Successfully")
          this.router.navigate(['/catalogues/products'],{relativeTo : this.activatedRoute})
        },
        error => {
          this.toastr.error(error.error.message)
  
        });
      }
    
  }

  private initForm(){
    let productName = "";
    let file ="";
     let catelogue = ""
     let sellPrice = 0.00
     let walletPrice = 0.00
     let MRP = 0.00

this.addProductForm = new FormGroup({
      "countryId":new FormControl(null,[Validators.required]), 
      "productName": new FormControl( productName, Validators.required), 
      "supplyTypeId": new FormControl( null, Validators.required),
      "manufactureId": new FormControl( null, Validators.required),
      "languageId":new FormControl(null, Validators.required), 
      "PNCDE": new FormControl(null, Validators.required),
      "noDiscount" : new FormControl(false),
      "isSale" : new FormControl(false),
      "sellPrice" : new FormControl(sellPrice),
      "metaTitle" : new FormControl(),
      "isQuote" : new FormControl(false,),
      "UOM" : new FormControl(null),
      "walletPrice" : new FormControl(walletPrice),
      "metaDescription" : new FormControl(),
      "metaKeyword" : new FormControl(),
      "categoryId" : new FormControl(null, Validators.required),
       "MRP" : new FormControl(''),
      "specialityId" : new FormControl(null),
      "countryOriginId" : new FormControl(null),
      "relatedItem": new FormControl(null),
      "isVariant": new FormControl(false),
      "isQuantityDiscount" : new FormControl(false),
      "description": new FormControl(),
      "warranty": new FormControl(),
      "features": new FormControl(),
       "video" : new FormControl(),
       "shortDiscription" : new FormControl(),
       "catelogue" : new FormControl(catelogue),
       "file" : new FormControl(file),
      //  "sellerDetails" : new FormControl(null, Validators.required),

    });
    
    if(this.editMode){
          this.productTitle = "Edit Product"
          this.productService.getProductDetails(this.id).pipe(takeUntil(this._unsubscribe)).subscribe(
            (success:any)=>{     
              debugger     
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
                  debugger
                  this.sellerLists = this.arrayOfStringsToArrayOfObjects(success.data);
                  this.dropdowns = this.arrayOfStringsToArrayOfObjects(success.data);
                  debugger
                  if(this.dropdowns != []){
                    this.sellerDetail = false
                  }
                },
                error => {
                }
              )
              this.commonService.getRelatedProducts(this.product.languageId ,this.searchRelatedItem  ).pipe(takeUntil(this._unsubscribe)).subscribe(
                (success:any) => {
                  debugger
                  this.autocompleteItemsAsObjects = success.data;
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
                "MRP" : this.product.MRP,
                "PNCDE" : this.product.PNCDE,
                "UOM" : this.product.UOM,
                "shortDiscription" : this.product.shortDesciption,
                "features" : this.product.features,
                "isVariant" : this.product.isPackage,
                "isQuote" : this.product.isQuote,
                "isSale" : this.product.isSale,
                "metaDescription" : this.product.metaDescription,
                "description" : this.product.description,
                "metaKeyword" : this.product.metaKeyword,
                "metaTitle" : this.product.metaTitle,
                "noDiscount" : this.product.noDiscount,
                "packageContent" : this.product.packageContent,
                "productName" : this.product.productName,
                "ribbenText" : this.product.ribbenText,
                "sellPrice" : this.product.sellPrice,
                "video" : this.product.video,
                "walletPrice" : this.product.walletPrice,
                "warranty" : this.product.warranty,
                "isQuantityDiscount":this.product.isQuantityDiscount
             })
            this.selected_speciality = this.product.speciality
            this.selected_country= this.product.countryId;
            this.dynamicSeller= this.product.sellerId;
            this.selected_supplyType = this.product.supplyTypeId;
            this.selected_category = this.product.categoryId;
            this.selected_cOrigin = this.product.countryOriginId;
            this.selected_languageId = this.product.languageId;
            this.selected_brand = this.product.manufactureId;
            this.selected_sellerId = this.product.sellerId
            this.dynamicArray = this.product.productVariants
            this.dynamicSeller = this.product.sellerProducts
            this.dynamicQuantity = this.product.quantityDiscounts
            debugger
           if(this.product.isPackage == true){
                this.isVariant = true;
           }
         
           if(this.product.isQuantityDiscount == true){
            this.isQuantityDiscount = true;
          }
          }
          ,
            error=>{          
            }
          )
          }
    }
    
  getdropdown1(event:any){
    this.selectedCountryId = event.value
   this.PNCDE_Check(this.PNCDE_value)
    this.getSupplyType();  
    this.getManufacturerBrands();
    this.getSellerList();
    this.getLanguage();
  }
  select(criteriaId: any , criteriaName:any) {
    
    this.selectedCriteria = [{
                "id" : criteriaId,
          "itemName" : criteriaName
    
    }]
    
    return this.selectedCriteria;
  }
  getlanguage(event:any)
  {
    
    this.selectedLanguageId = event.value ;
    this.getCategoryList();
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
        this.sellerLists = success.data
        this.dropdowns = this.arrayOfStringsToArrayOfObjects(success.data);
        debugger
        if(this.dropdowns != []){
          this.sellerDetail = false
        }
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
  filterRelatedProducts(e){
    this.searchRelatedItem = e
    this.getRelatedProducts()
  }
  getRelatedProducts(){
    this.commonService.getRelatedProducts(this.selectedLanguageId ,this.searchRelatedItem  ).pipe(takeUntil(this._unsubscribe)).subscribe(
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
        itemName : element.itemname
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
  console.log(this.dynamicArray)
  console.log(this.newDynamic)
  if(this.dynamicArray.length != 1){
    for(let i =0 ; i<(this.dynamicArray.length-1) ; i++){
      console.log(this.dynamicArray[i].PNCDE)
  if(this.dynamicArray[i].PNCDE == this.newDynamic.PNCDE){
    this.toastr.error("SKU/ PN CDE  of Variant must be unique", 'Error');
      return false;
  }
}
}
  this.newDynamic ={ variant: "",PNCDE:"",quantity: "",sellPrice:"",MRP:"",walletPrice:"",
  isQuote:false,deliveryTime:"",sellerFee : ""};
  this.dynamicArray.push(this.newDynamic);
  return true;
}
deleteRow(index) {
  if(this.dynamicArray.length ==1) {
    this.toastr.error("Can't delete the row when there is only one row", 'Warning');
      return false;
  } else {
      this.dynamicArray.splice(index, 1);
      return true;
  }
}
Varient_PNCDE(e){
  debugger
  for(let i= 1 ; i<=(this.dynamicArray.length) ; i++){
    var destination = this.dynamicArray;
    const found = destination.find(el => el.PNCDE == e);
    debugger
    if (found) {
      this.toastr.error("PN CDE can not be same", 'warning');
    }
  }

}
addQuantity(index) {  
  this.newQuantity = {minQuantity:"",maxQuantity:"",price:"", walletPrice:""};
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
