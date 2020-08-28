import { Component, OnInit } from '@angular/core';
import { Validators, FormControl, FormBuilder, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { SystemSettingsService } from '../../../../shared/services/systemSetting/system-settings.service';
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
  languages = [];
  currency =[];
  languageValue: any;
  currencyValue: any;
  selectedCriteria: any;
  languageData =[];
  selectedCriteriaId = [];
  countryId: any;
  dropdownSettings = {}

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private systemSettingsService: SystemSettingsService,
    private toastr: ToastrService,
    private commonService:CommonServiceService
  ) { }
  
  ngOnInit(): void {

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
   this.dropdownSettings = {
      singleSelection: false,
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      enableSearchFilter: true,
      classes: "myclass custom-class",
      position: "bottom",
      maxHeight: 250,
    };
      }
    )
  }
  private initForm() {
    
  this.addCountryForm = new FormGroup({
     "countryName": new FormControl(null, Validators.required),
     "languages": new FormControl(null, Validators.required),
     "currency": new FormControl(null, Validators.required),
  });
  
}
select(criteriaId: any , criteriaName:any) {
    
  this.selectedCriteria = [{
              "id" : criteriaId,
        "itemName" : criteriaName
  
  }]
  
  return this.selectedCriteria;
}
onSubmitCountryForm() {
  event.preventDefault();

  this.isSubmittedaddCountryForm = true
  if (this.addCountryForm.invalid) {
    return
  }
   
    this.addCountryFormDetails = {
      "languages": this.multiSelectedList(this.addCountryForm.get('languages').value),
      "currency": this.select(this.addCountryForm.get('currency').value , this.currencyValue),
      "countryName": this.countryValue,
      "countryId": this.countryId,

    }
    
    if(this.id)
    {
      this.addCountryFormDetails.id= this.id;
    }
 
   if(!this.id)
      {
        this.systemSettingsService.addCountry(this.addCountryFormDetails).pipe(takeUntil(this._unsubscribe)).subscribe(
          (success:any) => {
            this.toastr.success('Country Created Successfully!');
            this.router.navigate(['/systemsetting/country']);
          },
          error => {
            this.toastr.error(error.error.message);
          }
        )
      }

      if(this.id)
     {
      this.systemSettingsService.updateCountry(this.addCountryFormDetails).pipe(takeUntil(this._unsubscribe)).subscribe(
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
   this.addCountryForm.controls.countryName.patchValue(item.countryId);
   this.addCountryForm.controls.languages.patchValue(item.languages);
  this.addCountryForm.controls.currency.patchValue(item.currency[0].id);
} 

getCountrydetails(id) {
  this.systemSettingsService.getCountrydetails(id).pipe(takeUntil(this._unsubscribe)).subscribe(
    (success:any) => {
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
multiSelectedList(criteriaArray: any) {
  if (criteriaArray != null) {
    this.selectedCriteriaId = [];
    criteriaArray.forEach(element => {
      this.selectedCriteriaId.push(element);
    });
    return this.selectedCriteriaId;
  }
}
getCountry()
{
  this.commonService.getAllCountries().pipe(takeUntil(this._unsubscribe)).subscribe(
    (success:any) => {
      
      this.countries = this.arrayOfStringsToArrayOfObjectsCountry(success.data);
    },
    error => {
    }
  )
}
getLanguage()
{
  this.commonService.getLanguage().pipe(takeUntil(this._unsubscribe)).subscribe(
    (success:any) => {
      
      this.languageData = success.data
    },
    error => {
    }
  )
}
getCurrency()
{
  this.commonService.getCurrency().pipe(takeUntil(this._unsubscribe)).subscribe(
    (success:any) => {
      
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
      value: element.id
    });
  });
  return newArray;

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
getdropdown(event) 
{
  this.countryValue = this.countries.find( item => item.value === event.value).label;
  this.countryId = this.countries.find( item => item.value === event.value).value;

}
getdropdown2(event) 
{
  debugger
  this.currencyValue = this.currencies.find( item => item.value === event.value).label;
}
}