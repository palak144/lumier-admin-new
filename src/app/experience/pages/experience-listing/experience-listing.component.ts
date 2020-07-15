import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {
  noWhitespaceValidator,
  validateAllFormFields
} from 'app/shared/utility/custom-validators';
import { ConfirmationService, MessageService } from 'primeng/api';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { UtilityService } from 'app/shared/utility/utility.service';
import { ExperienceService } from 'app/shared/services/experience.service';

@Component({
  selector: 'app-experience-listing',
  templateUrl: './experience-listing.component.html',
  styleUrls: ['./experience-listing.component.scss']
})
export class ExperienceListingComponent implements OnInit {
  UpdateExperienceForm: FormGroup;
  AddExperienceForm: FormGroup;
  isUpdateExperienceFormSubmitted = false;
  isAddExperienceFormSubmitted = false;
  displayUpdateExperienceForm = false;
  displayAddExperienceForm = false;
  infoMsgsInFileUpload: any[] = [];
  basePathToUploadFiles = 'basePath/';
  experienceList: any[] = [];
  fileUrlFromUploader: string;
  itemToEdit: any;
  experience: any;
  constructor(
    private confirmationService: ConfirmationService,
    private utilityService: UtilityService,
    private experienceService: ExperienceService
  ) { }

  ngOnInit() {
    this.UpdateExperienceForm = new FormGroup({
      companyName: new FormControl('', [
        Validators.required,
        noWhitespaceValidator
      ]),
    });

    this.AddExperienceForm = new FormGroup({
      experience: new FormControl('', [
        Validators.required,
        noWhitespaceValidator
      ]),
    });

    this.getExperienceList();
  }

  getExperienceList() {
    this.utilityService.loaderStart();
    this.experienceService.getExperience().subscribe(
      (success: any) => {
        this.experience = success.data.map(experienceData => experienceData);
        this.utilityService.resetPage();
      },
      error => {
        this.utilityService.routingAccordingToError(error);
        this.utilityService.resetPage();
      }
    );
  }

  openExperienceCompanyForm(item) {
    this.UpdateExperienceForm.controls.experience.patchValue(
      item.experience
    );
    this.itemToEdit = item;
    this.displayUpdateExperienceForm = true;
  }

  openAddExperienceForm() {
    this.displayAddExperienceForm = true;
  }

  closeUpdateExperienceForm() {
    this.UpdateExperienceForm.reset();
    this.displayUpdateExperienceForm = false;
  }

  closeAddExperienceForm() {

    this.AddExperienceForm.reset();
    this.displayAddExperienceForm = false;
  }

  AddExperience() {
    this.isAddExperienceFormSubmitted = true;
    if (this.AddExperienceForm.valid) {

      const data = this.AddExperienceForm.value;
      this.experienceService.add(data).subscribe(
        (success: any) => {
          this.utilityService.successMessage('Experience Added');
          this.closeAddExperienceForm();
          this.getExperienceList();
        },
        error => {
          this.utilityService.routingAccordingToError(error);
        }
      );
    } else {
      validateAllFormFields(this.UpdateExperienceForm);
    }
  }


  UpdateExperience() {
    this.isUpdateExperienceFormSubmitted = true;
    if (this.UpdateExperienceForm.valid) {

      const data = this.UpdateExperienceForm.value;
      this.experienceService.update(data, this.itemToEdit.id).subscribe(
        (success: any) => {
          if (success.code == 200) {
            this.utilityService.successMessage('Experience Updated');
            this.itemToEdit = null;
            this.closeUpdateExperienceForm();
            this.getExperienceList();
          }
        },
        error => {
          this.utilityService.routingAccordingToError(error);
        }
      );
    } else {
      validateAllFormFields(this.UpdateExperienceForm);
    }
  }

  resetForm() {
    this.isUpdateExperienceFormSubmitted = false;
    this.isAddExperienceFormSubmitted = false;
    this.UpdateExperienceForm.reset();
    this.AddExperienceForm.reset();
  }

  ActiveDeactiveExperience(item) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to change status?',
      accept: () => {
        this.utilityService.loaderStart();
        this.experienceService
          .updateStatus({
            adminstatus: item.adminStatus == 1 ? 0 : 1,
            id: item.id
          })
          .subscribe((success: any) => {
            this.utilityService.successMessage('Company status updated');
            this.getExperienceList();
          });
      }
    });
  }

}
