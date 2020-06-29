import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UsersPermissionsService } from 'app/shared/services/users-permissions.service';
import { ToastrService } from 'ngx-toastr';
import { takeUntil } from 'rxjs/operators';

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
  country = [];
  permission = []
  dropdownListCountry : any;
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


  ) { }

  ngOnInit(): void {
    
    this.perGroupTitle = "Add New Permission Group"

    this.activatedRoute.params.subscribe(
      (id: Params) => {
        this.id = +id['id']
        this.editMode = id['id'] != null
        console.log(this.editMode)
        debugger
        this.initForm()
      })

    this.usersPermissionsService.getCountryList()
    .subscribe((data:any) => {
      
        this.dropdownListCountry = data.data
    })

    this.usersPermissionsService.getMenuList()
    .subscribe((data:any) => {
      debugger
         this.dropdownListPer =data.data.result
        // this.dropdownListPer =  [

        //   { "id": 1, "itemName": "Customers", "menuName":"customer" ,"menuId":"11"},
        //   { "id": 2, "itemName": "Customer-Group", "menuName":"customer1","menuId":"12" },
        //   { "id": 3, "itemName": "Permissions","menuName":"customer1" ,"menuId":"12"},
        //   { "id": 4, "itemName": "Employees", "menuName":"customer","menuId":"11" },
        //   { "id": 4, "itemName": "Employees", "menuName":null,"menuId":null },
        //   { "id": 1, "itemName": "Customers", "menuName":"customer" ,"menuId":"11"},
        //   { "id": 2, "itemName": "Customer-Group", "menuName":"customer1","menuId":"12" },
        //   { "id": 3, "itemName": "Permissions","menuName":"customer1" ,"menuId":"12"},
        //   { "id": 4, "itemName": "Employees", "menuName":"customer","menuId":"11" },
        //   { "id": 4, "itemName": "Employees", "menuName":null,"menuId":null },
        // ];
    })
    this.selected_permission = []
    this.dropdownSettings = {
      singleSelection: false,
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      enableSearchFilter: true,
      classes: "myclass custom-class",
      position: "bottom",
      maxHeight: "50px",
    };
    this.dropdownSettingsPermission = {
      singleSelection: false,
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      enableSearchFilter: true,
      classes: "myclass custom-class",
      position: "bottom",
      maxHeight: "50px",
      groupBy: "menuName"
    };
  }
  onItemSelect(event) {
  }

  multiSelectedListCountry(criteriaArray: any) {
    
    this.selectedCountryId = [];
    if (criteriaArray != null) {
      criteriaArray.forEach(element => {
        this.selectedCountryId.push({
          "countryId":element.id,
          "country":element.itemName      });
      });
    }
    return this.selectedCountryId;
  }
  multiSelectedListPermission(criteriaArray: any) {
    debugger
    this.selectedPermissionId = []
    if (criteriaArray != null){
      const idMapping = criteriaArray.reduce((acc, el, i) => {
        acc[el.menuId] = i;
        return acc;
      }, {});
      let root;
      criteriaArray.forEach(el => {
  // Handle the root element
  // if (el.menuId === null) {
  //   root = el;
  //   return;
  // }
  // Use our mapping to locate the parent element in our data array
  const parentEl = criteriaArray[idMapping[el.id]];
  // Add our current el to its parent's `children` array
  parentEl.list = [...(parentEl.list || []), el];
});
  }
    return this.selectedPermissionId;
    //   {"menuId":1,"menu":"Dashboard","childMenu":[{"id":1,"childMenu":"Orders"},{"id":2,"childMenu":"Order Return"}]}
      //   {"menuId":1,"menu":"customer","childMenu":[{"id":1,"childMenu":"Customers"},{"id":2,"childMenu":"Order Return"}]}
     
  }
  get signUpControls() {
    return this.addPerGroupForm.controls;
  }

  onSubmitPerGroupForm() {

    this.isSubmittedAddPerGroupForm = true
    if (this.addPerGroupForm.invalid) {
      return
    }
    this.addPerGroupFormDetails = {
      "groupName": this.addPerGroupForm.get('name').value,
      "countries": this.multiSelectedListCountry(this.addPerGroupForm.get('countries').value),
      "permission": this.multiSelectedListPermission(this.addPerGroupForm.get('permission').value),
      // "groupId":12,
      // "countries":[{"countryId":1,"country":"malaysia"}],
      // "permission":[{"menuId":1,"menu":"Dashboard","childMenu":[{"id":1,"childMenu":"Orders"},{"id":2,"childMenu":"Order Return"}]}]
    }
    
    if (this.id) {

      this.addPerGroupFormDetails.id = this.id;
    }
    if (this.editMode) {

      this.perGroupTitle = "Edit Permission Group"
      this.usersPermissionsService.addPermissionGroup(this.addPerGroupFormDetails).subscribe(
        data => {

          this.toastr.success("Permission Group Editted Successfully")
          console.log(data)
          this.router.navigate(['/users-permissions/user-permissions'], { relativeTo: this.activatedRoute })
        },
        error => {
          this.toastr.error(error.message)

        });
    }
    else {


      this.usersPermissionsService.addPermissionGroup(this.addPerGroupFormDetails).subscribe(
        data => {

          console.log(data)
          this.toastr.success("Permission Group Added Successfully")
          this.router.navigate(['/users-permissions/user-permissions'], { relativeTo: this.activatedRoute })
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

    if (this.editMode) {
      debugger
      this.perGroupTitle = "Edit Permission Group"
      this.usersPermissionsService.getPerGroupId(this.id).pipe(takeUntil(this._unsubscribe)).subscribe(
        (success: any) => {
          debugger
          this.permissionsData = success.data
          this.addPerGroupForm.patchValue({
            "name": this.permissionsData.employeeFullName,
          })
          this.selected_permission = this.permissionsData   //need to be updated
          this.selected_countries = this.permissionsData   //need to be updated

        },
        error => {

        }
      )

    }
    this.addPerGroupForm = new FormGroup({
      "name": new FormControl(name, Validators.required),
      "countries": new FormControl(countries, Validators.required),
      "permission": new FormControl(permission, Validators.required),

    });



  }
}
