import { Component, OnInit} from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Subject} from 'rxjs';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { takeUntil } from 'rxjs/operators';
import { ManufactureService } from 'app/shared/services/manufacture.service';
import { CommonServiceService } from 'app/shared/services/common-service.service';
import { CategoriesService } from 'app/shared/services/categories.service';
import { CategoryService } from '../../../../shared/services/catalogue/category.service';
interface Country {
  _id:string,
  country:string
}
interface Category {
  _id:string,
  country:string
}
interface CategoryList {
  _id:string,
  country:string
}

@Component({
  selector: 'app-add-new-category',
  templateUrl: './add-new-category.component.html',
  styleUrls: ['./add-new-category.component.scss']
})
export class AddNewCategoryComponent implements OnInit {
  private _unsubscribe = new Subject<boolean>();

  categoryTitle:string;
  addCategoriesForm: FormGroup; 
  isSubmittedaddCategoriesForm: boolean = false;
  file: any;
  imageUrl: any;
  companyFlagSize: boolean = false;
  projectFlagSize: boolean = false;
  compLogofiletype: any;
  companyLogo: any;
  orgLogoData: any;
  dLogo: string;
  selectedFile: any;
 countries:Country[];
  url: any;
  base64result: string;
  filenew: any;
  urlnew: string | ArrayBuffer;
  parentcategory: Category[];
  category: CategoryList[];
  categoryData: any;
  id: number;
  editMode: boolean;
  addCategoryFormDetails: any;
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private manufactureService: ManufactureService,
    private commonService: CommonServiceService,
    private toastr: ToastrService,
    private categoryService:CategoryService,
    private categoriesService: CategoriesService
  ) { }



  ngOnInit(): void {
    this.activatedRoute.params.subscribe(
      (id: Params) => {
        this.id = +id['id']
        this.editMode = id['id'] != null;
        console.log(this.editMode);
        console.log(this.id);
        if(!this.id)
        {
          this.categoryTitle = "Add New Category";
        }
        if(this.id)
        {
          this.categoryTitle = "Edit New Category";
          this.getCategoryDetails(this.id);
        }
      }
      )
   
    this.initForm();
    this.getCountry();
    this.getparentCategory();
    this.getCategory();
  }

  onSubmitCategoriesForm(event) {
    event.preventDefault();
    this.isSubmittedaddCategoriesForm = true
    if (this.addCategoriesForm.invalid) {
      return
    }


    this.addCategoryFormDetails = {
      "categoryName": this.addCategoriesForm.get('fname').value,
      
      "countries": this.addCategoriesForm.get('countryId').value,
      "parentCategoryId": this.addCategoriesForm.get('parentCategory').value,
      "filtersTitle": this.addCategoriesForm.get('filterTitle').value,
      "filtersDetail": this.addCategoriesForm.get('filterDetail').value,
      "categoryId": this.addCategoriesForm.get('category').value,
      "sort": this.addCategoriesForm.get('sort').value,
      "metaTitle": this.addCategoriesForm.get('metaTitle').value,
      "metaDescription": this.addCategoriesForm.get('metaDescription').value,
      "metaKeyword": this.addCategoriesForm.get('metaKeyword').value,
      "isStaticMetaTag": this.addCategoriesForm.get('staticmetaTag').value,
      "description": this.addCategoriesForm.get('description').value,

    }
   if(this.id)
    {
     this.addCategoryFormDetails.id=this.id;
    }
    console.log(this.addCategoryFormDetails);
    if(!this.id)
    {
    this.categoryService.addcategory(this.addCategoryFormDetails).pipe(takeUntil(this._unsubscribe)).subscribe(
      (success:any) => {
     
        this.toastr.success('Category  Create Successfully!');
        this.router.navigate(['/catalogues/categories']);

      },
      error => {
        this.toastr.error('error',error);
      }
    )
    }
    if(this.id)
    {
      console.log("update");
      this.categoryService.updatecategory(this.addCategoryFormDetails).pipe(takeUntil(this._unsubscribe)).subscribe(
        (success:any) => {
       console.log(success);
          this.toastr.success('Category  Update  Successfully!');
          this.router.navigate(['/catalogues/categories']);
  
        },
        error => {
          this.toastr.error('error',error);
        }
      )
    }
    
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
    let file = "";
    let filenew = "";

  
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
  this.addCategoriesForm.addControl(
    "file", new FormControl( file,),
    
  );
  this.addCategoriesForm.addControl(
    "filenew", new FormControl( filenew,),
    
  );
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
  getparentCategory()
  {
    this.commonService.getparentCategory().pipe(takeUntil(this._unsubscribe)).subscribe(
      (success:any) => {
        this.parentcategory = this.arrayOfStringsToArrayOfObjects(success.data.result);
      },
      error => {
      }
    )
  }
  getCategory()
  {
    this.commonService.getCategory().pipe(takeUntil(this._unsubscribe)).subscribe(
      (success:any) => {
        this.category = this.arrayOfStringsToArrayOfObjects(success.data);
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



fileChangeEvent(fileInput : any){
  
  this.file = fileInput.target.files[0];
  var last = this.file.name.substring(this.file.name.lastIndexOf(".") + 1, this.file.name.length); 
  if(this.file.type == "image/jpeg" || this.file.type == "image/jpg" || this.file.type == "image/png")
  if (this.file.size < 200000) {
  {
    this.companyFlagSize = true;
    this.compLogofiletype = last;
     let reader = new FileReader();
     
      reader.readAsDataURL(this.file);
      
      reader.onload = (event) => {
         this.url = reader.result;
        this.companyLogo = this.url;
        
        document.getElementById('sizeValidations').style.color = 'black';

      }
      
      this.addCategoriesForm.controls['file'].setValue(this.file ? this.file : '');
      this.file = this.file.name;
      
    }
  }
    else {
      this.companyFlagSize = false;
      
      document.getElementById('sizeValidations').style.color = '#ffae42';
      this.addCategoriesForm.controls['file'].setValue(this.file ? '' : '');
    }
}
fileChangeEventnew(fileInput : any){
  
  this.filenew = fileInput.target.files[0];
  var last = this.filenew.name.substring(this.filenew.name.lastIndexOf(".") + 1, this.filenew.name.length); 
  if(this.filenew.type == "image/jpeg" || this.filenew.type == "image/jpg" || this.filenew.type == "image/png")
  if (this.filenew.size < 200000) {
  {
    this.companyFlagSize = true;
    this.compLogofiletype = last;
     let reader = new FileReader();
     
      reader.readAsDataURL(this.filenew);
      
      reader.onload = (event) => {
         this.urlnew = reader.result;
        this.companyLogo = this.urlnew;
        
        document.getElementById('sizeValidations').style.color = 'black';

      }
      
      this.addCategoriesForm.controls['filenew'].setValue(this.filenew ? this.filenew : '');
      this.filenew = this.filenew.name;
      
    }
  }
    else {
      this.companyFlagSize = false;
      
      document.getElementById('sizeValidations').style.color = '#ffae42';
      this.addCategoriesForm.controls['filenew'].setValue(this.filenew ? '' : '');
    }
}
editorValidation(event)
{
}
getCategoryDetails(id) {
  this.categoryService.getCategoryDetails(id).pipe(takeUntil(this._unsubscribe)).subscribe(
    (success:any) => {
      console.log(success);
      this.categoryData = success.data;
      this.patchForm(this.categoryData);
    },
    error => {
    }
  )
}
patchForm(item)
{
  console.log(item);

  this.addCategoriesForm.controls.fname.patchValue(item.categoryName);  
  this.addCategoriesForm.controls.countryId.patchValue(item.countries);
  this.addCategoriesForm.controls.parentCategory.patchValue(item.parentCategoryId);
  this.addCategoriesForm.controls.filterTitle.patchValue(item.filtersTitle);
  this.addCategoriesForm.controls.filterDetail.patchValue(item.filtersDetail);
  this.addCategoriesForm.controls.category.patchValue(item.categoryId);
  this.addCategoriesForm.controls.sort.patchValue(item.sort);
  this.addCategoriesForm.controls.metaTitle.patchValue(item.metaTitle);
  this.addCategoriesForm.controls.metaDescription.patchValue(item.metaDescription);
  this.addCategoriesForm.controls.metaKeyword.patchValue(item.metaKeyword);
  this.addCategoriesForm.controls.staticmetaTag.patchValue(item.isStaticMetaTag);
  this.addCategoriesForm.controls.description.patchValue(item.description);


  // this.addCategoriesForm.controls.supplyTypeId.patchValue(item.supplyTypeId);
  // this.addCategoriesForm.controls.countries.patchValue(item.countries);
  // this.addCategoriesForm.controls.languages.patchValue(item.languages);

}
}
