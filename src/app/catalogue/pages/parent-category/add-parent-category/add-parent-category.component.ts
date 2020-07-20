import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { takeUntil } from 'rxjs/operators';
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
  selected_clanguages:any;
  countries = [];
  languages = [];
  categoryNameLang = [];
  dropdownSettings = {};
  dropdownListCountry = [];
  dropdownListLanguage= [];
  selectedCountryId: any[];
  private _unsubscribe = new Subject<boolean>();
  supplyTypes:any[];
  supplyTypeValue: any;
  ParentcategoryData:any;
  editMode: boolean;
  id: number;
  selected_supplyType:any;
  name: {};
  categoryLang: any;
  inputs: any;
  language: any;
  countryLanguage: any;
  countryData: any;
  selectedCountryData: any;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private toastr: ToastrService,
    private commonService : CommonServiceService,
    private manufactureService:ManufactureService,
  ) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(
      (id: Params) => {
        this.id = +id['id']
        this.editMode = id['id'] != null
        if(!this.id)
        {
          this.parentcategoryTitle = "Add New Parent Category";
        }
        if(this.id)
        {
          this.parentcategoryTitle = "Edit New Parent Category";
          this.getParentCategoryDetails(this.id);
        }
      }
      )
      this.selected_supplyType = [];
    this.initForm();
    this.getCountry();
    // this.commonService.getLanguage()
    // .subscribe((data:any) => {
    //     this.dropdownListLanguage = data.data
    // })
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
  getCountry()
  {
    this.commonService.getCountry().pipe(takeUntil(this._unsubscribe)).subscribe(
      (success:any) => {
        debugger
        this.countryData = success.data
        this.countries = this.arrayOfStringsToArrayOfObjects(success.data);
      },
      error => {
      }
    )
  }
  onSubmitParentCategoriesForm(event) {
    event.preventDefault();
    this.isSubmittedParentCategoriesForm = true
    debugger
    if (this.addParentCategoriesForm.invalid) {
      return
    }
    let data = this.addParentCategoriesForm.value;
    this.addParentCategoriesForm.get('categoryNameLang').value
    data.categoryNameLang = this.languageObject(this.addParentCategoriesForm.get('categoryNameLang').value)
     debugger
    if(this.id)
    {
      data.id= this.id;
    }
    if(!this.id)
    {
    this.manufactureService.addParentCategory(data).pipe(takeUntil(this._unsubscribe)).subscribe(
      (success:any) => { 
        this.toastr.success('Parent Category Created Successfully!');
        this.router.navigate(['/catalogues/parent-categories']);
      },
      error => {
        this.toastr.error(error.error.message);
      }
    )
    }
    if(this.id)
    {
     this.manufactureService.updateParentCategory(data).pipe(takeUntil(this._unsubscribe)).subscribe(
       (success:any) => {
         // this.addSellerForm.reset();
         this.toastr.success('Parent Category Edited Successfully!');
         this.router.navigate(['/catalogues/parent-categories']);
       },
       error => {
         this.toastr.error(error.error.message);
       }
     )
    }

  } 
  languageObject(name){
    debugger
    name.forEach(element =>{
      this.language = this.addParentCategoriesForm.get('languages').value[element].itemName

    })
   this.name = {
     'categoryName' : name,
     'language' : this.language

   }
   return this.name
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
  
  this.addParentCategoriesForm = new FormGroup({
     "categoryName": new FormControl(null, Validators.required),
     "supplyTypeId": new FormControl(null, Validators.required),
     "countries":new FormControl(null, Validators.required),
     "languages":new FormControl(null, Validators.required),
     "categoryNameLang":new FormControl(null, Validators.required),


  });

}

getSupplyType()
{
  this.commonService.supply(this.selectedCountryId).pipe(takeUntil(this._unsubscribe)).subscribe(
    (success:any) => {
      this.supplyTypes = this.arrayOfStringsToArrayOfObjects(success.data);
    },
    error => {
    }
  )
}
getdropdown(event:any){
this.selectedCountryId = event.value

this.getSupplyType();

this.selectedCountryData = this.countryData.filter(item => item.id === this.selectedCountryId)

// this.languages = this.selectedCountryData[0].languages
debugger
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
        this.ParentcategoryData = success.data;
        this.patchForm(this.ParentcategoryData);
      },
      error => {
      }
    )
  }
  patchForm(item)
  {
    debugger
    this.addParentCategoriesForm.controls.categoryName.patchValue(item.categoryName);
    this.addParentCategoriesForm.controls.supplyTypeId.patchValue(item.supplyTypeId);
    this.addParentCategoriesForm.controls.countries.patchValue(item.countries);
    this.addParentCategoriesForm.controls.languages.patchValue(item.languages);
        this.addParentCategoriesForm.controls.languages.patchValue(item.categoryNameLang.categoryName);


  }
  onItemSelect(item:any){
    debugger
    this.categoryLang = item.itemName
    this.inputs = this.addParentCategoriesForm.get('languages').value
    
}
OnItemDeSelect(item:any){
  debugger
  this.inputs = this.addParentCategoriesForm.get('languages').value
}
}
