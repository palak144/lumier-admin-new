import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UsersPermissionsService } from 'app/shared/services/users-permissions.service';
import { ToastrService } from 'ngx-toastr';
import { takeUntil } from 'rxjs/operators';
import * as _ from 'lodash'
import { CommonServiceService } from 'app/shared/services/common-service.service';
import { ManufactureService } from 'app/shared/services/manufacture.service';
@Component({
  selector: 'app-add-parent-category',
  templateUrl: './add-parent-category.component.html',
  styleUrls: ['./add-parent-category.component.scss']
})
export class AddParentCategoryComponent implements OnInit {

  parentcategoryTitle:string;
  addParentCategoriesForm: FormGroup; 
  isSubmittedParentCategoriesForm: boolean = false;
  selected_countries:any;
  countries = [];
  dropdownSettings = {};
  dropdownListCountry = [];
  selectedCountryId: any[];
  private _unsubscribe = new Subject<boolean>();
  selectedPermissionId: any[];
  supplyTypes:any[];
  supplyTypeValue: any;
  selected_permission:any
  addPerGroupFormDetails: { groupName: any; countries: any[]; };
  ParentcategoryData:any;
  editMode: boolean;
  id: number;
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private usersPermissionsService: UsersPermissionsService,
    private toastr: ToastrService,
    private commonService : CommonServiceService,
    private manufactureService:ManufactureService,
  ) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(
      (id: Params) => {
        this.id = +id['id']
       console.log(this.id);
        // this.sellerId=this.id;
        this.editMode = id['id'] != null
        if(this.id)
        {
          this.getParentCategoryDetails(this.id);
        }
        if(!this.id)
        {
          this.parentcategoryTitle = "Add New Parent Categories";
        }
        if(this.id)
        {
          this.parentcategoryTitle = "Edit New Parent Categories";
        }
      }
      )
   
    this.initForm();
    this.getSupplyType();
    this.commonService.getCountry()
    .subscribe((data:any) => {
      
        this.dropdownListCountry = data.data
    })
    this.selected_countries = []
    this.dropdownSettings = {
      singleSelection: false,
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      enableSearchFilter: true,
      classes: "myclass custom-class",
      position: "bottom",
      maxHeight: "50px",
    };
  }

  onSubmitParentCategoriesForm(event) {
    console.log(event,this.addParentCategoriesForm);
    event.preventDefault();
    this.isSubmittedParentCategoriesForm = true
    if (this.addParentCategoriesForm.invalid) {
      return
    }
    let data = this.addParentCategoriesForm.value;
    console.log(data);
    debugger
    if(this.id)
    {
      data.id= this.id;
    }
    if(!this.id)
    {
    this.manufactureService.addParentCategory(data).pipe(takeUntil(this._unsubscribe)).subscribe(
      (success:any) => {
  console.log(success);
 
        this.toastr.success('Parent Category Create Successfully!');
        this.router.navigate(['/catalogues/parent-categories']);

      },
      error => {
        this.toastr.error('error',error);
      }
    )
    }
    if(this.id)
    {
     this.manufactureService.updateParentCategory(data).pipe(takeUntil(this._unsubscribe)).subscribe(
       (success:any) => {
         // this.addSellerForm.reset();
         this.toastr.success('Parent Category Create Successfully!');
         this.router.navigate(['/catalogues/parent-categories']);
 
 
       },
       error => {
         this.toastr.error(error.error.message);
       }
     )
    }

  } 

  get signUpControls() {
    return this.addParentCategoriesForm.controls;
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
  private initForm() {
    

    let categoryName = "";
    let supplytype = "";

    let countries = "";
     
  
  this.addParentCategoriesForm = new FormGroup({
     "categoryName": new FormControl(categoryName, Validators.required),
     "supplyTypeId": new FormControl(supplytype, Validators.required),
     "countries":new FormControl(countries, Validators.required),

  });
}
getSupplyType()
{
  this.commonService.getSupplyType().pipe(takeUntil(this._unsubscribe)).subscribe(
    (success:any) => {
     
      this.supplyTypes = this.arrayOfStringsToArrayOfObjects(success.data);
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
 getParentCategoryDetails(id) {
    this.manufactureService.getParentCategoryDetails(id).pipe(takeUntil(this._unsubscribe)).subscribe(
      (success:any) => {
        console.log(success);
        this.ParentcategoryData = success.data;
       console.log( this.ParentcategoryData);
        this.patchForm(this.ParentcategoryData);
       
  
      },
      error => {
      }
    )
  }
  patchForm(item)
  {
    this.addParentCategoriesForm.controls.categoryName.patchValue(item.categoryName);
    this.addParentCategoriesForm.controls.supplyTypeId.patchValue(item.supplyTypeId);
    this.addParentCategoriesForm.controls.countries.patchValue(item.countries);

  }
}
