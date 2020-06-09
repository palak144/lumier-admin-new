import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {
  noWhitespaceValidator,
  validateAllFormFields
} from 'app/shared/utility/custom-validators';
import { ConfirmationService, MessageService, LazyLoadEvent } from 'primeng/api';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { UtilityService } from 'app/shared/utility/utility.service';
import { CategoriesService } from 'app/shared/services/categories.service';
import { SkillService } from 'app/shared/services/skill.service';
import { switchMap, distinctUntilChanged, debounceTime, takeUntil, delay, startWith } from 'rxjs/operators';
import { Table } from 'primeng/table';
import { Observable, Subject } from 'rxjs';

@Component({
  selector: 'app-skill-listing',
  templateUrl: './skill-listing.component.html',
  styleUrls: ['./skill-listing.component.scss']
})
export class SkillListingComponent implements OnInit, OnDestroy {
  UpdateSkillForm: FormGroup;
  AddSkillForm: FormGroup;
  isUpdateSkillFormSubmitted = false;
  isAddSkillFormSubmitted = false;
  displayUpdateSkillForm = false;
  displayAddSkillForm = false;
  infoMsgsInFileUpload: any[] = [];
  basePathToUploadFiles = 'basePath/';
  skillList: any[] = [];
  categoryList: any[] = [];
  fileUrlFromUploader: string;
  itemToEdit: any;
  skill: any;
  selectedCategory: string;
  categoryId: any;
  categoryArr: any = [];
  totalCount: number;
  page: number = 0;
  searchKey: string;
  searchValue: string;
  val: string;

  @ViewChild(Table) tableComponent: Table;
  @ViewChild(Table) primeNGTable: Table;

  // Real time search
  searchTerms$ = new Subject<string>();
  searchBar: any;
  private _unsubscribe = new Subject<boolean>();

  constructor(
    private confirmationService: ConfirmationService,
    private utilityService: UtilityService,
    private categoriesService: CategoriesService,
    private skillService: SkillService
  ) { }

  ngOnInit() {
    this.UpdateSkillForm = new FormGroup({
      skill: new FormControl('', [
        Validators.required,
        Validators.pattern('[a-zA-Z0-9][a-zA-Z0-9 ]*'),
        noWhitespaceValidator
      ]),
      categoryId: new FormControl('', [
        Validators.required,
      ]),
    });

    this.AddSkillForm = new FormGroup({
      skill: new FormControl('', [
        Validators.required,
        Validators.pattern('[a-zA-Z0-9][a-zA-Z0-9 ]*'),
        noWhitespaceValidator
      ]),
      categoryId: new FormControl('', [
        Validators.required,
      ]),
    });

    this.initiateSearch();
  }

