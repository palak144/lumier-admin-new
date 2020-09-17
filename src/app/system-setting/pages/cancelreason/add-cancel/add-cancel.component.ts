import { Component, OnInit } from '@angular/core';
import { Validators, FormControl, FormBuilder, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { SystemSettingsService } from '../../../../shared/services/systemSetting/system-settings.service';
import { CancelReasonService } from '../../../../shared/services/systemSetting/cancel-reason.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { CommonServiceService } from '../../../../shared/services/common-service.service';
interface Country {
  value:number, 
  label:string
}
@Component({
  selector: 'app-add-cancel',
  templateUrl: './add-cancel.component.html',
  styleUrls: ['./add-cancel.component.scss']
})
export class AddCancelComponent implements OnInit {
  addCancelForm: FormGroup;
  country: any;
  private _unsubscribe = new Subject<boolean>();
  isSubmittedaddCancelForm: boolean = false;
  id: number;
  editMode: boolean;
  countries:Country[];
  countryValue: any;
  cancelTitle: string;
  currencyValue: any;
  currencies: any;
  selectedCountryId: any;
  languages: any;
  selectedLanguageId: any;
  cancelData: any;
  constructor(private activatedRoute: ActivatedRoute,
    private router: Router,
    private systemSettingsService: SystemSettingsService,
    private CancelReasonService: CancelReasonService,
    private toastr: ToastrService,
    private commonService:CommonServiceService) { }

  ngOnInit() {
    
    this.activatedRoute.params.subscribe(
      (id: Params) => {
        this.id = +id['id']
       
        this.editMode = id['id'] != null
        if(!this.id)
        {
          this.cancelTitle = "Add New Cancel Reason";
        }
         this.initForm()
         this.getCountry(); 
      }
    )
  }
  initForm()
  {
    this.addCancelForm = new FormGroup({
      "countryId": new FormControl(null, Validators.required),
      "reason": new FormControl(null, Validators.required),
      "languageId":new FormControl(null, Validators.required),
    
   });
  }
  onSubmitcancelForm() {
    this.isSubmittedaddCancelForm = true
    if (this.addCancelForm.invalid) {
      return
    }
    let data=this.addCancelForm.value;
    this.CancelReasonService.addCancel(data).pipe(takeUntil(this._unsubscribe)).subscribe(
      (success:any) => {
        this.toastr.success('Cancel Created Successfully!');
        this.router.navigate(['/systemsetting/cancel']);
      },
      error => {
        this.toastr.error(error.error.message);
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
get signUpControls() {
  return this.addCancelForm.controls;
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
getLanguage()
{
 
  this.commonService.getCountryLanguage(this.selectedCountryId).pipe(takeUntil(this._unsubscribe)).subscribe(
    (success:any) => {
      this.languages = this.arrayOfStringsToArrayOfObjects(success.data);
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
getlanguage(event:any)
{
  this.selectedLanguageId = event.value ;
 
}
getdropdown1(event:any){ 
  this.selectedCountryId = event.value
this.getLanguage();
  }
}

