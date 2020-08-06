import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { TaxService } from 'app/shared/services/systemSetting/tax.service';
import { ToastrService } from 'ngx-toastr';
import { takeUntil } from 'rxjs/operators';
import { CommonServiceService } from 'app/shared/services/common-service.service';

interface Country {
  _id:string,
  country:string
}

@Component({
  selector: 'app-add-tax',
  templateUrl: './add-tax.component.html',
  styleUrls: ['./add-tax.component.scss']
})
export class AddTaxComponent implements OnInit { 
  taxTitle:string; 
  addTaxForm :FormGroup;
  addTaxFormDetails: any;
  country: any;
  private _unsubscribe = new Subject<boolean>();
  isSubmittedaddTaxForm: boolean = false;
  id: number;
  editMode: boolean;
  countries:Country[];
  countryValue: any;
  selectedCountryId: any;
  taxDetailsData: any;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private taxService: TaxService,
    private toastr: ToastrService,
    private commonService : CommonServiceService
  ) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(
      (id: Params) => {
        this.id = +id['id']
        this.editMode = id['id'] != null
        if(!this.id)
        {
          this.taxTitle = "Add New Tax";
        }
        if(this.id)
        {
          this.taxTitle = "Edit Tax";
          this.getAllTaxdetails(this.id);
        }
         this.initForm()
         this.getCountry();
      }
    )
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
  arrayOfStringsToArrayOfObjectsCountry(arr: any[]) {
    const newArray = [];
    arr.forEach(element => {
      newArray.push({
        label: element.country,
        value: element.id
      });
    });
    return newArray; 
  }
  getdropdown1(event:any){
    this.selectedCountryId = event.value
  }

  initForm()
  {
    this.addTaxForm = new FormGroup({
      taxCode: new FormControl(null, Validators.required),
      countryId:new FormControl(null, Validators.required),
      taxRate: new FormControl(null, Validators.required),
   });
  }
  get signUpControls() {
    return this.addTaxForm.controls;
  }
  onSubmitTaxForm() 
  {
  
    event.preventDefault();

    this.isSubmittedaddTaxForm = true
    
    if (this.addTaxForm.invalid) {
      return
    }
    let data=this.addTaxForm.value;
    if(this.id)
    {
      data.id= this.id;
    }
    if(!this.id)
    {
    this.taxService.addtax(data).pipe(takeUntil(this._unsubscribe)).subscribe(
      (success:any) => {
        this.toastr.success('Tax Created Successfully!');
        this.router.navigate(['/systemsetting/tax']);
      }, 
      error => {
        this.toastr.error(error.error.message);
      }
    ) 
  }
  if(this.id) 
   {
    this.taxService.updateTax(data).pipe(takeUntil(this._unsubscribe)).subscribe(
      (success:any) => {
        // this.addSellerForm.reset();
        this.toastr.success('Tax Update Successfully!');
        this.router.navigate(['/systemsetting/tax']);

      },
      error => {
        this.toastr.error(error.error.message);
      }
    )
   }
  }

  getAllTaxdetails(id) {
    this.taxService.getAllTaxdetails(id).pipe(takeUntil(this._unsubscribe)).subscribe(
      (success:any) => {
        
        this.taxDetailsData = success.data;
       
        this.patchForm(this.taxDetailsData);
       
       
      },
      error => {
      }
    )
  }
  patchForm(item)
{
  
  this.addTaxForm.controls.taxCode.patchValue(item.taxCode);
  this.addTaxForm.controls.countryId.patchValue(item.countryId);
  this.addTaxForm.controls.taxRate.patchValue(item.taxRate);
} 

}
