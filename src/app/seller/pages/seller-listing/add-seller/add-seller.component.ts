import { Component, OnInit } from '@angular/core';
import { Validators, FormControl, FormBuilder, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { SellerService } from '../../../../shared/services/seller.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { UtilityService } from '../../../../shared/utility/utility.service';
import { validateAllFormFields, noWhitespaceValidator, blankSpaceInputNotValid } from '../../../../shared/utils/custom-validators';
import { CommonServiceService } from 'app/shared/services/common-service.service';
interface Country {
  _id:string, 
  country:string
}
@Component({
  selector: 'app-add-seller',
  templateUrl: './add-seller.component.html',
  styleUrls: ['./add-seller.component.scss']
})
export class AddSellerComponent implements OnInit {
  addSellerForm: FormGroup;
  isSubmittedaddSellerForm: boolean = false;
  titles: string[];
  editMode = false;
  id: number;
  addSellerFormDetails: any;
  seller: any;
  supplyTypes:any[];
  supplyTypeValue: any;
  selected_supplyType:any;
  private _unsubscribe = new Subject<boolean>();
  assignGroupList: any[] = [];
  sellerTitle:string; 
  selectedAssignGroup: any;
  password: any;
  sellerDetailsData: any;
  selectedCountryId: any[];
  countries:Country[];
  countryValue: any;
  companyFlagSize: boolean;
  compLogofiletype: any;
  url: any;
  companyLogo: any;
  orgLogoData: any;
  dLogo: string;
  file: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private SellerService: SellerService,
    private toastr: ToastrService,
    private commonService:CommonServiceService
  ) { }

  ngOnInit(): void {
    this.dLogo = "assets/img/defaultImg.png";

   
    this.activatedRoute.params.subscribe(
      (id: Params) => {
        this.id = +id['id']
       
        // this.sellerId=this.id;
        this.editMode = id['id'] != null
        if(!this.id)
        {
          this.sellerTitle = "Add New Seller";
        }
        if(this.id)
        {
          this.sellerTitle = "Edit Seller";
        }
         this.initForm()
        if(this.id)
        {
          this.getSellerdetails(this.id);
        }
        this.selected_supplyType = [];

  this.getCountry();
  
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
  public initForm(){
    
    this.addSellerForm = new FormGroup({
      countryId:new FormControl('',[Validators.required]),
      sellerName: new FormControl('',[Validators.required, ]),
      userName: new FormControl('',[Validators.required]),
      // password: new FormControl('',[Validators.required, Validators.pattern('^(?=.*?[a-z])(?=.*?[#?!@$%^&*-]).{8,}$')]),
      sellerEmail : new FormControl('',[Validators.required, Validators.pattern('^[A-Z0-9a-z._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,3}$')]) ,
      ccEmail: new FormControl('',[Validators.pattern('^[A-Z0-9a-z._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,3}$')]),
      mobileNo:new FormControl('',[Validators.required , Validators.pattern('^[0-9]{5,15}$')]),
      pickupAddress:new FormControl('',),
      houseNo: new FormControl('',),
      unitNo: new FormControl('',),
      buildingName: new FormControl('',),
      streetName: new FormControl('',),
      pincode: new FormControl('',),
      accHolderName: new FormControl('',),
      accountNumber: new FormControl('',),
      IFSCCode: new FormControl('',),
      bankName: new FormControl('',),
      typeofAccount: new FormControl('',),
      commission: new FormControl('',),
      supplyTypeId: new FormControl('', Validators.required),
      floorNo: new FormControl('',),
    })
    if(this.id)
    {
      
      this.addSellerForm.addControl(
        "password", new FormControl("", [
          Validators.minLength(8),
          Validators.pattern('^(?=.*?[a-z])(?=.*?[#?!@$%^&*-]).{8,}$'),
          Validators.maxLength(20)]),
          )
          this.addSellerForm.addControl(
               "file", new FormControl(''),
              )
    }
    else{
      this.addSellerForm.addControl(
        "password", new FormControl("", [Validators.required,
          Validators.minLength(8),
          Validators.pattern('^(?=.*?[a-z])(?=.*?[#?!@$%^&*-]).{8,}$'),
          Validators.maxLength(20)]))
          this.addSellerForm.addControl(
            "file", new FormControl('',  Validators.required),
           )
    }
  }

  onSubmitSellerForm() {
    event.preventDefault();
    
    this.isSubmittedaddSellerForm = true
    if (this.addSellerForm.invalid) {
      return
    }
      let data = this.addSellerForm.value;
      data.file = this.addSellerForm.get('file').value
      
      if(this.id)
      {
        data.id= this.id;
      }
     if(this.countryValue)
     {
this.addSellerForm.controls.countryId=this.countryValue;
     }
     this.password = (this.addSellerForm.get('password').value != "" && this.addSellerForm.get('password').value != undefined) ? this.addSellerForm.get('password').value : ""
     data.password = this.password
    
      if(!this.id)
      {
        
        this.SellerService.addSeller(data).pipe(takeUntil(this._unsubscribe)).subscribe(
          (success:any) => {
         
            this.toastr.success('Seller Create Successfully!');
            this.router.navigate(['/seller/sellers']);
  
          },
          error => {
            this.toastr.error(error.error.message);
          }
        )
      }
     if(this.id)
     {
       
      this.SellerService.addSeller(data).pipe(takeUntil(this._unsubscribe)).subscribe(
        (success:any) => {
          // this.addSellerForm.reset();
          this.toastr.success('Seller Update Successfully!');
          this.router.navigate(['/seller/sellers']);

        },
        error => {
          this.toastr.error(error.error.message);
        }
      )
     }
 

  }
  get signUpControls() {
    return this.addSellerForm.controls;
  }
  getSellerdetails(id) {
    this.SellerService.getSellerdetails(id).pipe(takeUntil(this._unsubscribe)).subscribe(
      (success:any) => {
        this.sellerDetailsData = success.data;
        this.commonService.getSupplyType(this.sellerDetailsData.countryId).pipe(takeUntil(this._unsubscribe)).subscribe(
          (success:any) => {
            
            this.supplyTypes = this.arrayOfStringsToArrayOfObjects(success.data);
          },
          error => {
          }
        )
        this.patchForm(this.sellerDetailsData);
       
  
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
        this.addSellerForm.controls['file'].setValue(this.file ? this.file : '');
        this.file = this.file.name
        
      }
    }
      else {
        this.companyFlagSize = false;
        
        document.getElementById('sizeValidations').style.color = '#ffae42';
        this.addSellerForm.controls['file'].setValue(this.file ? '' : '');
      }
  }
  patchForm(item) {
    
    this.companyFlagSize = true;
    this.companyLogo = item.logo,
    this.addSellerForm.controls.countryId.patchValue(item.countryId);
     this.addSellerForm.controls.sellerName.patchValue(item.sellerName);
    //  this.addSellerForm.controls.file.patchValue(item.file);
    this.addSellerForm.controls.userName.patchValue(item.userName);
    this.addSellerForm.controls.sellerEmail.patchValue(item.sellerEmail);
    this.addSellerForm.controls.ccEmail.patchValue(item.ccEmail);
    this.addSellerForm.controls.mobileNo.patchValue(item.mobileNo);
  
    this.addSellerForm.controls.pickupAddress.patchValue(item.pickupAddress);
    this.addSellerForm.controls.houseNo.patchValue(item.houseNo);
    this.addSellerForm.controls.unitNo.patchValue(item.unitNo);
  
    this.addSellerForm.controls.buildingName.patchValue(item.buildingName);
    this.addSellerForm.controls.streetName.patchValue(item.streetName);
    this.addSellerForm.controls.pincode.patchValue(item.pincode);
  
    this.addSellerForm.controls.accHolderName.patchValue(item.accHolderName);
    this.addSellerForm.controls.accountNumber.patchValue(item.accountNumber);
    this.addSellerForm.controls.IFSCCode.patchValue(item.IFSCCode);
    this.addSellerForm.controls.bankName.patchValue(item.bankName);
    this.addSellerForm.controls.typeofAccount.patchValue(item.typeofAccount);
    this.addSellerForm.controls.commission.patchValue(item.commission);
    
    this.addSellerForm.controls.supplyTypeId.patchValue(item.supplyTypeId);
    this.addSellerForm.controls.floorNo.patchValue(item.floorNo);
    // this.addSellerForm.controls.password.patchValue(item.password);
  }
  getdropdown1(event:any){
    this.selectedCountryId = event.value
    this.getSupplyType();
    // this.selectedCountryData = this.countryData.filter(item => item.id === this.selectedCountryId)
    //  this.languages =this.arrayOfStringsToArrayOfObjectsLanguage( this.selectedCountryData[0].languages)
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
  getdropdown(event)
  {
this.countryValue=event.value;
  }
  }
