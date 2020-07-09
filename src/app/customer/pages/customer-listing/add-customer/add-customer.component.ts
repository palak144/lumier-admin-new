import { Component, OnInit } from '@angular/core';
import { Validators, FormControl, FormBuilder, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { CustomerService } from '../../../../shared/services/customer.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { UtilityService } from '../../../../shared/utility/utility.service';

@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.scss']
})

export class AddCustomerComponent implements OnInit {
  addCustomerForm: FormGroup;
  titles: string[];
  editMode = false;
  id: number;
  isSubmittedaddCustomerForm: boolean = false;
  addCustomerFormDetails: any;
  customer: any;
  private _unsubscribe = new Subject<boolean>();
  assignGroupList: any[] = [];
  customerTitle: string;
  password: any;
  practises: string[];
  selected_assignGroup : any 
  constructor(

    private activatedRoute: ActivatedRoute,
    private router: Router,
    private customerService: CustomerService,
    private toastr: ToastrService,
    private utilityService:UtilityService

  ) { }

  ngOnInit(): void { 

    this.customerTitle = "Add New Customers";
    this.activatedRoute.params.subscribe(
      (id: Params) => {
        this.id = +id['id']
        this.editMode = id['id'] != null
        this.initForm()
      }
    )
    
    this.customerService.getAssignGroup().subscribe((res: any) => {
      
      res.data.results.forEach(item => {
        
        this.assignGroupList.push({
          
          label: item.groupName,
          value: item.id
        })
      });

    }); 
    this.selected_assignGroup = [];
  }

  get signUpControls() {
    return this.addCustomerForm.controls;
  }

  onSubmitAddCustomerForm( event: Event) {
    
    event.preventDefault();
    this.isSubmittedaddCustomerForm = true
    if (this.addCustomerForm.invalid) {
      return
    }
    this.password = (this.addCustomerForm.get('password').value != "" && this.addCustomerForm.get('password').value != undefined) ? this.addCustomerForm.get('password').value : ""
    
    this.addCustomerFormDetails = {
      "Email": this.addCustomerForm.get('email').value,
      "password": this.password,
      "firstName": this.addCustomerForm.get('fname').value,
      "lastName": this.addCustomerForm.get('lname').value,
      "title": this.addCustomerForm.get('title').value,
      "clinicName": this.addCustomerForm.get('clinicName').value,
      "countryCode": '+91',
      "houseNo": this.addCustomerForm.get('blockNo').value,
      "floorNo": this.addCustomerForm.get('floorNo').value,
      "unitNo": this.addCustomerForm.get('unitNo').value,
      "streetName": this.addCustomerForm.get('streetName').value,
      "buildingName": this.addCustomerForm.get('buildingName').value,
      "practiceType": this.addCustomerForm.get('practiceType').value,
      "website": this.addCustomerForm.get('web').value,
      "pincode": this.addCustomerForm.get('pincode').value,
      "teleNumber": this.addCustomerForm.get('phoneNo').value,
      "mobileNumber": this.addCustomerForm.get('contactNo').value,
      "jobTitle": this.addCustomerForm.get('jobTitle').value,
      "customerGroupId" : this.addCustomerForm.get('assignGroup').value,
    }
    
    if (this.id) {

      this.addCustomerFormDetails.customerId = this.id;
    }
    if (this.editMode) {
      this.customerTitle = "Edit Customer";
      
      this.customerService.updateCustomer(this.addCustomerFormDetails).subscribe(
        data => {
          
          this.toastr.success("Customer Details Editted Successfully")
          this.router.navigate(['../../'],{relativeTo : this.activatedRoute})

        },
        error => {
          
          this.toastr.error(error.message)
        });



    }
    else {
      
      this.customerService.addCustomer(this.addCustomerFormDetails).subscribe(
        data => {
          
          this.toastr.success("New Customer Added Successfully")
          this.router.navigate(['../'],{relativeTo : this.activatedRoute})
        },
        error => {

          this.toastr.error(error.message)
          
        });
    }

  }


  private initForm() {
    
    let email = "";
    let password = "";
    let title = "";
    let fname = "";
    let lname = "";
    let clinicName = "";
    let contactNo = "";
    let web = "";
    let practiceType = "";
    let assignGroup = "";
    let blockNo = "";
    let floorNo = "";
    let unitNo = "";
    let streetName = "";
    let buildingName = "";
    let pincode = "";
    let phoneNo = "";
    let jobTitle = "";
    
    this.addCustomerForm = new FormGroup({
      "email": new FormControl(email, [
        Validators.required,
        Validators.pattern('^[A-Z0-9a-z._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,3}$')]),
      "title": new FormControl(title, Validators.required),
      "fname": new FormControl(fname, Validators.required),
      "lname": new FormControl(lname, Validators.required),
      "clinicName": new FormControl(clinicName, Validators.required),
      "contactNo": new FormControl(contactNo,[
        Validators.required,
        Validators.pattern('^[0-9]{5,15}$')]),
      "web": new FormControl(web, [
        Validators.pattern('https?://w{3}[A-Za-z0-9.-]+\\.[A-Za-z]{2,3}$')]),
      "jobTitle": new FormControl(jobTitle, ),
      "practiceType": new FormControl(practiceType, Validators.required),
      "assignGroup": new FormControl(assignGroup,),
      "blockNo": new FormControl(blockNo, ),
      "floorNo": new FormControl(floorNo, ),
      "unitNo": new FormControl(unitNo,),
      "streetName": new FormControl(streetName,),
      "buildingName": new FormControl(buildingName,),
      "pincode": new FormControl(pincode, [
        Validators.pattern('^[0-9\+\-]{6}$')]),
      "phoneNo": new FormControl(phoneNo,[ ,
        Validators.pattern('^[0-9]{5,15}$')]),
    });
    

    this.titles = ['Mr.', 'Miss.', 'Mrs'];
    this.practises = ['Medical', 'Dental', 'Other'];


    if (this.editMode) {
      
      this.customerTitle = "Edit Customer";
      this.addCustomerForm.addControl(
      "password", new FormControl(password, [
        Validators.minLength(8),
        Validators.pattern('^(?=.*?[a-z])(?=.*?[#?!@$%^&*-]).{8,}$'),
        Validators.maxLength(20)]))
      this.customerService.getCustomerId(this.id).pipe(takeUntil(this._unsubscribe)).subscribe(
        (success: any) => {
          
          this.customer = success.data
          this.addCustomerForm.patchValue({
            "email": this.customer.Email,
            "password": this.customer.password,
            "title": this.customer.title,
            "fname": this.customer.firstName,
            "lname": this.customer.lastName,
            "clinicName": this.customer.clinicName,
            "contactNo": this.customer.mobileNumber,
            "web": this.customer.website,
            "practiceType": this.customer.practiceType,
            "blockNo": this.customer.houseNo,
            "floorNo": this.customer.floorNo,
            "unitNo": this.customer.unitNo,
            "streetName": this.customer.streetName,
            "buildingName": this.customer.buildingName,
            "pincode": this.customer.pincode,
            "phoneNo": this.customer.teleNumber,
            "jobTitle": this.customer.jobTitle,
          })
          
            this.selected_assignGroup = this.customer.customerGroup.id 
               
        },
        error => {
          
        }
      )
    }
    else{
      
      this.addCustomerForm.addControl(
        "password", new FormControl(password, [Validators.required,
          Validators.minLength(8),
          Validators.pattern('^(?=.*?[a-z])(?=.*?[#?!@$%^&*-]).{8,}$'),
          Validators.maxLength(20)]))
    }
    

  }
}
