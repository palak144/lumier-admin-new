import { Component, OnInit } from '@angular/core';
import { Validators, FormControl, FormBuilder, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CustomerService } from '../../../../shared/services/customer.service';
@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.scss']
})
export class AddCustomerComponent implements OnInit {
  addCustomerForm: FormGroup;
  titles: string[];
  editMode = false;
  isSubmittedaddCustomerForm : boolean = false;
  addCustomerFormDetails: any;

  constructor(
    
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private customerService : CustomerService
  ) { debugger}

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
      jobTitle: ['', ],
      assignGroup : ['', ],
      blockNo : ['', Validators.required],
      floorNo : ['', Validators.required],
      unitNo : ['', Validators.required],
      streetName : ['', Validators.required],
      BuildingName : ['', Validators.required],
      pincode : ['', Validators.required],
      phoneNo : ['', Validators.required],
      customerLogo: ['',],

    });

    this.titles = ['Mr.', 'Miss.', 'Mrs'];

  }

  get signUpControls() {
    return this.addCustomerForm.controls;
  }

  onSubmitAddCustomerForm(){
    debugger
    this.isSubmittedaddCustomerForm = true
    if (this.addCustomerForm.invalid) {
      return
    }
    this.addCustomerFormDetails = {
      "Email": this.addCustomerForm.get('email').value,
      "password": this.addCustomerForm.get('password').value,
      "firstName": this.addCustomerForm.get('fname').value,
      "lastName": this.addCustomerForm.get('lname').value,
      "title": this.addCustomerForm.get('title').value,
      "clinicName": this.addCustomerForm.get('clinicName').value,
      "countryCode": '+91',
      "image":this.addCustomerForm.get('customerLogo').value,
      "houseNo":this.addCustomerForm.get('blockNo').value,
      "floorNo":this.addCustomerForm.get('floorNo').value,
      "unitNo":this.addCustomerForm.get('unitNo').value,
      "streetName":this.addCustomerForm.get('streetName').value,
      "buildingName":this.addCustomerForm.get('buildingName').value,
      "website":this.addCustomerForm.get('web').value,
      "practiceType":'',
      "pincode":""    
    }
    this.customerService.addCustomer(this.addCustomerForm).subscribe(
      data => {
        debugger
       console.log(data)
      },
      error => {
        debugger
      });
  }
}
