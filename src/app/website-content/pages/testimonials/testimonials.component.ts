import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { UtilityService } from 'app/shared/utility/utility.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import {
  noWhitespaceValidator,
  validateAllFormFields
} from 'app/shared/utility/custom-validators';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { WebsiteContentService } from 'app/shared/services/website-content.service';
import { ErrorHandlerService } from 'app/shared/services/error-handler.service';

@Component({
  selector: 'app-testimonials',
  templateUrl: './testimonials.component.html',
  styleUrls: ['./testimonials.component.scss']
})
export class TestimonialsComponent implements OnInit {
  isAddTestimonialSubmitted = false;
  addEditTestimonailForm: FormGroup;
  testimonials: any[] = [];
  displayAddEditTestimonial = false;
  mode: string;
  itemToEdit: any;
  constructor(
    private confirmationService: ConfirmationService,
    private utilityService: UtilityService,
    private websiteContentService: WebsiteContentService
  ) {}

  ngOnInit() {
    this.addEditTestimonailForm = new FormGroup({
      name: new FormControl('', [Validators.required, noWhitespaceValidator]),
      review: new FormControl('', [
        Validators.required,
        Validators.maxLength(500),
        Validators.minLength(25),
        noWhitespaceValidator
      ])
    });

    this.getAllTestimonials();
  }

  openAddEditTestimonial(item?) {
    // edit
    if (item) {
      this.itemToEdit = item;
      this.displayAddEditTestimonial = true;
      this.addEditTestimonailForm.patchValue(item);
    } else {
      // add
      this.displayAddEditTestimonial = true;
    }
  }

  closeAddEditTestimonial() {
    this.addEditTestimonailForm.reset();
    this.isAddTestimonialSubmitted = false;
    this.displayAddEditTestimonial = false;
  }

  getAllTestimonials() {
    this.utilityService.loaderStart();
    this.websiteContentService.getTestimonial().subscribe(
      (success: any) => {
        this.testimonials = success.data.testimonial;
        this.utilityService.resetPage();
      },
      error => {
        this.utilityService.routingAccordingToError(error);
        this.utilityService.resetPage();
      }
    );
  }

  addUpdateTestimonial() {
    let testimonialBody;
    this.isAddTestimonialSubmitted = true;
    if (this.addEditTestimonailForm.valid) {
      this.utilityService.loaderStart();
      if (this.itemToEdit) {
        testimonialBody = {
          name: this.addEditTestimonailForm.controls.name.value,
          review: this.addEditTestimonailForm.controls.review.value,
          testimonial_id: this.itemToEdit.testimonial_id
        };
      } else {
        testimonialBody = {
          name: this.addEditTestimonailForm.controls.name.value,
          review: this.addEditTestimonailForm.controls.review.value
        };
      }
      this.websiteContentService
        .addUpdateTestimonial(testimonialBody)
        .subscribe(
          (success: any) => {
            if (this.itemToEdit) {
              this.utilityService.successMessage('Testimonial Updated');
              this.itemToEdit = null;
            } else {
              this.utilityService.successMessage('Testimonial Added');
            }
            this.closeAddEditTestimonial();
            this.getAllTestimonials();
          },
          error => {
            this.utilityService.routingAccordingToError(error);
            this.utilityService.resetPage();
          }
        );
    } else {
      validateAllFormFields(this.addEditTestimonailForm);
    }
  }

  deleteTestimonial(itemToDelete) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to delete?',
      accept: () => {
        this.utilityService.loaderStart();
        this.websiteContentService
          .deleteTestimonial({
            status: 'delete',
            testimonial_id: itemToDelete.testimonial_id
          })
          .subscribe((success: any) => {
            this.utilityService.successMessage('Testimonial Deleted');
            this.getAllTestimonials();
          });
      }
    });
  }
}
