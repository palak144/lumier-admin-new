import { Component, OnInit } from '@angular/core';
import { Validators, FormControl, FormBuilder, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { SellerService } from '../../../../shared/services/seller.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { SystemSettingsService } from '../../../../shared/services/system-settings.service';
import { UtilityService } from '../../../../shared/utility/utility.service';
import { validateAllFormFields, noWhitespaceValidator, blankSpaceInputNotValid } from '../../../../shared/utils/custom-validators';
import { CommonServiceService } from 'app/shared/services/common-service.service';
  
interface Country {
  _id:string,
  country:string
}
@Component({
  selector: 'app-add-system-setting',
  templateUrl: './add-system-setting.component.html',
  styleUrls: ['./add-system-setting.component.scss']
})
export class AddSystemSettingComponent implements OnInit {

  addUserForm: FormGroup;
  userTitle: string;
  isSubmittedaddSellerForm: boolean;
  id: number;
  editMode: boolean;
  private _unsubscribe = new Subject<boolean>();
  countries: any;
  countryValue: any;
  supplyTypes:any[];
  supplyTypeValue: any;
  supplyDetailsData: any;
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private SellerService: SellerService,
    private toastr: ToastrService,
    private commonService:CommonServiceService,
    private SystemSettingsService:SystemSettingsService,
  ) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(
      (id: Params) => {
        this.id = +id['id']
        this.editMode = id['id'] != null
        if(!this.id)
        {
          this.userTitle = "Add Supply Type";
        }
        if(this.id)
        {
          this.userTitle = "Edit Supply Type";
          this.getSupplyTypedetails(this.id);

        }
      }
      )
      this.getCountry();

    this.addUserForm = new FormGroup({
      name: new FormControl('',[Validators.required]),
      countryId: new FormControl('',[Validators.required]),
    })
}
  get signUpControls() {
    return this.addUserForm.controls;
  }
  onSubmitUserForm()
  {
    event.preventDefault();

    this.isSubmittedaddSellerForm = true
    
        
    if (this.addUserForm.invalid) {
      return
    }
    let data = this.addUserForm.value;
    if(this.id)
    {
      data.id= this.id;
    }
    if(!this.id)
    {
      this.SystemSettingsService.addSupply(data).pipe(takeUntil(this._unsubscribe)).subscribe(
        (success:any) => {
       
          this.toastr.success('Supply Type Create Successfully!');
          this.router.navigate(['/systemsetting/supplytype']);
  
        },
        error => {
          this.toastr.error('error',error);
        }
      )
    }
   if(this.id)
   {
    this.SystemSettingsService.updateSupply(data).pipe(takeUntil(this._unsubscribe)).subscribe(
      (success:any) => {
        // this.addSellerForm.reset();
        this.toastr.success('Supply Type Update Successfully!');
        this.router.navigate(['/systemsetting/supplytype']);

      },
      error => {
        this.toastr.error(error.error.message);
      }
    )
   }
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
  getdropdown(event)
  {

this.countryValue=event.value;
  }
  getdropdown1(event)
  {
  
this.supplyTypeValue=event.value;
  }

  getSupplyTypedetails(id) {
    this.SystemSettingsService.getSupplyTypedetails(id).pipe(takeUntil(this._unsubscribe)).subscribe(
      (success:any) => {
        
        this.supplyDetailsData = success.data;
       
        this.patchForm(this.supplyDetailsData);
       
  
      },
      error => {
      }
    )
  } 
patchForm(item)
{
  
  this.addUserForm.controls.name.patchValue(item.name);
  this.addUserForm.controls.countryId.patchValue(item.countryId);
}
}
