import { Component, OnInit} from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Subject} from 'rxjs';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { takeUntil } from 'rxjs/operators';
import { ManufactureService } from 'app/shared/services/manufacture.service';
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
  selected_county : any 
  file: any;
  imageUrl: any;
  companyFlagSize: boolean = false;
  projectFlagSize: boolean = false;
  compLogofiletype: any;
  companyLogo: any;
  orgLogoData: any;
  dLogo: string;

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
        this.getSupplyType();
      }
    )
    this.selected_county = [];
    this.selected_supplyType = [];


  }

  get signUpControls() {
    return this.addBrandForm.controls;
  }

  onSubmitBrandForm() {
    debugger
    this.isSubmittedaddBrandForm = true
    if (this.addBrandForm.invalid) {
      return
    }
    this.addBrandFormDetails = {
      "manufacturerName": this.addBrandForm.get('name').value,
      "walletDiscount": this.addBrandForm.get('walletDiscount').value,
      "sort": this.addBrandForm.get('sort').value,
      "countryId": this.addBrandForm.get('countryId').value,
      "file": this.addBrandForm.get('file').value,
      "supplyTypeId":this.addBrandForm.get('supplyTypeId').value,
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
    
    debugger
    this.manufactureService.addBrand(this.addBrandFormDetails).subscribe(
      data => {
        debugger
        console.log(event); 
        this.toastr.success("Manufacturer/ Brand Added Successfully")
        // this.router.navigate(['/catalogues/manufacturing-brand'],{relativeTo : this.activatedRoute})
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

  fileChangeEvent(fileInput : any){
  
    this.file = fileInput.target.files[0];
    var last = this.file.name.substring(this.file.name.lastIndexOf(".") + 1, this.file.name.length); 
    if(this.file.type == "image/jpeg" || this.file.type == "image/jpg" || this.file.type == "image/png")
    if (this.file.size < 200000) {
    {
      this.companyFlagSize = true;
      this.compLogofiletype = last;
       let reader = new FileReader();
       debugger
        reader.readAsDataURL(this.file);
        debugger
        reader.onload = (event) => {
          this.url = reader.result;
          this.companyLogo = this.url;
          this.orgLogoData = this.url.substr(this.url.indexOf(',') + 1);
          document.getElementById('sizeValidations').style.color = 'black';
  debugger
        }
        this.addBrandForm.controls['file'].setValue(this.file ? this.file.name : '');
      }
    }
      else {
        this.companyFlagSize = false;
        debugger
        document.getElementById('sizeValidations').style.color = '#ffae42';
        this.addBrandForm.controls['file'].setValue(this.file ? '' : '');
      }
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
  private initForm(){
    let name = "";
let supplyTypeId = "";
let file = "";
let sort ="";
let walletDiscount ="";

    if(this.editMode){
      this.brandTitle = "Edit Manufacturer/ Brand"
      this.manufactureService.getBrandDetails(this.id).pipe(takeUntil(this._unsubscribe)).subscribe(
        (success:any)=>{          
          this.brand=success.data
          this.addBrandForm.patchValue({
            "name" : this.brand.manufacturerName,
            "sort" : this.brand.sort,
            "walletDiscount" : this.brand.walletDiscount,
        })
        this.selected_county= "";
        this.selected_supplyType = "";
      },
        error=>{          
        }
      )
      }
    this.addBrandForm = new FormGroup({
      "countryId":new FormControl(null,[Validators.required]),
      "name": new FormControl( name, Validators.required),
      "supplyTypeId": new FormControl( supplyTypeId, Validators.required),
      "file": new FormControl( file, Validators.required),
      "sort": new FormControl( sort, ),
      "walletDiscount": new FormControl( walletDiscount,),
    });



}}
