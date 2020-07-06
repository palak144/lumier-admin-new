import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Subject } from 'rxjs';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UsersPermissionsService } from 'app/shared/services/users-permissions.service';
import { UtilityService } from 'app/shared/services/utility.service';
import { takeUntil } from 'rxjs/operators';
import { validateAllFormFields, noWhitespaceValidator, blankSpaceInputNotValid } from '../../../../shared/utils/custom-validators';
@Component({
  selector: 'app-add-manufacturer-brand',
  templateUrl: './add-manufacturer-brand.component.html',
  styleUrls: ['./add-manufacturer-brand.component.scss']
})
export class AddManufacturerBrandComponent implements OnInit {
  addUserForm: FormGroup;
  userTitle: string;
  StatusListFromAPI: string[];
  assignGroupList: any;
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private usersPermissionsService: UsersPermissionsService,
    private UtilityService: UtilityService,
    private toastr: ToastrService,
  ) { }

  ngOnInit() {
    this.userTitle = "Add Manufacturer/ Brand";
    this.StatusListFromAPI = ['Active','Inactive'];
    this.assignGroupList = this.UtilityService.arrayOfStringsToArrayOfObjects(this.StatusListFromAPI);
    this.addUserForm = new FormGroup({
      name: new FormControl('',[Validators.required,Validators.maxLength(30)]),
      Supply_type: new FormControl('',[Validators.required]),
      
      Status: new FormControl(null,[Validators.required])
    })
  }
  onSubmitUserForm()
  {
    if(this.addUserForm.valid) {
    }
    else
    {
      validateAllFormFields(this.addUserForm);
      // this.messageService.add({ severity: 'warn', summary: 'One or more fields are invalid. Please try again.' });
    }  
    }
    get customeForm() {
      return this.addUserForm.controls;
    }
  uploadFile(event)
  {
  }
}
