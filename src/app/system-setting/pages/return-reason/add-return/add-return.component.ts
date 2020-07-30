import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ReturnReasonService } from 'app/shared/services/systemSetting/return-reason.service';
import { ToastrService } from 'ngx-toastr';
import { takeUntil } from 'rxjs/operators';
import { CommonServiceService } from 'app/shared/services/common-service.service';
 
interface Country {
  value:number, 
  label:string
}
 @Component({
  selector: 'app-add-return',
  templateUrl: './add-return.component.html',
  styleUrls: ['./add-return.component.scss']
})
export class AddReturnComponent implements OnInit { 
  addReturnForm :FormGroup;
  country: any;
  private _unsubscribe = new Subject<boolean>();
  isSubmittedaddReturnForm: boolean = false;
  id: number;
  editMode: boolean;
  countries:Country[];
  countryValue: any;
  returnReasonTitle: string;
  // currencyValue: any;
  // currencies: any;
  selectedCountryId: any;
  languages: any;
  selectedLanguageId: any;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private returnRequestService: ReturnReasonService,
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
          this.returnReasonTitle = "Add New Return reason";
        }
        // if(this.id)
        // {
        //   this.returnReasonTitle = "Edit Return reason";
        // }
         this.initForm()
         this.getCountry(); 
      }
    )
  }
  initForm()
  {
    this.addReturnForm = new FormGroup({
      "countryId": new FormControl(null, Validators.required),
      "reason": new FormControl(null, Validators.required),
      "languageId":new FormControl(null, Validators.required),
   });
  }

  onSubmitReturnForm() {
    this.isSubmittedaddReturnForm = true
    if (this.addReturnForm.invalid) {
      return
    }
    let data=this.addReturnForm.value;
    this.returnRequestService.addReturn(data).pipe(takeUntil(this._unsubscribe)).subscribe(
      (success:any) => {
        this.toastr.success('Reaturn reason Created Successfully!');
        this.router.navigate(['/systemsetting/return-reason']);
      },
      error => {
        this.toastr.error(error.error.message);
      }
    )
  }
  // if(this.id)
  //   {
  //     console.log("update");
  //     this.returnRequestService.addReturn(this.addReturnFormDetails).pipe(takeUntil(this._unsubscribe)).subscribe(
  //       (success:any) => {
  //      console.log(success);
  //         this.toastr.success('Reaturn reason Updated Successfully!');
  //         this.router.navigate(['/systemsetting/return-reason']);
  
  //       },
  //       error => {
  //         this.toastr.error(error.error.message);
  //       }
  //     )
  //   }
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
    return this.addReturnForm.controls;
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
