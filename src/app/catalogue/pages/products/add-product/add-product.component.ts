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

const URL = 'https://evening-anchorage-3159.herokuapp.com/api/';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
  
})
export class AddProductComponent implements OnInit {

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
  countryOrigins: string[];
  categories: any[];
  specialityTypes: string[];
  countries: any[];
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
  selected_country: any;
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
    @Inject(LOCALE_ID) private locale: string,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private commonService: CommonServiceService,
    private toastr: ToastrService,
    private productService:ProductService,

  ) {    
    
  }
  ngOnInit() {
    debugger
    console.log(this.uploader)
    this.productTitle = "Add New Product"
    this.dLogo = "assets/img/defaultImg.png";
    this.activatedRoute.params.subscribe(
      (id: Params) => {
        this.id = +id['id']
        this.editMode = id['id'] != null
        this.getCountry();
        this.getSpecialities();
      }
    )

    this.initForm()
    this.selected_country = [];
    this.selected_supplyType = [];
  }

  get signUpControls() {
      return this.addProductForm.controls
  }

  fileChangeEvent(e : any){
    this.file = e.queue[0];
    this.file = this.file.file 
    debugger

    for (var i = 0; i < e.queue.length; i++) { 
      this.files.push(e.queue[i]);
    }
    console.log(this.files)
    debugger
    if(this.file.type == "pdf")
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
    // let sequenceNumber ="";
    let page ="";
    let position ="";

    this.addProductForm = new FormGroup({
      countryId:new FormControl(null,[Validators.required]),
      fname: new FormControl( fname, Validators.required),
      supplyTypeId: new FormControl( null, Validators.required),
      brandId: new FormControl( null, Validators.required),
      languageId:new FormControl(null, Validators.required),
      relatedProducts : new FormControl(null, Validators.required),
      pnCode: new FormControl(null, Validators.required),
      noDiscount : new FormControl(null, Validators.required),
      isSale : new FormControl(null, Validators.required),
      shortDiscription : new FormControl(null, Validators.required),
      packageContent : new FormControl(null, Validators.required),
      price : new FormControl(null, Validators.required),
      metaTag : new FormControl(null, Validators.required),
      isQuote : new FormControl(null, Validators.required),
      UOM : new FormControl(null, Validators.required),
      walletPrice : new FormControl(null, Validators.required),
      metaDesc : new FormControl(null, Validators.required),
      metaKeyword : new FormControl(null, Validators.required),
      categoryId : new FormControl(null, Validators.required),
      ribbonText : new FormControl(null, Validators.required),
      speciality : new FormControl(null, Validators.required),
      isPackage : new FormControl(null, Validators.required),
      sellerFee : new FormControl(null, Validators.required),
      quantity : new FormControl(null, Validators.required),
      deliveryWithinDays : new FormControl(null, Validators.required),
      currency:new FormControl(null, Validators.required),

    });
    
        if(this.editMode){
          this.productTitle = "Edit Product"
          this.addProductForm.addControl(
            "file", new FormControl( file,),
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
        debugger
        this.categories = this.arrayOfStringsToArrayOfObjects(success.data);
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
    const newArray = [];
    arr.forEach(element => {
      newArray.push({
        label: element.itemName,
        value: element.id
      });
    });
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


}
