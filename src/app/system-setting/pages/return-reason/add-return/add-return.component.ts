import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ReturnReasonService } from 'app/shared/services/return-reason.service';
import { ToastrService } from 'ngx-toastr';
import { takeUntil } from 'rxjs/operators';
import { CommonServiceService } from 'app/shared/services/common-service.service';

@Component({
  selector: 'app-add-return',
  templateUrl: './add-return.component.html',
  styleUrls: ['./add-return.component.scss']
})
export class AddReturnComponent implements OnInit { 
  addBannerForm :FormGroup;
  isSubmittedaddBannerForm :boolean = false;
  dropdownSettings = {}; 
  returnReasonTitle:string;
  countries = [];
  dropdownListCountry = [];
  addBannerFormDetails: any;
  selectedCountryId: any[];
  id: number;
  editMode = false;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private returnRequestService: ReturnReasonService,
    private toastr: ToastrService,
    private commonService : CommonServiceService
  ) { }

  ngOnInit() {
    this.returnReasonTitle = "Add New Return";

    this.activatedRoute.params.subscribe(
      (id: Params) => {
        this.id = +id['id']
        this.editMode = id['id'] != null
        
        // this.initForm()
      })

      this.commonService.getCountry()
    .subscribe((data:any) => {
      
        this.dropdownListCountry = data.data
    })
  }

  get signUpControls() {
    return this.addBannerForm.controls;
  }

  multiSelectedListCountry(criteriaArray: any) {
    
    this.selectedCountryId = [];
    if (criteriaArray != null) {
      criteriaArray.forEach(element => {
        this.selectedCountryId.push(element);

      });
    }
    
    return this.selectedCountryId;
  }

  onSubmitBannerForm() {
    event.preventDefault();

    this.isSubmittedaddBannerForm = true
    if (this.addBannerForm.invalid) {
      return
    }
    this.addBannerFormDetails = {
      "reason": this.addBannerForm.get('reason').value,
      "countryName": this.multiSelectedListCountry(this.addBannerForm.get('countryName').value),
      // "languageId": this.multiSelectedListLanguage(this.addPerGroupForm.get('permission').value),
      }
    
    if (this.id) {

      this.addBannerFormDetails.groupId = this.id;
    }
    if (this.editMode) {

      this.returnRequestService.addBanner(this.addBannerFormDetails).subscribe(
        data => {

          this.router.navigate(['/systemsetting/return-reason'], { relativeTo: this.activatedRoute })
        },
        error => {
          this.toastr.error(error.message)

        });
    }
    else {


      this.returnRequestService.addBanner(this.addBannerFormDetails).subscribe(
        data => {

          this.toastr.success("Permission Group Added Successfully")
          this.router.navigate(['/systemsetting/return-reason'], { relativeTo: this.activatedRoute })
        },
        error => {
          this.toastr.error(error.message)

        });
    }
  }

  

}
