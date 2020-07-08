import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Subject, of } from 'rxjs';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UsersPermissionsService } from 'app/shared/services/users-permissions.service';
import { UtilityService } from 'app/shared/services/utility.service';
import { takeUntil, map, catchError } from 'rxjs/operators';
import { validateAllFormFields, noWhitespaceValidator, blankSpaceInputNotValid } from '../../../../shared/utils/custom-validators';
import { ManufactureService } from 'app/shared/services/manufacture.service';
import { HttpErrorResponse, HttpEventType } from '@angular/common/http';
import { SellerService } from 'app/shared/services/seller.service';
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
  @ViewChild("fileUpload") fileUpload: ElementRef;files  = [];  
  countries:Country[];
  countryValue: any;
  supplyTypes:any[];
  supplyTypeValue: any;
  selectedFile: any;
  uploadData: FormData;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private manufactureService: ManufactureService,
    private commonService: CommonServiceService,
    private toastr: ToastrService,


  ) { }

  ngOnInit(): void {
    this.brandTitle = "Add Manufacturer/ Brand"

    this.activatedRoute.params.subscribe(
      (id: Params) => {
        this.id = +id['id']
        this.editMode = id['id'] != null
        
        this.initForm()
        this.getCountry();
        this.getSupplyType();
      }
    )
    

  }

  get signUpControls() {
    return this.addBrandForm.controls;
  }
 onFileChanged(event) {
   debugger
    this.selectedFile = event.target.files[0]
  }

  onUpload() {
    debugger
    this.uploadData = new FormData();
    this.uploadData.append('myFile', this.selectedFile, this.selectedFile.name);  }

  onSubmitBrandForm() {
    
    this.isSubmittedaddBrandForm = true
    if (this.addBrandForm.invalid) {
      return
    }
    if(this.countryValue)
     {
this.addBrandForm.controls.countryId=this.countryValue;
     }
     if(this.supplyTypeValue)
     {
this.addBrandForm.controls.supplyTypeId=this.supplyTypeValue;
     }
    this.addBrandFormDetails = {
      "manufacturerName": this.addBrandForm.get('name').value,
      "supplyTypeId":this.addBrandForm.get('supplyType').value,
      "file": this.uploadData
    }
    if (this.id ) {

      this.addBrandFormDetails.id = this.id;
    }
    if (this.editMode) {
      
      this.brandTitle = "Edit Manufacturer/ Brand Group"
      this.manufactureService.addBrand(this.addBrandFormDetails ).subscribe(
        data => {

this.toastr.success("Customer Group Editted Successfully")
          this.router.navigate(['/customer/customer-groups'],{relativeTo : this.activatedRoute})
        },
        error => {
          this.toastr.error(error.message)

        });



    }
    else{
    
    
    this.manufactureService.addBrand(this.addBrandFormDetails).subscribe(
      data => {
        debugger
        console.log(event); 
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
    this.commonService.getSupplyType().pipe(takeUntil(this._unsubscribe)).subscribe(
      (success:any) => {
        debugger
        this.supplyTypes = this.arrayOfStringsToArrayOfObjects(success.data);
      },
      error => {
      }
    )
  }
  arrayOfStringsToArrayOfObjects(arr: any[]) {
    const newArray = [];
    debugger
    arr.forEach(element => {
      newArray.push({
        label: element.itemName,
        value: element.id
      });
    });
    return newArray;
  }
  getdropdown(event)
  {
    debugger
this.countryValue=event.value;
  }
  getdropdown1(event)
  {
    debugger
this.supplyTypeValue=event.value;
  }
  private initForm(){
    let name = "";
let supplyType = "";
let logo = "";
    if(this.editMode){
      this.brandTitle = "Edit Manufacturer/ Brand"
      this.manufactureService.getBrandDetails(this.id).pipe(takeUntil(this._unsubscribe)).subscribe(
        (success:any)=>{
          
          this.brand=success.data
          this.addBrandForm.patchValue({
            "name" : this.brand.manufacturerName,
            "file" : this.brand.manufacturerName,

        })
      },
        error=>{
          
        }
      )

      }
    this.addBrandForm = new FormGroup({
      "countryId":new FormControl(null,[Validators.required]),
      "name": new FormControl( name, Validators.required),
      "supplyTypeId": new FormControl( supplyType, Validators.required),
      "logo": new FormControl( logo, Validators.required),
      "sort": new FormControl( '', Validators.required),
      "walletDiscount": new FormControl( '', Validators.required),

    });



}}
