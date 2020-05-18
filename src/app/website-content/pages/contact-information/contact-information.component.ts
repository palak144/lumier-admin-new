import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {
  noWhitespaceValidator,
  validateAllFormFields
} from 'app/shared/utility/custom-validators';
import { UtilityService } from 'app/shared/utility/utility.service';
import { ConfirmationService } from 'primeng/api';
import { WebsiteContentService } from 'app/shared/services/website-content.service';

@Component({
  selector: 'app-contact-information',
  templateUrl: './contact-information.component.html',
  styleUrls: ['./contact-information.component.scss']
})
export class ContactInformationComponent implements OnInit {
  isContactFormSubmitted = false;
  contactForm: FormGroup;
  displayEditContactDetailsForm = false;
  contactInformationDetails: any;

  constructor(
    private confirmationService: ConfirmationService,
    private utilityService: UtilityService,
    private websiteContentService: WebsiteContentService
  ) { }

  ngOnInit() {
    this.contactForm = new FormGroup({
      contact_description: new FormControl('', [
        Validators.required,
        noWhitespaceValidator
      ]),
      phone_number: new FormControl('', [
        Validators.required,
        Validators.pattern(/[+]?[0-9]{10,13}$/),
        Validators.maxLength(13)
      ]),
      email: new FormControl('', [
        Validators.required,
        Validators.pattern(
          /(^[a-zA-Z0-9_\.\+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-\.]+$)/
        )
      ]),
      address: new FormControl('', [
        Validators.required,
        Validators.maxLength(1000),
        noWhitespaceValidator
      ]),
      social_accounts: new FormGroup({
        facebook: new FormControl(),
        twitter: new FormControl(),
        instagram: new FormControl(),
        linkedIn: new FormControl()
      })
    });

    this.getContactInformation();
  }

  onSubmitContactForm() {
    this.isContactFormSubmitted = true;
    if (this.contactForm.valid) {
      this.utilityService.loaderStart();
      let contactInfoData = {
        id: this.contactInformationDetails.id
      };
      contactInfoData = { ...contactInfoData, ...this.contactForm.value };
      this.websiteContentService
        .updateContactInformation(contactInfoData)
        .subscribe(
          (success: any) => {
            this.utilityService.successMessage('Information Updated!');
            this.contactForm.reset();
            this.displayEditContactDetailsForm = false;
            this.getContactInformation();
          },
          error => {
            this.utilityService.routingAccordingToError(error);
          }
        );
    } else {
      validateAllFormFields(this.contactForm);
    }
  }

  getContactInformation() {
    this.utilityService.loaderStart();
    this.websiteContentService.getContactInformation().subscribe(
      (success: any) => {
        this.contactInformationDetails = success.data;
        this.contactInformationDetails.social_accounts = JSON.parse(
          success.data.social_accounts
        );
        this.utilityService.resetPage();
      },
      error => {
        this.utilityService.routingAccordingToError(error);
        this.utilityService.resetPage();
      }
    );
  }

  resetForm() {
    this.isContactFormSubmitted = false;
    this.contactForm.reset();
  }

  editContactInformation() {
    this.contactForm.patchValue(this.contactInformationDetails);
    this.displayEditContactDetailsForm = true;
  }

  closeEditContactInformation() {
    this.confirmationService.confirm({
      message:
        'All unsaved changes will be lost. Are you sure you want to exit?',
      accept: () => {
        this.contactForm.reset();
        this.displayEditContactDetailsForm = false;
        this.utilityService.scrollToTop();
      }
    });
  }
}
