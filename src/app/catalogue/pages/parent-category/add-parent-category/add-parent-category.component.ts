import { Component, OnInit } from '@angular/core';
import { Validators, FormControl, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-add-parent-category',
  templateUrl: './add-parent-category.component.html',
  styleUrls: ['./add-parent-category.component.scss']
})
export class AddParentCategoryComponent implements OnInit {

  parentcategoryTitle:string;
  addParentCategoriesForm: FormGroup; 
  isSubmittedParentCategoriesForm: boolean = false;
  constructor() { }

  ngOnInit() {

    this.parentcategoryTitle = "Add New Parent Categories";
    this.initForm();
  }

  onSubmitParentCategoriesForm(event) {
    console.log(event,this.addParentCategoriesForm);
    event.preventDefault();
    this.isSubmittedParentCategoriesForm = true
    if (this.addParentCategoriesForm.invalid) {
      return
    }
  } 

  get signUpControls() {
    return this.addParentCategoriesForm.controls;
  }

  private initForm() {
    

    let fname = "";
    let supplytype = "";

     
  
  this.addParentCategoriesForm = new FormGroup({
     "fname": new FormControl(fname, Validators.required),
     "supplytype": new FormControl(fname, Validators.required),

  });
}

}
