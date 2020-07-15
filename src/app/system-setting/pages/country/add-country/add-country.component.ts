import { Component, OnInit } from '@angular/core';
import { Validators, FormControl, FormBuilder, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { SystemSettingsService } from '../../../../shared/services/system-settings.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { CommonServiceService } from 'app/shared/services/common-service.service';

interface Country {
  value:number, 
  label:string
}

@Component({
  selector: 'app-add-country',
  templateUrl: './add-country.component.html',
  styleUrls: ['./add-country.component.scss']
})
export class AddCountryComponent implements OnInit {
  addCountryForm: FormGroup;
  isSubmittedaddCountryForm: boolean = false;
  titles: string[];
  editMode = false;
  id: number;
  addCountryFormDetails: any;
  country: any;
  private _unsubscribe = new Subject<boolean>();
  assignGroupList: any[] = [];
  countryTitle:string;
  selectedAssignGroup: any;
  countryDetailsData: any;
  countries:Country[];
  countryValue: any;
  currencies: any[];
  languages: any[];
  languageValue: any;
  currencyValue: any;
 
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private systemSettingsService: SystemSettingsService,
    private toastr: ToastrService,
    private commonService:CommonServiceService
  ) { }
  
  ngOnInit(): void {
debugger
    this.activatedRoute.params.subscribe(
      (id: Params) => {
        this.id = +id['id']
       
        this.editMode = id['id'] != null
        if(!this.id)
        {
          this.countryTitle = "Add New Country";
        }
        if(this.id)
        {
          this.countryTitle = "Edit Country";
          this.getCountrydetails(this.id)
        }
         this.initForm()

  this.getCountry(); 
  this.getLanguage();
  this.getCurrency();

      }
    )
  }
  private initForm() {
    
    let countryName = "";
    let languages = "";
    let currency = "";
    // let status = "";
  
  this.addCountryForm = new FormGroup({
     "countryName": new FormControl(countryName, Validators.required),
     "languages": new FormControl(languages, Validators.required),
     "currency": new FormControl(currency, Validators.required),
  });
  debugger
}
onSubmitCountryForm() {
  this.isSubmittedaddCountryForm = true
debugger

  if (this.addCountryForm.invalid) {
    return
  }
    let data = this.addCountryForm.value;
    if(this.id)
    {
      data.id= this.id;
    }
    data.languages = this.languageValue;
    data.currency = this.currencyValue;
    data.countryName = this.countryValue;
 
debugger
   if(!this.id)

      {
        this.systemSettingsService.addCountry(data).pipe(takeUntil(this._unsubscribe)).subscribe(
          (success:any) => {
         
            this.toastr.success('Country Created Successfully!');
            this.router.navigate(['/systemsetting/country']);
  
          },
          error => {
            this.toastr.error('error',error);
          }
        )
      }

      if(this.id)
     {
      this.systemSettingsService.updateCountry(data).pipe(takeUntil(this._unsubscribe)).subscribe(
        (success:any) => {
          // this.addSellerForm.reset();
          this.toastr.success('Country Edited Successfully!');
          this.router.navigate(['/systemsetting/country']);

        },
        error => {
          this.toastr.error(error.error.message);
        }
      )
     }

}


patchForm(item) {
  debugger
   this.addCountryForm.controls.countryName.patchValue(item.countryName);
   this.addCountryForm.controls.languages.patchValue(item.languages);
  this.addCountryForm.controls.currency.patchValue(item.currency);
}
getCountrydetails(id) {
  this.systemSettingsService.getCountrydetails(id).pipe(takeUntil(this._unsubscribe)).subscribe(
    (success:any) => {
      debugger
      this.countryDetailsData = success.data;
      this.patchForm(this.countryDetailsData);
    },
    error => {
    }
  ) 
} 
get signUpControls() {
  return this.addCountryForm.controls;
}

getCountry()
{
  this.commonService.getAllCountries().pipe(takeUntil(this._unsubscribe)).subscribe(
    (success:any) => {
      debugger
      this.countries = this.arrayOfStringsToArrayOfObjectsCountry(success.data);
    },
    error => {
    }
  )
}
getLanguage()
{
  this.systemSettingsService.getLanguage().pipe(takeUntil(this._unsubscribe)).subscribe(
    (success:any) => {
      debugger
      this.languages = this.arrayOfStringsToArrayOfObjects(success.data);
    },
    error => {
    }
  )
}
getCurrency()
{
  this.systemSettingsService.getCurrency().pipe(takeUntil(this._unsubscribe)).subscribe(
    (success:any) => {
      debugger
      this.currencies = this.arrayOfStringsToArrayOfObjectsCurrency(success.data);
    },
    error => {
    }
  )
}
arrayOfStringsToArrayOfObjectsCurrency(arr: any[]) {
  const newArray = [];
  arr.forEach(element => {
    newArray.push({
      label: element.itemName +" - "+ element.currencyCode,
      value: element.itemName +" - "+ element.currencyCode
    });
  });
  debugger
  return newArray;
}
arrayOfStringsToArrayOfObjects(arr: any[]) {
  const newArray = [];
  arr.forEach(element => {
    newArray.push({
      label: element.itemName,
      value: element.itemName
    });
  });
  return newArray;
}
arrayOfStringsToArrayOfObjectsCountry(arr: any[]) {
  const newArray = [];
  arr.forEach(element => {
    newArray.push({
      label: element.country,
      value: element.country
    });
  });
  return newArray;
}
getdropdown(event) 
{
debugger
  this.countryValue = this.countries.find( item => item.value === event.value).label;
}
getdropdown1(event) 
{
  debugger
  this.languageValue = this.languages.find( item => item.value === event.value).label;
}
getdropdown2(event) 
{
  debugger
  this.currencyValue = this.currencies.find( item => item.value === event.value).label;
}
}