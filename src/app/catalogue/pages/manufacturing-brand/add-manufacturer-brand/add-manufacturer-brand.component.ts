import { Component, OnInit} from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Subject} from 'rxjs';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { takeUntil } from 'rxjs/operators';
import { ManufactureService } from 'app/shared/services/catalogue/manufacture.service';
import { CommonServiceService } from 'app/shared/services/common-service.service';

interface Country {
  _id:string,
  country:string
}
@Component({
  selector: 'app-add-manufacturer-brand',
  templateUrl: './add-manufacturer-brand.component.html',
  styleUrls: ['./add-manufacturer-brand.component.scss']
})

export class AddManufacturerBrandComponent implements OnInit {

  addBrandForm: FormGroup;
  editMode = false;
  isSubmittedaddBrandForm: boolean = false;
  id: number;
  addBrandFormDetails: any;
  brand: any;
  brandTitle: string;
  private _unsubscribe = new Subject<boolean>();
  countries:Country[];
  countryValue: any;
  supplyTypes:any[];
  supplyTypeValue: any;
  selectedFile: any;
  url: any;
  base64result: string;
  selected_supplyType : any 
  selected_country : any 
  file: any;
  imageUrl: any;
  companyFlagSize: boolean = false;
  projectFlagSize: boolean = false;
  compLogofiletype: any;
  companyLogo: any;
  orgLogoData: any;
  dLogo: string;
  wallet_discount: number;
  selectedCountryId: any;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private manufactureService: ManufactureService,
    private commonService: CommonServiceService,
    private toastr: ToastrService,


  ) { }

  ngOnInit(): void {
    this.brandTitle = "Add Manufacturer/ Brand"
    this.dLogo = "assets/img/defaultImg.png";

    this.activatedRoute.params.subscribe(
      (id: Params) => {
        this.id = +id['id']
        this.editMode = id['id'] != null
        
        this.initForm()
        this.getCountry();
      }
    )
    
    this.selected_country = [];
    this.selected_supplyType = [];

  }

  get signUpControls() {
    return this.addBrandForm.controls;
  }
  getdropdown(event:any){
  
    this.selectedCountryId = event.value
    
    this.getSupplyType();
      }
  onSubmitBrandForm() {
    event.preventDefault();

    this.isSubmittedaddBrandForm = true
    if (this.addBrandForm.invalid) {
      return
    }
    if(this.addBrandForm.get('walletDiscount').value == null || this.addBrandForm.get('walletDiscount').value < 0 ){
     
      this.wallet_discount = 0
    }
    else{
      
      this.wallet_discount = this.addBrandForm.get('walletDiscount').value
    }
    this.addBrandFormDetails = {
      "manufacturerName": this.addBrandForm.get('name').value,
      "walletDiscount": this.wallet_discount,
      "countryId": this.addBrandForm.get('countryId').value,
      "file": this.addBrandForm.get('file').value,
      "logoName" : this.file.name,
      "supplyTypeId":this.addBrandForm.get('supplyTypeId').value,
    }
    
    if (this.id ) {
      this.addBrandFormDetails.id = this.id;
    }
    if (this.editMode) {
      
      this.brandTitle = "Edit Manufacturer/ Brand Group"
      this.manufactureService.addBrand(this.addBrandFormDetails ).subscribe(
        data => {
        this.toastr.success("Manufacturer/ Brand Edited Successfully")
          this.router.navigate(['/catalogues/manufacturing-brand'],{relativeTo : this.activatedRoute})
        },
        error => {
          this.toastr.error(error.message)
        });
    }
    else{
    this.manufactureService.addBrand(this.addBrandFormDetails).subscribe(
      data => {
        this.toastr.success("Manufacturer/ Brand Added Successfully")
        this.router.navigate(['/catalogues/manufacturing-brand'],{relativeTo : this.activatedRoute})
      },
      error => {
        this.toastr.error(error.message)

      });
    }
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

  fileChangeEvent(fileInput : any){
  
    this.file = fileInput.target.files[0];
    
    var last = this.file.name.substring(this.file.name.lastIndexOf(".") + 1, this.file.name.length); 
    if(this.file.type == "image/jpeg" || this.file.type == "image/jpg" || this.file.type == "image/png")
    if (this.file.size < 200000) {
    {
      this.companyFlagSize = true;
      this.compLogofiletype = last;
       let reader = new FileReader();      
        reader.readAsDataURL(this.file);      
        reader.onload = (event) => {
           this.url = reader.result;
          this.companyLogo = this.url;        
          document.getElementById('sizeValidations').style.color = 'black';
        }
        this.addBrandForm.controls['file'].setValue(this.file ? this.file : '');
        this.file = this.file.name
      }
    }
      else {
        this.companyFlagSize = false;
        
        document.getElementById('sizeValidations').style.color = '#ffae42';
        this.addBrandForm.controls['file'].setValue(this.file ? '' : '');
      }
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
  private initForm(){
    
let name = "";
let file = "";
let walletDiscount = 0;

this.addBrandForm = new FormGroup({
  "countryId":new FormControl(null,[Validators.required]),
  "name": new FormControl( name, Validators.required),
  "supplyTypeId": new FormControl( null, Validators.required),
  "walletDiscount": new FormControl( walletDiscount,),
});

    if(this.editMode){
      this.brandTitle = "Edit Manufacturer/ Brand"
      this.addBrandForm.addControl(
        "file", new FormControl( file,),
      );
      this.manufactureService.getBrandDetails(this.id).pipe(takeUntil(this._unsubscribe)).subscribe(
        (success:any)=>{          
          this.brand=success.data
          this.commonService.getSupplyType(this.brand.countryId).pipe(takeUntil(this._unsubscribe)).subscribe(
            (success:any) => {
              this.supplyTypes = this.arrayOfStringsToArrayOfObjects(success.data);
            },
            error => {
            }
          )
          this.addBrandForm.patchValue({
            "name" : this.brand.manufacturerName,
            "walletDiscount" : this.brand.walletDiscount,
        })
        
        this.file = this.brand.logoName
        this.companyFlagSize = true;
        this.companyLogo = this.brand.logo,
        this.selected_country= this.brand.countryId;
        this.selected_supplyType = this.brand.supplyTypeId;
      },
        error=>{          
        }
      )
      }
      else{
        this.addBrandForm.addControl(
          "file", new FormControl( file,Validators.required),
        );
      }




}

}
