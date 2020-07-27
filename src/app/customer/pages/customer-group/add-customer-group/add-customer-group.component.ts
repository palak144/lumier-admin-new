import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute , Params, Router} from '@angular/router';
import { CustomerService } from 'app/shared/services/customer.service';
import { Subject} from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-customer-group',
  templateUrl: './add-customer-group.component.html',
  styleUrls: ['./add-customer-group.component.scss']
})
export class AddCustomerGroupComponent implements OnInit {

  addCustomerGroupForm: FormGroup;
  editMode = false;
  isSubmittedaddCustomerGroupForm: boolean = false;
  id: number;
  addCustomerGroupFormDetails: any;
  customerGroup: any;
  customerGroupTitle: string;
  private _unsubscribe = new Subject<boolean>();

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private customerService: CustomerService,
    private toastr: ToastrService,


  ) { }

  ngOnInit(): void {
    this.customerGroupTitle = "Add New Customer Group"

    this.activatedRoute.params.subscribe(
      (id: Params) => {
        this.id = +id['id']
        this.editMode = id['id'] != null
        
        this.initForm()
      }
    )
    

  }

  get signUpControls() {
    return this.addCustomerGroupForm.controls;
  }

  onSubmitAddCustomerGroupForm() {
    event.preventDefault();

    this.isSubmittedaddCustomerGroupForm = true
    if (this.addCustomerGroupForm.invalid) {
      return
    }
    this.addCustomerGroupFormDetails = {
      "groupName": this.addCustomerGroupForm.get('name').value,
      "groupEmail":this.addCustomerGroupForm.get('email').value,
      
    }
    if (this.id ) {

      this.addCustomerGroupFormDetails.id = this.id;
    }
    if (this.editMode) {
      
      this.customerGroupTitle = "Edit Customer Group"
      this.customerService.addCustomerGroup(this.addCustomerGroupFormDetails).subscribe(
        data => {

this.toastr.success("Customer Group Editted Successfully")
          this.router.navigate(['/customer/customer-groups'],{relativeTo : this.activatedRoute})
        },
        error => {
          this.toastr.error(error.message)

        });



    }
    else{
    
    
    this.customerService.addCustomerGroup(this.addCustomerGroupFormDetails).subscribe(
      data => {
        this.toastr.success("Customer Group Added Successfully")
        this.router.navigate(['/customer/customer-groups'],{relativeTo : this.activatedRoute})
      },
      error => {
        this.toastr.error(error.message)

      });
    }
  }


  private initForm(){
    let email = "";
    let name = "";

    if(this.editMode){
      this.customerGroupTitle = "Edit Customer Group"
      this.customerService.getCustomerGroupId(this.id).pipe(takeUntil(this._unsubscribe)).subscribe(
        (success:any)=>{
          
          this.customerGroup=success.data
          this.addCustomerGroupForm.patchValue({
            "email" : this.customerGroup.groupEmail,
            "name" : this.customerGroup.groupName,

        })
      },
        error=>{
          
        }
      )

      }
    this.addCustomerGroupForm = new FormGroup({
      "email": new FormControl(email, [
        Validators.required,
        Validators.pattern('^[A-Z0-9a-z._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,3}$')]),
      "name": new FormControl( name, Validators.required),
    });



}
}
