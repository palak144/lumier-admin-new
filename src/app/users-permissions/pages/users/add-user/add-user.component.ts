import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Subject } from 'rxjs';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UsersPermissionsService } from 'app/shared/services/users-permissions.service';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})

export class AddUserComponent implements OnInit {

  dropdownSettings = {};
  perGroup = [];
  dropdownList :any;
  addUserForm: FormGroup;
  editMode = false;
  isSubmittedAddUserForm: boolean = false;
  id: number;
  addUserFormDetails: any;
  users: any;
  userTitle: string;
  private _unsubscribe = new Subject<boolean>();
  selectedPerGroupId: any[];
  selected_perGroups:any
  password: any;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private usersPermissionsService: UsersPermissionsService,
    private toastr: ToastrService,


  ) { }

  ngOnInit(): void {
    debugger
    this.userTitle = "Add New User"

    this.activatedRoute.params.subscribe(
      (id: Params) => {
        this.id = +id['id']
        this.editMode = id['id'] != null
        console.log(this.editMode)
         debugger
        this.initForm()
      }
    )
    this.selected_perGroups = []

    this.usersPermissionsService.getPermissionGroupList()
.subscribe((success:any)=>{ 
  this.dropdownList = success.data.results})

    this.dropdownSettings = {
      singleSelection: false,
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      enableSearchFilter: true,
      classes: "myclass custom-class",
      position: "bottom",
      maxHeight: "50px"
    };

   
  }
  onItemSelect(event) {
  }

  multiSelectedList(criteriaArray: any) {
    
    this.selectedPerGroupId = [];
    if (criteriaArray != null) {
      criteriaArray.forEach(element => {
        
        this.selectedPerGroupId.push({
          "permissionGroupId" : element.id
        });
      });
    }
    return this.selectedPerGroupId;
  }
  get signUpControls() {
    return this.addUserForm.controls;
  }

  onSubmitUserForm() {
debugger
    this.isSubmittedAddUserForm = true
    if (this.addUserForm.invalid) {
      return
    }
    this.password = (this.addUserForm.get('password').value != "" && this.addUserForm.get('password').value != undefined) ? this.addUserForm.get('password').value : ""
debugger
    this.addUserFormDetails = {
      "employeeFullName": this.addUserForm.get('name').value,
      "employeeUserName": this.addUserForm.get('username').value,
      "employeePassword": this.password,
      "Employeepermission": this.multiSelectedList(this.addUserForm.get('perGroups').value)
    }
    if (this.id) {

      this.addUserFormDetails.employeeId = this.id;
    }
    if (this.editMode) {

      this.userTitle = "Edit User"
     
      this.usersPermissionsService.addUser(this.addUserFormDetails).subscribe(
        data => {
debugger
          this.toastr.success("Employee Editted Successfully")
          console.log(data)
          this.router.navigate(['/users-permissions/users'], { relativeTo: this.activatedRoute })
        },
        error => {
          this.toastr.error(error.message)

        });
    }
    else {


      this.usersPermissionsService.addUser(this.addUserFormDetails).subscribe(
        data => {

          console.log(data)
          this.toastr.success("Employee Added Successfully")
          this.router.navigate(['/user-permissions/users'], { relativeTo: this.activatedRoute })
        },
        error => {
          
          this.toastr.error(error.error.message)

        });
    }
  }


  private initForm() {
    debugger
    let name = "";
    let email = "";
    let password = "";
   this.selected_perGroups = [];
    this.addUserForm = new FormGroup({
      "name": new FormControl(name, Validators.required),
      "username": new FormControl(email, [
        Validators.required,
       ]),
    
      "perGroups": new FormControl(this.selected_perGroups, Validators.required),

    });
    debugger
    if (this.editMode) {
      debugger
      this.userTitle = "Edit User"
      this.addUserForm.addControl(
        "password", new FormControl(password, [
          Validators.minLength(8),
          Validators.pattern('^(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$'),
          Validators.maxLength(20)]))
      this.usersPermissionsService.getUserId(this.id).pipe(takeUntil(this._unsubscribe)).subscribe(
        (success: any) => {
        debugger
          this.users = success.data
          this.addUserForm.patchValue({
            "name": this.users.employeeFullName,
            "username": this.users.employeeUserName,
            // "password": this.users.employeePassword,
           // "perGroups" : this.users.PermissionGroup
          })
          this.selected_perGroups = this.users.PermissionGroup  
debugger
        },
        error => {

        }
      )

    }
    else{
      
      this.addUserForm.addControl(
        "password", new FormControl(password, [Validators.required,
          Validators.minLength(8),
          Validators.pattern('^(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$'),
          Validators.maxLength(20)]))
    }



  }
}
