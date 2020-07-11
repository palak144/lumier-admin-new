import { Component, OnInit } from '@angular/core';
import { Validators, FormControl, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-add-new-category',
  templateUrl: './add-new-category.component.html',
  styleUrls: ['./add-new-category.component.scss']
})
export class AddNewCategoryComponent implements OnInit {

  categoryTitle:string;
  addCategoriesForm: FormGroup; 
  isSubmittedaddCategoriesForm: boolean = false;
  constructor() { }

  ngOnInit() {

    this.categoryTitle = "Add New Categories";
    this.initForm();
  }

  onSubmitCategoriesForm(event) {
    console.log(event,this.addCategoriesForm);
    event.preventDefault();
    this.isSubmittedaddCategoriesForm = true
    if (this.addCategoriesForm.invalid) {
      return
    }
  } 

  get signUpControls() {
    return this.addCategoriesForm.controls;
  }

  private initForm() {
    

    let fname = "";
    let countryId = "";
    let type = "";
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
     "type": new FormControl(type, Validators.required),
     "filterTitle": new FormControl(type, Validators.required),
     "filterDetail": new FormControl(type, Validators.required),
     "category": new FormControl(type, Validators.required),
     "sort": new FormControl(type, Validators.required),
     "metaTitle": new FormControl(type, Validators.required),
     "metaDescription": new FormControl(type, Validators.required),
     "metaKeyword": new FormControl(type, Validators.required),
     "staticmetaTag": new FormControl(type, Validators.required),
     "description": new FormControl(type, Validators.required),
  });
}
}
