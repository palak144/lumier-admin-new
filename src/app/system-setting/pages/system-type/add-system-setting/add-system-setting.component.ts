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
  selector: 'app-add-system-setting',
  templateUrl: './add-system-setting.component.html',
  styleUrls: ['./add-system-setting.component.scss']
})
export class AddSystemSettingComponent implements OnInit {
  addUserForm: FormGroup;
  userTitle: string;
  isSubmittedaddSellerForm: boolean;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private usersPermissionsService: UsersPermissionsService,
    private UtilityService: UtilityService,
    private toastr: ToastrService,
  ) { }

  ngOnInit() {
    this.userTitle = "Add Supply Type";
    this.addUserForm = new FormGroup({
      name: new FormControl('',[Validators.required]),
      countryId: new FormControl('',[Validators.required]),
      status: new FormControl('',[Validators.required]),
    })
  }
  get signUpControls() {
    return this.addUserForm.controls;
  }
  onSubmitUserForm()
  {
    this.isSubmittedaddSellerForm = true
    
        
    if (this.addUserForm.invalid) {
      return
    }
  }
}