  initiateSearch() {
    this.searchTerms$.pipe(
      takeUntil(this._unsubscribe),
      startWith(''),
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),
      distinctUntilChanged(),
      // switch to new search observable each time the term changes
      switchMap((term: string) => this.skillService.getSkillsSearch(this.page, term
      ))
    ).subscribe((success: any) => {
      this.skill = success.data.results.map(categoryData => categoryData);
      this.totalCount = success.data.total;
      this.utilityService.resetPage();
    }, error => {
      this.utilityService.routingAccordingToError(error);
    })
  }

  getAllSkill(page) {
    // this.utilityService.loaderStart();
    this.skillService.getSkills(page).subscribe(
      (success: any) => {
        this.skill = success.data.results.map(skillData => skillData);
        this.totalCount = success.data.total;
        this.utilityService.resetPage();
      },
      error => {
        this.utilityService.routingAccordingToError(error);
        this.utilityService.resetPage();
      }
    );
  }

  getAllSkillSearch(page, searchBar) {
    // this.utilityService.loaderStart();
    this.skillService.getSkillsSearch(page, searchBar).subscribe(
      (success: any) => {
        this.skill = success.data.results.map(skillData => skillData);
        this.totalCount = success.data.total;
        this.utilityService.resetPage();
      },
      error => {
        this.utilityService.routingAccordingToError(error);
        this.utilityService.resetPage();
      }
    );
  }

  getAllActiveCategory() {
    this.skillService.activecategory().subscribe(
      (success: any) => {
        this.categoryList = success.data.map(categoryData => categoryData);
        if (this.categoryList.length > 0) {
          for (let index = 0; index < this.categoryList.length; index++) {
            const element = this.categoryList[index];
            this.categoryArr.push({ 'label': element.category, 'value': element.id });
          }
          if (this.itemToEdit) {
            this.UpdateSkillForm.patchValue(
              { 'categoryId': this.itemToEdit.categoryId }
            );
          }

        }
        this.utilityService.resetPage();
      },
      error => {
        this.utilityService.routingAccordingToError(error);
        this.utilityService.resetPage();
      }
    );
  }

  openUpdateSkillForm(item) {
    this.getAllActiveCategory();

    this.UpdateSkillForm.controls.skill.patchValue(
      item.skill
    );
    this.itemToEdit = item;
    this.displayUpdateSkillForm = true;
  }

  openAddSkillForm() {
    this.displayAddSkillForm = true;
    this.getAllActiveCategory();

  }

  closeUpdateSkillForm() {
    this.UpdateSkillForm.reset();
    this.displayUpdateSkillForm = false;
  }

  closeAddSkillForm() {

    this.AddSkillForm.reset();
    this.displayAddSkillForm = false;
  }

  AddSkill() {
    this.isAddSkillFormSubmitted = true;
    if (this.AddSkillForm.valid) {

      const data = this.AddSkillForm.value;
      this.skillService.createSkill(data).subscribe(
        (success: any) => {
          this.utilityService.successMessage('Skill Added');
          this.closeAddSkillForm();
          this.initiateSearch();
        },
        error => {
          this.utilityService.routingAccordingToError(error);
        }
      );
    } else {
      validateAllFormFields(this.UpdateSkillForm);
    }
  }

  UpdateSkill() {
    this.isUpdateSkillFormSubmitted = true;
    if (this.UpdateSkillForm.valid) {

      const data = this.UpdateSkillForm.value;
      this.skillService.updateSkill(data, this.itemToEdit.id).subscribe(
        (success: any) => {
          if (success.code === 200) {
            this.utilityService.successMessage('Skill Updated');
            this.itemToEdit = null;
            this.closeUpdateSkillForm();
            if (!this.searchBar) {
              this.getAllSkill(this.page);
            } else {
              this.getAllSkillSearch(this.page, this.searchBar);
            }
          }
        },
        error => {
          this.utilityService.routingAccordingToError(error);
        }
      );
    } else {
      validateAllFormFields(this.UpdateSkillForm);
    }
  }

  resetForm() {
    this.isUpdateSkillFormSubmitted = false;
    this.isAddSkillFormSubmitted = false;
    this.UpdateSkillForm.reset();
    this.AddSkillForm.reset();
  }

  ActiveDeactiveSkill(item) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to change status?',
      accept: () => {
        this.utilityService.loaderStart();
        this.skillService
          .updateStatus({
            adminstatus: item.adminStatus == 1 ? 0 : 1,
            id: item.id
          })
          .subscribe((success: any) => {
            this.utilityService.successMessage('Skill status updated');
            if (!this.searchBar) {
              this.getAllSkill(this.page);
            } else {
              this.getAllSkillSearch(this.page, this.searchBar);
            }
          });
      }
    });
  }

  loadDataLazy(event: LazyLoadEvent) {
    this.utilityService.loaderStart();
    this.page = event.first / 10;
    // if there is a search term present in the search bar, then paginate with the search term
    if (!this.searchBar) {
      this.getAllSkill(this.page);
    } else {
      this.getAllSkillSearch(this.page, this.searchBar);
    }
  }
  filterGlobal(searchTerm) {
    // indexing starts from 0 in primeng
    this.primeNGTable.first = 0;
    this.page = 0;
    this.searchTerms$.next(searchTerm);
  }
  ngOnDestroy() {
    this._unsubscribe.next(true);
    this._unsubscribe.complete();
  }
}
