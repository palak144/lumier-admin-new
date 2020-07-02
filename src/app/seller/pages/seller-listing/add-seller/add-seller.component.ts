import { Component, OnInit } from '@angular/core';
import { Validators, FormControl, FormBuilder, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { SellerService } from '../../../../shared/services/seller.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { UtilityService } from '../../../../shared/utility/utility.service';

@Component({
  selector: 'app-add-seller',
  templateUrl: './add-seller.component.html',
  styleUrls: ['./add-seller.component.scss']
})
export class AddSellerComponent implements OnInit {
  addCustomerForm: FormGroup;
  titles: string[];
  editMode = false;
  id: number;
  isSubmittedaddSellerForm: boolean = false;
  addSellerFormDetails: any;
  seller: any;
  private _unsubscribe = new Subject<boolean>();
  assignGroupList: any[] = [];
  sellerTitle:string;
  selectedAssignGroup: any;
  password: any;

  

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private SellerService: SellerService,
    private toastr: ToastrService,
    private utilityService:UtilityService
  ) { }

  ngOnInit(): void {
    this.sellerTitle = "Add New Sellers";
    this.activatedRoute.params.subscribe(
      (id: Params) => {
        this.id = +id['id']
        this.editMode = id['id'] != null
        console.log(this.editMode)
        // this.initForm()
      }
    )
  }

  onSubmitAddCustomerForm() {
    this.isSubmittedaddSellerForm = true
    if (this.addCustomerForm.invalid) {
      return
    }
    this.password = (this.addCustomerForm.get('password').value != "" && this.addCustomerForm.get('password').value != undefined) ? this.addCustomerForm.get('password').value : ""
    
    this.addSellerFormDetails = {
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
      "customerGroupId" : this.addCustomerForm.get('assignGroup').value
    }
    
    if (this.id) {

      this.addSellerFormDetails.sellerId = this.id;
    }

    // if (this.editMode) {
    //   this.sellerTitle = "Edit Customer";
      
    //   this.SellerService.updateSeller(this.addSellerFormDetails).subscribe(
    //     data => {
          
    //       console.log(data)
    //       this.toastr.success("Seller Details Editted Successfully")
    //       this.router.navigate(['../../'],{relativeTo : this.activatedRoute})

    //     },
    //     error => {
          
    //       this.toastr.error(error.message)
    //     });



    // }
    // else {
      
    //   this.customerService.addCustomer(this.addCustomerFormDetails).subscribe(
    //     data => {
          
    //       console.log(data)
    //       this.toastr.success("New Customer Added Successfully")
    //       this.router.navigate(['../'],{relativeTo : this.activatedRoute})
    //     },
    //     error => {
    //       this.toastr.error(error.message)
          
    //     });
    // }

  }

  // private initForm() {
    
  //   let email = "";
  //   let password = "";
  //   let title = "";
  //   let fname = "";
  //   let lname = "";
  //   let clinicName = "";
  //   let contactNo = "";
  //   let web = "";
  //   let practiceType = "";
  //   let assignGroup = "";
  //   let blockNo = "";
  //   let floorNo = "";
  //   let unitNo = "";
  //   let streetName = "";
  //   let buildingName = "";
  //   let pincode = "";
  //   let phoneNo = "";
  //   let jobTitle = "";
    
  //   this.addSellerForm = new FormGroup({
  //     "email": new FormControl(email, [
  //       Validators.required,
  //       Validators.pattern('^[A-Z0-9a-z._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,3}$')]),
  //     "title": new FormControl(title, Validators.required),
  //     "fname": new FormControl(fname, Validators.required),
  //     "lname": new FormControl(lname, Validators.required),
  //     "clinicName": new FormControl(clinicName, Validators.required),
  //     "contactNo": new FormControl(contactNo, [
  //       Validators.required,
  //       Validators.pattern('^[0-9\+\-]{10}$')]),
  //     "web": new FormControl(web, [
  //       Validators.pattern('https?://w{3}[A-Za-z0-9.-]+\\.[A-Za-z]{2,3}$')]),
  //     "jobTitle": new FormControl(jobTitle, ),
  //     "practiceType": new FormControl(practiceType, Validators.required),
  //     "assignGroup": new FormControl(assignGroup,),
  //     "blockNo": new FormControl(blockNo, ),
  //     "floorNo": new FormControl(floorNo, ),
  //     "unitNo": new FormControl(unitNo,),
  //     "streetName": new FormControl(streetName,),
  //     "buildingName": new FormControl(buildingName,),
  //     "pincode": new FormControl(pincode, [
  //       Validators.pattern('^[0-9\+\-]{6}$')]),
  //     "phoneNo": new FormControl(phoneNo,[ ,
  //       Validators.pattern('^[0-9\+\-]{10,15}$')]),
  //   });
    
  //   console.log("email 3", this.addCustomerForm)

  //   this.titles = ['Mr.', 'Miss.', 'Mrs'];


    // if (this.editMode) {
      
    //   this.sellerTitle = "Edit Seller";
    //   this.addSellerForm.addControl(
    //   "password", new FormControl(password, [
    //     Validators.minLength(8),
    //     Validators.pattern('^(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$'),
    //     Validators.maxLength(20)]))
    //   this.sellerService.getCustomerId(this.id).pipe(takeUntil(this._unsubscribe)).subscribe(
    //     (success: any) => {
          
    //       this.seller = success.data
    //       this.addCustomerForm.patchValue({
    //         "email": this.seller.Email,
    //         "password": this.seller.password,
    //         "title": this.seller.title,
    //         "fname": this.seller.firstName,
    //         "lname": this.seller.lastName,
    //         "clinicName": this.seller.clinicName,
    //         "contactNo": this.seller.mobileNumber,
    //         "web": this.customer.website,
    //         "practiceType": this.customer.practiceType,
    //         "blockNo": this.customer.houseNo,
    //         "floorNo": this.customer.floorNo,
    //         "unitNo": this.customer.unitNo,
    //         "streetName": this.customer.streetName,
    //         "buildingName": this.customer.buildingName,
    //         "pincode": this.customer.pincode,
    //         "phoneNo": this.customer.teleNumber,
    //         "jobTitle": this.customer.jobTitle,
    //       })
          
    //       this.selectedAssignGroup = this.customer.customerGroup.id
          
    //     },
    //     error => {
          
    //     }
    //   )
    // }
    // else{
      
    //   this.addCustomerForm.addControl(
    //     "password", new FormControl(password, [Validators.required,
    //       Validators.minLength(8),
    //       Validators.pattern('^(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$'),
    //       Validators.maxLength(20)]))
    // }
    // console.log("email 2", email)
    

  }
