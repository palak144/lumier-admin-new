import { Component, OnInit, LOCALE_ID, Inject } from '@angular/core';
import { Validators, FormControl, FormBuilder, FormGroup } from '@angular/forms';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { CommonServiceService } from '../../../../shared/services/common-service.service';
import { ToastrService } from 'ngx-toastr';
import { ProductService } from '../../../../shared/services/catalogue/product-add.service';
import { FileUploader } from 'ng2-file-upload';
import { DynamicGrid } from './model/grid.model';
import { QuantityGrid } from './model/quantityGrid.model';
import { ConfirmationService } from 'primeng/api';
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
  dynamicQuantity: Array<QuantityGrid> = [];
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
  quantityBasedDiscountForm:FormGroup;
  isSubmittedaddProductForm: boolean = false;
  isSubmittedquantityBasedDiscountForm: boolean = false;
  permissions: any;
  closeResult: string;
  fieldArray: Array<any> = [];
   newAttribute: any = {};
   basedArray: Array<any> = [];
  manufacturerBrands: any[];
  categories: any[];
  specialityTypes: string[];
  countries: any[];
  autocompleteItemsAsObjects:any[] =[];
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
  selected_catelogue : string = "undefined"
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
  dropdowns: any[] ;
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
  public disableVariantSale: boolean = true;
  searchRelatedItem: any ="";
  public toggleButton: boolean = false;
  AllItemsRemoved: boolean = true;
  sellerDetail : boolean = true;
  PNSKU_id : string ;
  PNSKU_CDE : string
  load_copiedData: any;
  isValid: boolean = false;
  image_Links: any;
  validatePN: boolean = true;
  varientPN: boolean = false;
  relatedIdArray: any[] = [];
  action: any;
  items: any;
  RelatedItems: any[] =[];
  variantForm: FormGroup;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private commonService: CommonServiceService,
    private toastr: ToastrService,
    private productService:ProductService,
    private confirmationService: ConfirmationService,

  ) {    
    
  }
  ngOnInit() {
    this.newDynamic = { variant: "",PNCDE:"",quantity: 1,isSale:false,sellPrice:0,MRP:0,walletPrice:0,
    isQuote:false,deliveryTime:0,sellerFee : 0};
    this.dynamicArray.push(this.newDynamic);
    this.newSeller = {sellerId:'',sellerFee:0,quantity: 0, deliveryTime: 0};
    this.dynamicSeller.push(this.newSeller)
    this.newQuantity = {minQuantity:0,maxQuantity:0,price: 0, walletPrice: 0};
    
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
  checkIfValidQuantity(dataToBeValidated){
    if(dataToBeValidated != null && dataToBeValidated != undefined && dataToBeValidated != '' && dataToBeValidated != 0){
      return false
    }
    return true
  }
  newtab(path){
    window.open(path, "_blank");
  }
  checkIfImage(dataToBeValidated){
    if(dataToBeValidated != null && dataToBeValidated != undefined && dataToBeValidated != '' &&
     dataToBeValidated != '' ){
      return true
    }
    return false
  }
  
  PNCDE_Check(){
    
    if(this.PNSKU_CDE != "" && this.PNSKU_CDE != undefined){
      
 if(this.PNSKU_CDE != "" && this.selectedCountryId != undefined ){
 this.productService.onCheckPncode(this.selectedCountryId, this.PNSKU_CDE).subscribe(
  (success:any)=>
  {
    this.validatePN = false;
    document.getElementById('Validations').innerHTML = 'Entered SKU/ PN CDE is valid'
    document.getElementById('Validations').style.color = 'black';
 
} ,
(error)=>{
  this.validatePN = true;
  this.addProductForm.controls['PNCDE'].setValue('');
  document.getElementById('Validations').innerHTML = 'Entered SKU/ PN CDE already exists'
  document.getElementById('Validations').style.color = '#FF586B';
  
})
 }
 else{
  this.addProductForm.controls['PNCDE'].setValue('');
  document.getElementById('Validations').innerHTML = 'Select Country First'
  document.getElementById('Validations').style.color = '#FF586B'; }
}
else{
  this.validatePN = true;
}
  }
  load_data(){
    
    if(this.PNSKU_id != undefined && this.PNSKU_id != "") {
      this.productService.copyProductInfo(this.PNSKU_id).subscribe(
        (success:any)=>
        {
          this.load_copiedData = success.data
          this.selectedCountryId = this.load_copiedData.countryId
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
              this.sellerLists = this.arrayOfStringsToArrayOfObjects(success.data);
              this.dropdowns = this.arrayOfStringsToArrayOfObjects_Seller(success.data);
              
              (this.dropdowns.length != 0) ?  this.sellerDetail = false :  this.sellerDetail = true

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
  get signUpControlsQuantity() {
    
    return this.quantityBasedDiscountForm.controls
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
onSelectVariantSale(event){
  if(event.target.checked){
    this.disableVariantSale = false
  }
  else{
    this.disableVariantSale = true
  }
}
  editorValidation(event)
  {
  }
  removeCatalogue(){
    this.confirmationService.confirm({ 
      message: 'Are you sure that you want to perform this action?',
      accept: () => {
        var fileURL = this.selected_catelogue
    var id = 0
    var productId = this.id;
    let remove = {id , productId , fileURL}
    this.productService.removeImage(remove).subscribe(
      (success)=>{
        
  this.selected_catelogue = "undefined"
    },
      (error)=>{
        
      }
    )
    return true;
      },
      reject: () => {
        this.action = null;
      }
  });
  
  }
  fileChangeEvent1(fileInput : any){
    this.file = fileInput.target.files[0];
        this.addProductForm.controls['catelogue'].setValue(this.file ? this.file : '');
        //this.catelogue = this.file.name
  }
  fileChangeEvent(e : any){
    
    (this.files.length != 0) ? this.files = [] : ''
        e.queue.forEach(element => {  
          this.files.push(
           element._file
          );
        });
        
  }
  removeAddedImage(index:any){
    if (index > -1) {
      this.files.splice(index, 1);
    }
    
  }
  scrollToElement(element) {
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }
  checkVariantData(dynamicArray){
      for(let i= 1 ; i<=(dynamicArray.length) ; i++){
      const found = dynamicArray.find(el => el.PNCDE == "" || el.variant == "" || el.quantity == null ) ;
      const found1 = dynamicArray.find(el => el.quantity == 0 ) ;
  
         if (found) {
        this.toastr.error("Enter required fields of variant");
        return true
      }
      if (found1) {
        this.toastr.error("Required fields of variant can not be 0");
        return true
      }
    }
    var valueArr = dynamicArray.map(function(item){ return item.PNCDE });
    var isDuplicate = valueArr.some(function(item, idx){ 
        return valueArr.indexOf(item) != idx 
    });
    for (const obj of dynamicArray) { (obj.MRP == null) ? obj.MRP = 0 : obj.MRP = obj.MRP}
    for (const obj of dynamicArray) {  (obj.sellPrice == null) ? obj.sellPrice = 0 : obj.sellPrice = obj.sellPrice}
    for (const obj of dynamicArray) { (obj.walletPrice == null) ? obj.walletPrice = 0 : obj.walletPrice = obj.walletPrice}
    for (const obj of dynamicArray) {  (obj.deliveryTime == null) ? obj.deliveryTime = 0 : obj.deliveryTime = obj.deliveryTime }
    for (const obj of dynamicArray) {  (obj.sellerFee == null) ? obj.sellerFee = 0 : obj.sellerFee = obj.sellerFee }
  
    if(isDuplicate){
      this.toastr.error("PN CDE must be unique of Variants");
      return true
    }
    var valueArr = dynamicArray.map(function(item){ return item.variant });
    var isDuplicateVariantName = valueArr.some(function(item, idx){ 
        return valueArr.indexOf(item) != idx 
    });
    if(isDuplicateVariantName){
      this.toastr.error("Name must be unique of Variants");
      return true
    }
  }
  checkQuantityDiscountData(dynamicQuantity){
      for(let i= 1 ; i<=(dynamicQuantity.length) ; i++){
      const found = dynamicQuantity.find(el => el.minQuantity == null || el.maxQuantity ==  null  || el.price == null) ;
      const found1 = dynamicQuantity.find(el => el.minQuantity == 0 || el.maxQuantity ==  0  || el.price == 0 ) ;

      if (found) {
        this.toastr.error("Enter required fields of quantity based discount");
        return true
      }
      if (found1) {
        this.toastr.error("Required fields of quantity based discount can not be 0");
        return true
      }
    }
    for (const obj of dynamicQuantity) {
      if (obj.walletPrice == null ) {
        obj.walletPrice = 0;
            }
    }
  }
  checkSellerData(dynamicSeller){    
    for(let i= 1 ; i<=(dynamicSeller.length) ; i++){
    const found = dynamicSeller.find(el => el.sellerId == 0 || el.sellerFee ==  (0 || null)  || el.quantity ==  (0 || null) ||  el.deliveryTime ==  (0 || null)) ;
    if (found) {
      this.toastr.error("Seller Details are required");
      return true
    }
  }
}
  onSubmitAddProductForm(){
      event.preventDefault();
      
      (this.editMode)? '' : this.PNCDE_Check();
      
      this.isSubmittedaddProductForm = true
      if (this.addProductForm.invalid) {
        let invalidFields = [].slice.call(document.getElementsByClassName('ng-invalid'));
        this.scrollToElement(invalidFields[1]);
        return
      }
      if(this.isVariant == true){
        if(this.checkVariantData(this.dynamicArray) == true){
          return
        }
      }
      if(this.isQuantityDiscount == true){
        if(this.checkQuantityDiscountData(this.dynamicQuantity) == true){
          return
        }
      }
      if(this.checkSellerData(this.dynamicSeller) == true){
        return
      }
      this.countryIdData = this.addProductForm.get('countryId').value,
      this.productNameData = this.addProductForm.get('productName').value,
      this.languageIdData = this.addProductForm.get('languageId').value    
      let data=this.addProductForm.value;
       if (this.editMode) {
        data.productsRelated = this.productsRelatedEdit(this.addProductForm.get('relatedItem').value )
       }
       else{
        data.productsRelated = this.productsRelated(this.addProductForm.get('relatedItem').value )
       }
      data.sellerProducts = this.addOtherKeysToSeller(this.dynamicSeller,this.countryIdData, this.productNameData ,this.languageIdData )
       data.quantityDiscounts = this.dynamicQuantity
       data.productVariants = this.addOtherKeysToVarient(this.dynamicArray,this.countryIdData ,this.languageIdData)

      data.file = this.files
      if (this.id ) {
        data.id = this.id;
      }
      data.catelogue = this.file
      if (this.editMode) {
        
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
          this.AllItemsRemoved = false
          this.productService.getProductDetails(this.id).pipe(takeUntil(this._unsubscribe)).subscribe(
            (success:any)=>{     
                   
              this.product=success.data
              this.selectedCountryId = this.product.countryId
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
                  
                  this.sellerLists = this.arrayOfStringsToArrayOfObjects(success.data);
                  this.dropdowns = this.arrayOfStringsToArrayOfObjects_Seller(success.data);
                  
                  (this.dropdowns.length != 0) ?  this.sellerDetail = false :  this.sellerDetail = true

                },
                error => {
                }
              )
              this.getRelatedProductsEdit()
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
                "UOM" :  (this.product.UOM == "null")?'':this.product.UOM,
                "shortDiscription" : (this.product.shortDesciption == "null")?'':this.product.shortDesciption,
                "features" : (this.product.features == "<p>null</p>")?'':this.product.features,
                "isVariant" : this.product.isPackage,
                "isQuote" : this.product.isQuote,
                "isSale" : this.product.isSale,
                "metaDescription" :(this.product.metaDescription == "null")?'':this.product.metaDescription,
                "description" : (this.product.description == "null")?'':this.product.description,
                "metaKeyword" :(this.product.metaKeyword == "null")?'':this.product.metaKeyword,
                "metaTitle" :(this.product.metaTitle == "null")?'':this.product.metaTitle,
                "noDiscount" : this.product.noDiscount,
                "packageContent" : this.product.packageContent,
                "productName" : this.product.productName,
                "ribbenText" : this.product.ribbenText,
                "sellPrice" : this.product.sellPrice,
                "video" :  (this.product.video == "null")?'':this.product.video,
                "walletPrice" : this.product.walletPrice,
                "warranty" : (this.product.warranty == "null")?'':this.product.warranty,
                "isQuantityDiscount":this.product.isQuantityDiscount,
                "relatedItem" : this.productsRelatedEditDisplay(this.product.productsRelated)
             })
            this.selected_catelogue = this.product.catelogue
            this.selected_speciality = this.product.speciality
            this.selected_country= this.product.countryId;
            this.dynamicSeller= this.product.sellerId;
            this.selected_supplyType = this.product.supplyTypeId;
            this.selected_category = this.product.categoryId;
            this.selected_cOrigin = this.product.countryOriginId;
            this.selected_languageId = this.product.languageId;
            this.selected_brand = this.product.manufactureId;
            this.selected_sellerId = this.product.sellerId;
            this.dynamicSeller = this.product.sellerProducts
          
           if(this.product.isPackage == true){
                this.isVariant = true;
                this.dynamicArray = this.product.productVariants
           }
           if(this.product.isSale == true){
            this.disableSale = false
          }
           if(this.product.isQuantityDiscount == true){
            this.isQuantityDiscount = true;
            this.dynamicQuantity = this.product.quantityDiscounts

          }
          (this.product.UOM == null)?'':this.product.UOM

          }
          ,
            error=>{          
            }
          )
          }
    }
    productsRelatedEditDisplay(arr: any[]) {
      const newArray = [];
      if (arr != null) {
      arr.forEach(element => {
        newArray.push(
         element.itemName
        );
      });
    }
    
      return newArray;
    }
    productsRelatedEditArray(arr: any[]) {
      const newArray = [];
      if (arr != null) {
      arr.forEach(element => {
        newArray.push(
         element.relatedId
        );
      });
    }
    
      return newArray;
    }
    PNCDE_Varient_Check(event){
      if(event != "" && event != undefined){
        
   if(event != "" && this.selectedCountryId != undefined ){
   this.productService.onCheckPncode(this.selectedCountryId,event).subscribe(
    (success:any)=>
    {
      this.varientPN = false;
  } ,
  (error)=>{
    this.varientPN= true;
    this.toastr.error("Entered SKU/ PN CDE already exists")
  })
   }
  }
  else{
    this.varientPN= true;
    return false;
  }
    }
  getdropdown1(event:any){
    this.selectedCountryId = event.value
   this.PNCDE_Check()
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
        this.dropdowns = this.arrayOfStringsToArrayOfObjects_Seller(success.data);
        
        (this.dropdowns.length != 0) ?  this.sellerDetail = false :  this.sellerDetail = true
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
    this.searchRelatedItem = e;
    if(this.editMode){
      this.selectedLanguageId = this.product.languageId
    }
    this.getRelatedProducts()
  }
  getRelatedProducts(){
    this.commonService.getRelatedProducts(this.selectedLanguageId ,this.searchRelatedItem , this.relatedIdArray ).pipe(takeUntil(this._unsubscribe)).subscribe(
      (success:any) => {
        this.autocompleteItemsAsObjects = success.data;
        console.log("add data" ,this.RelatedItems)
      },
      error => {
      }
    )
  }
  getRelatedProductsEdit(){
    this.relatedIdArray = this.productsRelatedEditArray(this.product.productsRelated)
    this.commonService.getRelatedProducts(this.product.languageId ,this.searchRelatedItem ,this.relatedIdArray  ).pipe(takeUntil(this._unsubscribe)).subscribe(
       (success:any) => {
         this.autocompleteItemsAsObjects = success.data
         console.log("api data" ,this.autocompleteItemsAsObjects)
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
  arrayOfStringsToArrayOfObjects_Seller(arr: any[]) {
    const newArray = [{
      label : 'Select Seller Name',
      value : 0
    }];
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
  
  productsRelated(arr: any[]) {
    const newArray = [];
    if (arr != null) {
    arr.forEach(element => {
      newArray.push({
        relatedId: element.id,
        itemName : element.itemName
      });
    });
  }
    return newArray;
  }
  productsRelatedEdit(arr: any[]) {
    let result = arr.filter(e => typeof e === 'object');
    const newArray = [];
    if (result != null) {
      result.forEach(element => {
      newArray.push({
        relatedId: element.id,
        itemName : element.itemName
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
  this.PNCDE_Varient_Check(this.newDynamic.PNCDE)
  if(this.dynamicArray.length != 1){
    for(let i =0 ; i<(this.dynamicArray.length-1) ; i++){
      this.PNCDE_Varient_Check(this.newDynamic.PNCDE)

}
}
  this.newDynamic ={ variant: "",PNCDE:"",quantity: 1,isSale:false,sellPrice:0,MRP:0,walletPrice:0,
  isQuote:false,deliveryTime:0,sellerFee : 0};
  this.dynamicArray.push(this.newDynamic);
  return true;
}

setDefault1(isDefault:boolean,productId,id){
  
  var isDefault = true;
  let defaultdata = {id, productId, isDefault}
  this.productService.defaultImage(defaultdata).subscribe(
    (success)=>{
      this.initForm()
    },
    (error)=>{
      
    }
  )
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
removeImage(index,id:number,fileURL:string){
  this.confirmationService.confirm({ 
    message: 'Are you sure that you want to perform this action?',
    accept: () => {
      this.product.productImage.splice(index, 1);
  let remove = {id, fileURL}
  this.productService.removeImage(remove).subscribe(
    (success)=>{
  },
    (error)=>{
    }
  )
  return true;
    },
    reject: () => {
      this.action = null;
    }
});
 
}
Varient_PNCDE(e){
  
  for(let i= 1 ; i<=(this.dynamicArray.length) ; i++){
    var destination = this.dynamicArray;
    const found = destination.find(el => el.PNCDE == e);
    
    if (found) {
      this.toastr.error("PN CDE can not be same", 'warning');
    }
  }
}
addQuantity(index) {  
  
  this.newQuantity = {minQuantity:0,maxQuantity:0,price:0, walletPrice:0};
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
