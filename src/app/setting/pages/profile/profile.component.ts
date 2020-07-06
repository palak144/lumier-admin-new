import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {
  noWhitespaceValidator,
  validateAllFormFields
} from 'app/shared/utility/custom-validators';
import { AuthService } from 'app/shared/services/auth.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { UtilityService } from 'app/shared/utility/utility.service';
// import { Router, RouterEvent, NavigationEnd } from '@angular/router';
import { Location } from '@angular/common';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  ChangePasswordForm: FormGroup;
  isChangePasswordFormSubmitted = false;
  constructor(
    private confirmationService: ConfirmationService,
    private utilityService: UtilityService,
    private authService: AuthService,
    // private router: Router,
    private location: Location
  ) {
  }
  ngOnInit() {
    this.ChangePasswordForm = new FormGroup({
      oldPassword: new FormControl('', [
        Validators.required,
        Validators.pattern('[a-zA-Z0-9!@#$%^&*()][a-zA-Z0-9!@#$%^&*() ]*'),
        noWhitespaceValidator
      ]),
      newPassword: new FormControl('', [
        Validators.required, Validators.minLength(6),
        Validators.pattern('[a-zA-Z0-9!@#$%^&*()][a-zA-Z0-9!@#$%^&*() ]*'),
        noWhitespaceValidator
      ],
      )
    });
  }

  ChangePassword() {
    this.isChangePasswordFormSubmitted = true;
    if (this.ChangePasswordForm.valid) {

      const data = this.ChangePasswordForm.value;
      this.authService.changePassword(data).subscribe(
        (success: any) => {
          this.utilityService.successMessage('Password change successfully');
          this.ChangePasswordForm.reset();
        },
        error => {
          this.utilityService.routingAccordingToError(error);
        }
      );

    } else {
      validateAllFormFields(this.ChangePasswordForm);
    }
  }

  resetForm() {
    this.isChangePasswordFormSubmitted = false;
    this.ChangePasswordForm.reset();
    // this.router.navigateByUrl(`this.previousUrl`);
    this.location.back();
  }

}
