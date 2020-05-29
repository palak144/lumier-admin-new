import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-customer-group',
  templateUrl: './add-customer-group.component.html',
  styleUrls: ['./add-customer-group.component.scss']
})
export class AddCustomerGroupComponent implements OnInit {

  addCustomerGroupForm: FormGroup;
  editMode = false;
  isSubmittedaddCustomerForm : boolean = false;

  constructor(
    
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    
    this.addCustomerGroupForm = this.formBuilder.group({
      email: new FormControl('', [
        Validators.required,
        Validators.pattern('^[A-Z0-9a-z._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,3}$')]),
        name:['', Validators.required],
    });

  }

  get signUpControls() {
    return this.addCustomerGroupForm.controls;
  }

  onSubmitAddCustomerGroupForm(){
    debugger
    this.isSubmittedaddCustomerForm = true
    if (this.addCustomerGroupForm.invalid) {
      return
    }
    
    console.log(this.addCustomerGroupForm)
  }
}
