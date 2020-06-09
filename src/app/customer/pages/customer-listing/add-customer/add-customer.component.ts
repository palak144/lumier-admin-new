import { Component, OnInit } from '@angular/core';
import { Validators, FormControl, FormBuilder, FormGroup } from '@angular/forms';
<<<<<<< HEAD
import { Router, ActivatedRoute, Params } from '@angular/router';
import { CustomerService } from '../../../../shared/services/customer.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

=======
import { Router, ActivatedRoute } from '@angular/router';
import { CustomerService } from '../../../../shared/services/customer.service';
>>>>>>> ab00378f10aef9276383d015d4e0445f6789afbc
@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.scss']
})
<<<<<<< HEAD

=======
>>>>>>> ab00378f10aef9276383d015d4e0445f6789afbc
export class AddCustomerComponent implements OnInit {
  addCustomerForm: FormGroup;
  titles: string[];
  editMode = false;
<<<<<<< HEAD
  id: number;
  isSubmittedaddCustomerForm: boolean = false;
  addCustomerFormDetails: any;
  customer: any;
  private _unsubscribe = new Subject<boolean>();
  assignGroupList: any;
  customerTitle: string;
selectedAssignGroup: any;
  constructor(

    private activatedRoute: ActivatedRoute,
    private router: Router,
    private customerService: CustomerService,
    private toastr: ToastrService,

  ) { }

  ngOnInit(): void {
    this.customerTitle = "Add New Customers";
    this.activatedRoute.params.subscribe(
      (id: Params) => {
        this.id = +id['id']
        this.editMode = id['id'] != null
        console.log(this.editMode)
        this.initForm()
        
      }
    )
    
    this.customerService.getAssignGroup().subscribe((res: any) => {
      
      this.assignGroupList = res.data.results;
    });
    this.selectedAssignGroup = [];
=======
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

>>>>>>> ab00378f10aef9276383d015d4e0445f6789afbc
  }

  get signUpControls() {
    return this.addCustomerForm.controls;
  }

<<<<<<< HEAD
  onSubmitAddCustomerForm() {
=======
  onSubmitAddCustomerForm(){
    debugger
>>>>>>> ab00378f10aef9276383d015d4e0445f6789afbc
    this.isSubmittedaddCustomerForm = true
    if (this.addCustomerForm.invalid) {
      return
    }
<<<<<<< HEAD
    
=======
>>>>>>> ab00378f10aef9276383d015d4e0445f6789afbc
    this.addCustomerFormDetails = {
      "Email": this.addCustomerForm.get('email').value,
      "password": this.addCustomerForm.get('password').value,
      "firstName": this.addCustomerForm.get('fname').value,
      "lastName": this.addCustomerForm.get('lname').value,
      "title": this.addCustomerForm.get('title').value,
      "clinicName": this.addCustomerForm.get('clinicName').value,
      "countryCode": '+91',
<<<<<<< HEAD
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
      "customerGroupId" : this.addCustomerForm.get('assignGroup').value
    }
    
    if (this.id) {

      this.addCustomerFormDetails.customerId = this.id;
    }
    if (this.editMode) {
      this.customerTitle = "Edit Customer";
      
      this.customerService.updateCustomer(this.addCustomerFormDetails).subscribe(
        data => {
          
          console.log(data)
          this.toastr.success("Customer Details Editted Successfully")
          this.router.navigate(['../'],{relativeTo : this.activatedRoute})

        },
        error => {
          
          this.toastr.error(error.message)
        });



    }
    else {
      
      this.customerService.addCustomer(this.addCustomerFormDetails).subscribe(
        data => {
          
          console.log(data)
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

    if (this.editMode) {
      this.customerTitle = "Edit Customer";
      
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
          
          this.selectedAssignGroup = this.customer.customerGroup.id
          
        },
        error => {
          
        }
      )
    }
    
    console.log("email 2", email)
    this.addCustomerForm = new FormGroup({
      "email": new FormControl(email, [
        Validators.required,
        Validators.pattern('^[A-Z0-9a-z._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,3}$')]),
      "password": new FormControl(password, [Validators.required,
      Validators.minLength(8),
      Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$'),
      Validators.maxLength(20)]),
      "title": new FormControl(title, Validators.required),
      "fname": new FormControl(fname, Validators.required),
      "lname": new FormControl(lname, Validators.required),
      "clinicName": new FormControl(clinicName, Validators.required),
      "contactNo": new FormControl(contactNo, [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(15),
        Validators.pattern('^[0-9\+\-]*$')]),
      "web": new FormControl(web, [
        Validators.required,
        Validators.pattern('https?://w{3}[A-Za-z0-9.-]+\\.[A-Za-z]{2,3}$')]),
      "jobTitle": new FormControl(jobTitle, Validators.required),
      "practiceType": new FormControl(practiceType, Validators.required),
      "assignGroup": new FormControl(assignGroup, Validators.required),
      "blockNo": new FormControl(blockNo, Validators.required),
      "floorNo": new FormControl(floorNo, Validators.required),
      "unitNo": new FormControl(unitNo, Validators.required),
      "streetName": new FormControl(streetName, Validators.required),
      "buildingName": new FormControl(buildingName, Validators.required),
      "pincode": new FormControl(pincode, Validators.required),
      "phoneNo": new FormControl(phoneNo, Validators.required),
    });
    
    console.log("email 3", this.addCustomerForm)

    this.titles = ['Mr.', 'Miss.', 'Mrs'];



=======
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
>>>>>>> ab00378f10aef9276383d015d4e0445f6789afbc
  }
}
