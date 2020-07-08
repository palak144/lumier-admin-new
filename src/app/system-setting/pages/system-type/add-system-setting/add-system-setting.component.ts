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
       console.log(this.id);
        // this.sellerId=this.id;
        this.editMode = id['id'] != null
        if(!this.id)
        {
          this.userTitle = "Add Supply Type";
        }
        if(this.id)
        {
          this.userTitle = "Edit Supply Type";
        }
      }
      )
      this.getCountry();
      this.getSupplyType();
    this.addUserForm = new FormGroup({
      name: new FormControl('',[Validators.required]),
      countryId: new FormControl('',[Validators.required]),
      // status: new FormControl('',[Validators.required]),
    })
  
}
  get signUpControls() {
    return this.addUserForm.controls;
  }
  onSubmitUserForm()
  {
    this.isSubmittedaddSellerForm = true
    
        
    if (this.addUserForm.invalid) {
      return
    }
    console.log(this.addUserForm.value);
    let data = this.addUserForm.value;
    this.SystemSettingsService.addSupply(data).pipe(takeUntil(this._unsubscribe)).subscribe(
      (success:any) => {
     
        this.toastr.success('Supply Type Create Successfully!');
        this.router.navigate(['/systemsetting/systemtype']);

      },
      error => {
        this.toastr.error('error',error);
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
  getdropdown(event)
  {

this.countryValue=event.value;
  }
  getdropdown1(event)
  {
  
this.supplyTypeValue=event.value;
  }
  getSupplyType()
  {
    this.commonService.getSupplyType().pipe(takeUntil(this._unsubscribe)).subscribe(
      (success:any) => {
        console.log(success);
        this.supplyTypes = this.arrayOfStringsToArrayOfObjects(success.data);
      
      },
      error => {
      }
    )
  }
}
