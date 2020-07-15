import { Component, OnInit } from '@angular/core';
import { Validators, FormControl, FormBuilder, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { CategoryService } from '../../../../shared/services/catalogue/category.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { UtilityService } from '../../../../shared/utility/utility.service';
import { validateAllFormFields, noWhitespaceValidator, blankSpaceInputNotValid } from '../../../../shared/utils/custom-validators';
import { CommonServiceService } from 'app/shared/services/common-service.service';

interface Country {
  _id:string, 
  country:string
}

@Component({ 
  selector: 'app-add-new-category',
  templateUrl: './add-new-category.component.html',
  styleUrls: ['./add-new-category.component.scss']
})
export class AddNewCategoryComponent implements OnInit {

  categoryTitle:string;
  addCategoriesForm: FormGroup; 
  isSubmittedaddCategoriesForm: boolean = false;
  countryValue: any;
  private _unsubscribe = new Subject<boolean>();
  titles: string[];
  editMode = false;
  id: number;
  addCategoriesFormDetails: any;
  category: any;
  countries:Country[];


  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private categoryService: CategoryService,
    private toastr: ToastrService,
    private commonService:CommonServiceService
  ) { }

  ngOnInit(): void {

    this.categoryTitle = "Add New Categories";
    this.activatedRoute.params.subscribe(
      (id: Params) => {
        this.id = +id['id']
       
        // this.sellerId=this.id;
        this.editMode = id['id'] != null
        if(!this.id)
        {
          this.categoryTitle = "Add New Categories";
        }
        if(this.id)
        {
          this.categoryTitle = "Edit Categories";
        }
         this.initForm()
        if(this.id)
        // {
        //   this.getSellerdetails(this.id);
        // }
       
  this.getCountry();
  
      }
    )

    // this.initForm();
  }



  get signUpControls() {
    return this.addCategoriesForm.controls;
  }

  private initForm() {
    

    let fname = "";
    let countryId = "";
    let parentCategory = "";
    let filterTitle = "";
    let filterDetail = "";
    let category = "";
    let sort = "";
    let metaTitle = "";
    let metaDescription = "";
    let metaKeyword = "";
    let staticmetaTag = "";
    let description = "";
     
  
  this.addCategoriesForm = new FormGroup({
     "fname": new FormControl(fname, Validators.required),
     "countryId": new FormControl(countryId, Validators.required),
     "parentCategory": new FormControl(parentCategory, Validators.required),
     "filterTitle": new FormControl(filterTitle, Validators.required),
     "filterDetail": new FormControl(filterDetail, Validators.required),
     "category": new FormControl(category, Validators.required),
     "sort": new FormControl(sort, Validators.required),
     "metaTitle": new FormControl(metaTitle, Validators.required),
     "metaDescription": new FormControl(metaDescription, Validators.required),
     "metaKeyword": new FormControl(metaKeyword, Validators.required),
     "staticmetaTag": new FormControl(staticmetaTag, Validators.required),
     "description": new FormControl(description, Validators.required),
  });
}

onSubmitCategoriesForm() {
  console.log(event,this.addCategoriesForm);
    event.preventDefault();
    this.isSubmittedaddCategoriesForm = true
    if (this.addCategoriesForm.invalid) {
      return
    }
  this.isSubmittedaddCategoriesForm = true


  if (this.addCategoriesForm.invalid) {
    return
  }
    let data = this.addCategoriesForm.value;
    console.log(data);
    if(this.id)
    {
      data.id= this.id;
    }
    console.log('===',this.countryValue);
   if(this.countryValue)
  //  {
  //     data.countryName = this.countryValue;
  //  }

   if(!this.id)

      {
        console.log('data=========', data);
        this.categoryService.addCategory(data).pipe(takeUntil(this._unsubscribe)).subscribe(
          (success:any) => {
         
            this.toastr.success('Country Create Successfully!');
            this.router.navigate(['/catalogues/categories']);
  
          },
          error => {
            this.toastr.error('error',error);
          }
        )
      }

      if(this.id)
     {
      this.categoryService.updateCategory(data).pipe(takeUntil(this._unsubscribe)).subscribe(
        (success:any) => {
          // this.addSellerForm.reset();
          this.toastr.success('Country Update Successfully!');
          this.router.navigate(['/catalogues/categories']);

        },
        error => {
          this.toastr.error(error.error.message);
        }
      )
     }
}

patchForm(item) {
  this.addCategoriesForm.controls.fname.patchValue(item.fname);
  this.addCategoriesForm.controls.countryId.patchValue(item.countryId);
  this.addCategoriesForm.controls.parentCategory.patchValue(item.parentCategory);
  this.addCategoriesForm.controls.filterTitle.patchValue(item.filterTitle);
  this.addCategoriesForm.controls.filterDetail.patchValue(item.filterDetail);
  this.addCategoriesForm.controls.category.patchValue(item.category);
  this.addCategoriesForm.controls.sort.patchValue(item.sort);
  this.addCategoriesForm.controls.metaTitle.patchValue(item.metaTitle);
  this.addCategoriesForm.controls.metaDescription.patchValue(item.metaDescription);
  this.addCategoriesForm.controls.metaKeyword.patchValue(item.metaKeyword);
  this.addCategoriesForm.controls.staticmetaTag.patchValue(item.staticmetaTag);
  this.addCategoriesForm.controls.description.patchValue(item.description);
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
this.countryValue=event.value;
}
}
