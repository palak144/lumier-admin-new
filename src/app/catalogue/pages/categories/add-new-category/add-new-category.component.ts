import { Component, OnInit} from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Subject} from 'rxjs';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { takeUntil } from 'rxjs/operators';
import { ManufactureService } from 'app/shared/services/manufacture.service';
import { CommonServiceService } from 'app/shared/services/common-service.service';
import { CategoriesService } from 'app/shared/services/categories.service';

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
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private manufactureService: ManufactureService,
    private commonService: CommonServiceService,
    private toastr: ToastrService,
    private categoriesService: CategoriesService
  ) { }



  ngOnInit(): void {

    this.categoryTitle = "Add New Categories";
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
    let data=this.addCategoriesForm.value;
    console.log(data);
      
    this.manufactureService.addcategory(data).pipe(takeUntil(this._unsubscribe)).subscribe(
      (success:any) => {
     
        this.toastr.success('Category  Create Successfully!');
        this.router.navigate(['/catalogues/categories']);

      },
      error => {
        this.toastr.error('error',error);
      }
    )
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
        console.log(success);
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
        console.log(success);
        this.parentcategory = this.arrayOfStringsToArrayOfObjects(success.data.result);
        console.log(this.parentcategory);
      },
      error => {
      }
    )
  }
  getCategory()
  {
    this.commonService.getCategory().pipe(takeUntil(this._unsubscribe)).subscribe(
      (success:any) => {
        console.log(success);
        this.category = this.arrayOfStringsToArrayOfObjects(success.data);
        console.log(this.category);
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
  console.log(this.file);
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
         console.log(this.url);
        this.companyLogo = this.url;
        
        document.getElementById('sizeValidations').style.color = 'black';

      }
      
      this.addCategoriesForm.controls['file'].setValue(this.file ? this.file : '');
      this.file = this.file.name;
      console.log(this.file);
      
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
  console.log(this.filenew);
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
         console.log(this.urlnew);
        this.companyLogo = this.urlnew;
        
        document.getElementById('sizeValidations').style.color = 'black';

      }
      
      this.addCategoriesForm.controls['filenew'].setValue(this.filenew ? this.filenew : '');
      this.filenew = this.filenew.name;
      console.log(this.filenew);
      
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
console.log(event);
}
}
