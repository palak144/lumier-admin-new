import { Component, OnInit } from '@angular/core';
import { Validators, FormControl, FormBuilder, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { SystemSettingsService } from '../../../../shared/services/system-settings.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { UtilityService } from '../../../../shared/utility/utility.service';
import { validateAllFormFields, noWhitespaceValidator, blankSpaceInputNotValid } from '../../../../shared/utils/custom-validators';
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
  currencies: string[];
  languages: string[];
  // statuses: string[];
 
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private systemSettingsService: SystemSettingsService,
    private toastr: ToastrService,
    private commonService:CommonServiceService
  ) { }
  
  ngOnInit(): void {
    this.currencies = ['Rupee', 'Doller', 'Pound'];

    this.languages = ['Hindi', 'English'];
    
    // this.statuses = ['Active.', 'Inactive.'];

    this.activatedRoute.params.subscribe(
      (id: Params) => {
        this.id = +id['id']
       
        // this.sellerId=this.id;
        this.editMode = id['id'] != null
        if(!this.id)
        {
          this.countryTitle = "Add New Country";
        }
        if(this.id)
        {
          this.countryTitle = "Edit Country";
        }
         this.initForm()
        // if(this.id)
        // {
        //   this.getCountrydetails(this.id);
        // }

  this.getCountry(); 
  
      }
    )
  }

  private initForm() {


    let countryName = "";
    let language = "";
    let currency = "";
    // let status = "";
  
  this.addCountryForm = new FormGroup({
     "countryName": new FormControl(countryName, Validators.required),
     "language": new FormControl(language, Validators.required),
     "currency": new FormControl(currency, Validators.required),
    //  "status": new FormControl(status, Validators.required),
  });
}
onSubmitCountryForm() {
  this.isSubmittedaddCountryForm = true


  if (this.addCountryForm.invalid) {
    return
  }
    let data = this.addCountryForm.value;
    console.log(data);
    if(this.id)
    {
      data.id= this.id;
    }
    console.log('===',this.countryValue);
   if(this.countryValue)
   {
      data.countryName = this.countryValue;
   }

   if(!this.id)

      {
        console.log('data=========', data);
        this.systemSettingsService.addCountry(data).pipe(takeUntil(this._unsubscribe)).subscribe(
          (success:any) => {
         
            this.toastr.success('Country Create Successfully!');
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
          this.toastr.success('Country Update Successfully!');
          this.router.navigate(['/systemsetting/country']);

        },
        error => {
          this.toastr.error(error.error.message);
        }
      )
     }

}
get signUpControls() {
  return this.addCountryForm.controls;
}

// getCountrydetails(id) {
//   this.systemSettingsService.getCountrydetails(id).pipe(takeUntil(this._unsubscribe)).subscribe(
//     (success:any) => {
//       this.countryDetailsData = success.data;
     
//       this.patchForm(this.countryDetailsData);


//     },
//     error => {
//     }
//   ) 
// } 

patchForm(item) {
   this.addCountryForm.controls.countryName.patchValue(item.countryName);
   this.addCountryForm.controls.languages.patchValue(item.languages);
  this.addCountryForm.controls.currency.patchValue(item.currency);

}

getCountry()
{
  this.commonService.getCountry().pipe(takeUntil(this._unsubscribe)).subscribe(
    (success:any) => {
      console.log(success);
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
  this.countryValue = this.countries.find( item => item.value === event.value).label;
  console.log('===',this.countryValue);
}

}