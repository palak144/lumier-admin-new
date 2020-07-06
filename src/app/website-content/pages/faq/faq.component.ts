import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UtilityService } from 'app/shared/utility/utility.service';
import { ConfirmationService } from 'primeng/api';
import {
  noWhitespaceValidator,
  validateAllFormFields
} from 'app/shared/utility/custom-validators';
import { WebsiteContentService } from 'app/shared/services/website-content.service';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss']
})
export class FaqComponent implements OnInit {
  isAddFaqSubmitted = false;
  addEditFaqForm: FormGroup;
  faqListing: any[] = [];
  displayAddEditFAQ = false;
  mode: string;
  itemToEdit: any;
  constructor(
    private confirmationService: ConfirmationService,
    private utilityService: UtilityService,
    private websiteContentService: WebsiteContentService
  ) { }

  ngOnInit() {
    this.addEditFaqForm = new FormGroup({
      question: new FormControl('', [Validators.required, noWhitespaceValidator]),
      answer: new FormControl('', [
        Validators.required,
        Validators.minLength(25),
        noWhitespaceValidator
      ])
    });

    this.getAllFaqListing();
  }

  openAddEditTestimonial(item?) {
    // edit
    if (item) {
      this.itemToEdit = item;
      this.displayAddEditFAQ = true;
      this.addEditFaqForm.patchValue(item);
    } else {
      // add
      this.displayAddEditFAQ = true;
    }
  }

  closeAddEditFaq() {
    this.addEditFaqForm.reset();
    this.isAddFaqSubmitted = false;
    this.displayAddEditFAQ = false;
  }

  getAllFaqListing() {
    this.utilityService.loaderStart();
    this.websiteContentService.getFaq().subscribe(
      (success: any) => {
        this.faqListing = success.data.faqList;
        this.utilityService.resetPage();
      },
      error => {
        this.utilityService.routingAccordingToError(error);
        this.utilityService.resetPage();
      }
    );
  }

  addUpdateFaq() {
    let faqBody;
    this.isAddFaqSubmitted = true;
    if (this.addEditFaqForm.valid) {
      this.utilityService.loaderStart();
      if (this.itemToEdit) {
        faqBody = {
          question: this.addEditFaqForm.controls.question.value,
          answer: this.addEditFaqForm.controls.answer.value,
          id: this.itemToEdit.id
        };
      } else {
        faqBody = {
          question: this.addEditFaqForm.controls.question.value,
          answer: this.addEditFaqForm.controls.answer.value
        };
      }
      this.websiteContentService
        .addUpdateFaq(faqBody)
        .subscribe(
          (success: any) => {
            if (this.itemToEdit) {
              this.utilityService.successMessage('FAQ Updated');
              this.itemToEdit = null;
            } else {
              this.utilityService.successMessage('FAQ Added');
            }
            this.closeAddEditFaq();
            this.getAllFaqListing();
          },
          error => {
            this.utilityService.routingAccordingToError(error);
            this.utilityService.resetPage();
          }
        );
    } else {
      validateAllFormFields(this.addEditFaqForm);
    }
  }

  deleteFaq(itemToDelete) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to delete?',
      accept: () => {
        this.utilityService.loaderStart();
        this.websiteContentService
          .deleteFaq(itemToDelete.id)
          .subscribe((success: any) => {
            this.utilityService.successMessage('FAQ Deleted');
            this.getAllFaqListing();
          });
      }
    });
  }
}
