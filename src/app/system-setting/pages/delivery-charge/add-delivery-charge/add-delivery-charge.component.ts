import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { DeliveryChargeService } from 'app/shared/services/delivery-charge.service';
import { ToastrService } from 'ngx-toastr';
import { takeUntil } from 'rxjs/operators';
import { CommonServiceService } from 'app/shared/services/common-service.service';

interface Country {
  value:number, 
  label:string
}

@Component({
  selector: 'app-add-delivery-charge',
  templateUrl: './add-delivery-charge.component.html',
  styleUrls: ['./add-delivery-charge.component.scss']
})
export class AddDeliveryChargeComponent implements OnInit {
  deliveryChargeTitle:string; 
  addDeliveryForm :FormGroup;
  country: any;
  private _unsubscribe = new Subject<boolean>();
  isSubmittedaddDeliveryForm: boolean = false;
  id: number;
  editMode: boolean;
  countries:Country[];
  countryValue: any;
  selectedCountryId: any;
 
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private deliveryChargeService: DeliveryChargeService,
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
          this.deliveryChargeTitle = "Add New Delivery Charge";
        }
        if(this.id)
        {
          this.deliveryChargeTitle = "Edit Delivery Charge";
        }
         this.initForm()
         this.getCountry(); 
      }
    )
  }

  initForm()
  {
    this.addDeliveryForm = new FormGroup({
      "title": new FormControl(null, Validators.required),
      "noOfdays": new FormControl(null, Validators.required),
      "countryId":new FormControl(null, Validators.required),
      "minimumOrderAmount": new FormControl(null, Validators.required),
      "deliveryCharge":new FormControl(null, Validators.required),
      "instruction":new FormControl(null, Validators.required),
   });
  }
  onSubmitDeliveryForm() {
    this.isSubmittedaddDeliveryForm = true
    if (this.addDeliveryForm.invalid) {
      return
    }
    let data=this.addDeliveryForm.value;
    this.deliveryChargeService.addDelivery(data).pipe(takeUntil(this._unsubscribe)).subscribe(
      (success:any) => {
        this.toastr.success('Delivery Charge Created Successfully!');
        this.router.navigate(['/systemsetting/delivery-charge']);
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
    return this.addDeliveryForm.controls;
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

  getdropdown1(event:any){
    this.selectedCountryId = event.value
    }


}
