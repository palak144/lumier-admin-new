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
  private _unsubscribe = new Subject<boolean>();
  assignGroupList: any[] = [];
  sellerTitle:string;
  selectedAssignGroup: any;
  password: any;
  sellerDetailsData: any;
  // sellerId:any;
  countries:Country[];
  countryValue: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private SellerService: SellerService,
    private toastr: ToastrService,
    private commonService:CommonServiceService
  ) { }

  ngOnInit(): void {
  
   
    this.activatedRoute.params.subscribe(
      (id: Params) => {
        this.id = +id['id']
       
        // this.sellerId=this.id;
        this.editMode = id['id'] != null
        if(!this.id)
        {
          this.sellerTitle = "Add New Sellers";
        }
        if(this.id)
        {
          this.sellerTitle = "Edit Sellers";
        }
         this.initForm()
        if(this.id)
        {
          this.getSellerdetails(this.id);
        }
       
  this.getCountry();
  
      }
    )

  }
  public initForm(){
    
    this.addSellerForm = new FormGroup({
      countryId:new FormControl(null,[Validators.required]),
      sellerName: new FormControl(null,[Validators.required, ]),
      userName: new FormControl('',[Validators.required]),
      // password: new FormControl('',[Validators.required, Validators.pattern('^(?=.*?[a-z])(?=.*?[#?!@$%^&*-]).{8,}$')]),
      sellerEmail : new FormControl('',[Validators.required, Validators.pattern('^[A-Z0-9a-z._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,3}$')]) ,
      ccEmail: new FormControl(null,[Validators.required,  Validators.pattern('^[A-Z0-9a-z._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,3}$')]),
      mobileNo:new FormControl(null,[Validators.required, Validators.pattern('^[0-9]{5,15}$')]),
      pickupAddress:new FormControl(null,),
      houseNo: new FormControl(null,),
      unitNo: new FormControl(null,),
      buildingName: new FormControl(null,),
      streetName: new FormControl(null,),
      pincode: new FormControl(null,[Validators.required,Validators.pattern('^[0-9\+\-]{6}$')]),
    
      accHolderName: new FormControl(null,[Validators.required]),
      accountNumber: new FormControl(null,[Validators.required]),
      IFSCCode: new FormControl(null,[Validators.required]),
      bankName: new FormControl(null,[Validators.required]),
      typeofAccount: new FormControl(null,[Validators.required]),
      commission: new FormControl(null,),
      supplyType: new FormControl(null,[Validators.required]),
      floorNo: new FormControl(null,),
    })
    if(this.id)
    {
      
      this.addSellerForm.addControl(
        "password", new FormControl("", [
          Validators.minLength(8),
          Validators.pattern('^(?=.*?[a-z])(?=.*?[#?!@$%^&*-]).{8,}$'),
          Validators.maxLength(20)]))
    }
    else{
      this.addSellerForm.addControl(
        "password", new FormControl("", [Validators.required,
          Validators.minLength(8),
          Validators.pattern('^(?=.*?[a-z])(?=.*?[#?!@$%^&*-]).{8,}$'),
          Validators.maxLength(20)]))
    }
  }

  onSubmitSellerForm() {
    this.isSubmittedaddSellerForm = true
    
        
    if (this.addSellerForm.invalid) {
      return
    }
      let data = this.addSellerForm.value;
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
            this.router.navigate(['seller/sellers']);
  
          },
          error => {
            this.toastr.error('error',error);
          }
        )
      }
     if(this.id)
     {
      this.SellerService.updateSeller(data).pipe(takeUntil(this._unsubscribe)).subscribe(
        (success:any) => {
          // this.addSellerForm.reset();
          this.toastr.success('Seller Update Successfully!');
          this.router.navigate(['seller/sellers']);

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
       
        this.patchForm(this.sellerDetailsData);
       
  
      },
      error => {
      }
    )
  } 
  patchForm(item) {
    this.addSellerForm.controls.countryId.patchValue(item.countryId);
     this.addSellerForm.controls.sellerName.patchValue(item.sellerName);

   
    this.addSellerForm.controls.userName.patchValue(item.userName);

    // this.addSellerForm.controls.password.patchValue(item.password);
  
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
    
    this.addSellerForm.controls.supplyType.patchValue(item.supplyType);
    this.addSellerForm.controls.floorNo.patchValue(item.floorNo);
    // this.addSellerForm.controls.password.patchValue(item.password);

  }
  
  getCountry()
  {
    this.commonService.getCountry().pipe(takeUntil(this._unsubscribe)).subscribe(
      (success:any) => {
        this.countries = this.arrayOfStringsToArrayOfObjects(success.data.result);
       
    
       
  
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
