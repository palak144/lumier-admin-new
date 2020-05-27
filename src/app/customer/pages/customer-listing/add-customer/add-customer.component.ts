import { Component, OnInit } from '@angular/core';
import { Validators, FormControl, FormBuilder, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.scss']
})
export class AddCustomerComponent implements OnInit {
  addCustomerForm: FormGroup;
  titles: string[];
  isSubmittedaddCustomerForm : boolean = false;

  constructor(
    
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    
    this.addCustomerForm = this.formBuilder.group({
      email: new FormControl('', [
        Validators.required,
        Validators.pattern('^[A-Z0-9a-z._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,3}$')]),
        password: ['', [Validators.required,
          Validators.minLength(8),
          Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$'),
          Validators.maxLength(20)]],
          title: ['', Validators.required],
          fname: ['', Validators.required],
          lname: ['', Validators.required],
          clinicName: ['', Validators.required],
          contactNo: new FormControl('', [
            Validators.required,
            Validators.minLength(10),
            Validators.maxLength(15),
            Validators.pattern('^[0-9\+\-]*$')]),
            web: new FormControl('', [
              Validators.required,
              Validators.pattern('https?://w{3}[A-Za-z0-9.-]+\\.[A-Za-z]{2,3}$')]),
      orgName: ['', Validators.required],
      jobTitle: ['', Validators.required],
      assignGroup : ['', Validators.required],
      blockNo : ['', Validators.required],
      floorNo : ['', Validators.required],
      unitNo : ['', Validators.required],
      streetName : ['', Validators.required],
      BuildingName : ['', Validators.required],
      pincode : ['', Validators.required],
      phoneNo : ['', Validators.required],
      customerLogo: ['', Validators.required],
    });

    this.titles = ['Mr.', 'Miss.', 'Mrs'];

  }

  get signUpControls() {
    return this.addCustomerForm.controls;
  }

  onSubmitAddCustomerForm(){
    
    this.isSubmittedaddCustomerForm = true
    if (this.addCustomerForm.invalid) {
      return
    }
    
    console.log(this.addCustomerForm)
  }

}
