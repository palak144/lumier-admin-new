import { Component, OnInit } from '@angular/core';
import { Validators, FormControl, FormBuilder, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { SellerService } from '../../../../shared/services/seller.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { UtilityService } from '../../../../shared/utility/utility.service';
import { validateAllFormFields, noWhitespaceValidator, blankSpaceInputNotValid } from '../../../../shared/utils/custom-validators';
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
  sellerId:any;
  selectCountry: any;
  countries:Country[];
  countryValue: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private SellerService: SellerService,
    private toastr: ToastrService,
    private utilityService:UtilityService
  ) { }

  ngOnInit(): void {
  
   
    this.activatedRoute.params.subscribe(
      (id: Params) => {
        console.log(id);
        this.id = +id['id']
        console.log(this.id);
        this.sellerId=this.id;
        this.editMode = id['id'] != null
        console.log(this.editMode)
        if(!this.id)
        {
          this.sellerTitle = "Add New Sellers";
        }
        if(this.id)
        {
          this.sellerTitle = "Edit Sellers";
        }
        // this.initForm()
        this.getSellerdetails(this.id);
  this.getCountry();
  
      }
    )
    this.addSellerForm = new FormGroup({
      countryId:new FormControl(null,[Validators.required]),
      sellerName: new FormControl(null,[Validators.required,  Validators.pattern('^[A-Z0-9a-z._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,3}$')]),
      userName: new FormControl('',[Validators.required]),
      password: new FormControl('',[Validators.required]),
      sellerEmail : new FormControl('',[Validators.required]) ,
      ccEmail: new FormControl(null,[Validators.required]),
      mobileNo:new FormControl(null,[Validators.required]),
      pickupAddress:new FormControl(null,[Validators.required]),
      houseNo: new FormControl(null,[Validators.required]),
      unitNo: new FormControl(null,[Validators.required]),
      buildingName: new FormControl(null,[Validators.required]),
      streetName: new FormControl(null,[Validators.required]),
      pincode: new FormControl(null,[Validators.required]),
    
      accHolderName: new FormControl(null,[Validators.required]),
      accountNumber: new FormControl(null,[Validators.required]),
      IFSCCode: new FormControl(null,[Validators.required]),
      bankName: new FormControl(null,[Validators.required]),
      typeofAccount: new FormControl(null,[Validators.required]),
      commission: new FormControl(null,[Validators.required]),
      supplyType: new FormControl(null,[Validators.required]),
      floorNo: new FormControl(null,[Validators.required]),
    })
  }
 
  onSubmitSellerForm() {
   
    this.isSubmittedaddSellerForm = true
  
      console.log("mayuri");
      console.log('form valid');
      let data = this.addSellerForm.value;
      if(this.id)
      {
        data.id= this.id;
      }
     if(this.countryValue)
     {
this.addSellerForm.controls.countryId=this.countryValue;
     }
      if(!this.sellerId)
      {
        this.SellerService.addSeller(data).pipe(takeUntil(this._unsubscribe)).subscribe(
          (success:any) => {
            console.log(success);
         
            this.toastr.success('success','Seller Create Successfully!');
            this.router.navigate(['seller/sellers']);
  
          },
          error => {
            console.log(error);
            this.toastr.error('error',error);
          }
        )
      }
     if(this.sellerId)
     {
      this.SellerService.updateSeller(data).pipe(takeUntil(this._unsubscribe)).subscribe(
        (success:any) => {
          console.log(success);
          this.addSellerForm.reset();
          this.toastr.success('success','Seller Update Successfully!');
          this.router.navigate(['seller/sellers']);

        },
        error => {
          console.log(error);
          this.toastr.error('error',error);
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
        console.log(success);
        this.sellerDetailsData = success.data;
        console.log(this.sellerDetailsData);
       
        this.patchForm(this.sellerDetailsData);
       
  
      },
      error => {
        console.log(error);
      }
    )
  } 
  patchForm(item) {
    console.log(item);
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
  }
  getCountry()
  {
    this.SellerService.getCountry().pipe(takeUntil(this._unsubscribe)).subscribe(
      (success:any) => {
        console.log(success);
        this.countries = this.arrayOfStringsToArrayOfObjects(success.data.result);
        console.log('countries', this.countries);
       
    
       
  
      },
      error => {
        console.log(error);
      }
    )
  }
  arrayOfStringsToArrayOfObjects(arr: any[]) {
    console.log(arr);
    const newArray = [];
    arr.forEach(element => {
      console.log(element);
      newArray.push({
        label: element.countryName,
        value: element.id
      });
    });
    return newArray;
  }
  getdropdown(event)
  {
console.log(event.value);
this.countryValue=event.value;
console.log(this.countryValue);
  }
  }
