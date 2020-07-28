import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UsersPermissionsService } from 'app/shared/services/users-permissions.service';
import { ToastrService } from 'ngx-toastr';
import { takeUntil } from 'rxjs/operators';
import * as _ from 'lodash'
import { CommonServiceService } from 'app/shared/services/common-service.service';
@Component({
  selector: 'app-add-permission',
  templateUrl: './add-permission.component.html',
  styleUrls: ['./add-permission.component.scss']
})

export class AddPermissionComponent implements OnInit {

  addPerGroupForm :FormGroup
  perGroupTitle : string
  isSubmittedAddPerGroupForm :boolean = false;
  dropdownSettings = {};
  dropdownSettingsPermission = {};
  countries = [];
  permission = []
  dropdownListCountry = [];
  dropdownListPer = [];
  editMode = false;
  id: number;
  addPerGroupFormDetails: any;
  permissionsData: any;
  private _unsubscribe = new Subject<boolean>();
  selectedPermissionId: any[];
  selectedCountryId: any[];
  selected_permission:any
  selected_countries:any

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private usersPermissionsService: UsersPermissionsService,
    private toastr: ToastrService,
    private commonService : CommonServiceService

  ) { }

  ngOnInit(): void {
    
    this.perGroupTitle = "Add New Permission Group"

    this.activatedRoute.params.subscribe(
      (id: Params) => {
        this.id = +id['id']
        this.editMode = id['id'] != null
        
        this.initForm()
      })

    this.commonService.getCountry()
    .subscribe((data:any) => {
      
        this.dropdownListCountry = data.data
    })

    this.usersPermissionsService.getMenuList()
    .subscribe((data:any) => {
      
         this.dropdownListPer =data.data.result
    })
    this.selected_permission = []
    this.selected_countries = []
    this.dropdownSettings = {
      singleSelection: false,
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      enableSearchFilter: true,
      classes: "myclass custom-class",
      position: "bottom",
      maxHeight: 250,
    };
    this.dropdownSettingsPermission = {
      singleSelection: false,
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      enableSearchFilter: true,
      classes: "myclass custom-class",
      position: "bottom",
      maxHeight: 150,
      groupBy: "menuName"
    };
  }
  onItemSelect(event) {
  }

  multiSelectedListCountry(criteriaArray: any) {
    
    this.selectedCountryId = [];
    if (criteriaArray != null) {
      criteriaArray.forEach(element => {
        this.selectedCountryId.push(element);

      });
    }
    
    return this.selectedCountryId;
  }
  multiSelectedListPermission(criteriaArray: any) {
    
    this.selectedPermissionId = []
    if (criteriaArray != null){
      this.selectedPermissionId = _.chain(criteriaArray)
      .groupBy("menuName")
      .map((value,key)=>
        ({menuName: key,childMenu:value})
      )
      .value();
      
  }
  
    return this.selectedPermissionId;
  }
  get signUpControls() {
    return this.addPerGroupForm.controls;
  }

  onSubmitPerGroupForm() {
    event.preventDefault();

    this.isSubmittedAddPerGroupForm = true
    if (this.addPerGroupForm.invalid) {
      return
    }
    this.addPerGroupFormDetails = {
      "groupName": this.addPerGroupForm.get('name').value,
      "countries": this.multiSelectedListCountry(this.addPerGroupForm.get('countries').value),
      "permission": this.multiSelectedListPermission(this.addPerGroupForm.get('permission').value),
      }
    
    if (this.id) {

      this.addPerGroupFormDetails.groupId = this.id;
    }
    if (this.editMode) {

      this.perGroupTitle = "Edit Permission Group"
      this.usersPermissionsService.addPermissionGroup(this.addPerGroupFormDetails).subscribe(
        data => {

          this.toastr.success("Permission Group Editted Successfully")
          this.router.navigate(['/user-permissions/user-permissions'], { relativeTo: this.activatedRoute })
        },
        error => {
          this.toastr.error(error.message)

        });
    }
    else {


      this.usersPermissionsService.addPermissionGroup(this.addPerGroupFormDetails).subscribe(
        data => {

          this.toastr.success("Permission Group Added Successfully")
          this.router.navigate(['/user-permissions/user-permissions'], { relativeTo: this.activatedRoute })
        },
        error => {
          this.toastr.error(error.message)

        });
    }
  }


  private initForm() {
    let name = "";
    let countries = "";
    let permission = "";

    this.addPerGroupForm = new FormGroup({
      "name": new FormControl(name, Validators.required),
      "countries": new FormControl(countries, Validators.required),
      "permission": new FormControl(permission, Validators.required),

    });
        if (this.editMode) {
      
      this.perGroupTitle = "Edit Permission Group"
      this.usersPermissionsService.getPerGroupId(this.id).pipe(takeUntil(this._unsubscribe)).subscribe(
        (success: any) => {
          
          this.permissionsData = success.data
          this.addPerGroupForm.patchValue({
            "name": this.permissionsData.groupName,
          })
         this.permissionsData.permission.forEach(element => {
            this.selected_permission.push(element.childMenu);

          });
          
          this.selected_permission = this.selected_permission[0]
          this.selected_countries = this.permissionsData.countries

        },
        error => {

        }
      )

    }
   



  }
}
