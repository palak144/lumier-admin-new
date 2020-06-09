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
import { Table } from 'primeng/table';
import { Observable, Subject } from 'rxjs';
import { switchMap, distinctUntilChanged, debounceTime, takeUntil, delay, startWith } from 'rxjs/operators';
@Component({
  selector: 'app-category-listing',
  templateUrl: './category-listing.component.html',
  styleUrls: ['./category-listing.component.scss']
})
export class CategoryListingComponent implements OnInit, OnDestroy {
  UpdateCategoryForm: FormGroup;
  AddCategoryForm: FormGroup;
  CsvImportForm: FormGroup;

  isUpdateCategoryFormSubmitted = false;
  isAddCategoryFormSubmitted = false;
  displayUpdateCategoryForm = false;
  displayAddCategoryForm = false;
  displayImportCsvForm:boolean = false;
  infoMsgsInFileUpload: any[] = [];
  basePathToUploadFiles = 'basePath/';
  categoriesList: any[] = [];
  fileUrlFromUploader: string;
  itemToEdit: any;
  category: any;
  totalCount: number;
  page: number = 0;
  searchKey: string;
  searchValue: string;
  val: string;
  csvFile: any;
  filetypestatus: number;
  filetypeerror: string;

  @ViewChild(Table) tableComponent: Table;
  @ViewChild(Table) primeNGTable: Table;

  // Real time search
  searchTerms$ = new Subject<string>();
  searchBar: any;
  private _unsubscribe = new Subject<boolean>();

  constructor(
    private confirmationService: ConfirmationService,
    private utilityService: UtilityService,
    private categoriesService: CategoriesService
  ) { }

  ngOnInit() {
    this.UpdateCategoryForm = new FormGroup({
      category: new FormControl('', [
        Validators.required,
        Validators.pattern('[a-zA-Z0-9][a-zA-Z0-9 ]*'),
        noWhitespaceValidator
      ]),
    });

    this.AddCategoryForm = new FormGroup({
      category: new FormControl('', [
        Validators.required,
        Validators.pattern('[a-zA-Z0-9][a-zA-Z0-9 ]*'),
        noWhitespaceValidator
      ]),
    });

    this.CsvImportForm = new FormGroup({
      category_file: new FormControl('', [
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
      switchMap((term: string) => this.categoriesService.getAllCategoriesSearch(this.page, term
      ))
    ).subscribe((success: any) => {
      this.category = success.data.results.map(categoryData => categoryData);
      this.totalCount = success.data.total;
      this.utilityService.resetPage();
    }, error => {
      this.utilityService.routingAccordingToError(error);
    })
  }

  getAllCategories(page) {
    this.categoriesService.getAllCategories(page).subscribe(
      (success: any) => {
        this.category = success.data.results.map(categoryData => categoryData);
        this.totalCount = success.data.total;
        this.utilityService.resetPage();
      },
      error => {
        this.utilityService.routingAccordingToError(error);
        this.utilityService.resetPage();
      }
    );
  }
  
  getAllCategoriesSearch(page, searchBar) {
    this.categoriesService.getAllCategoriesSearch(page, searchBar)
      .pipe(
        takeUntil(this._unsubscribe)
      )
      .subscribe((success: any) => {
        this.category = success.data.results.map(categoryData => categoryData);
        this.totalCount = success.data.total;
        this.utilityService.resetPage();
      }, error => {
        this.utilityService.routingAccordingToError(error);
      })

  }

  openUpdateCategoryForm(item) {
    this.UpdateCategoryForm.controls.category.patchValue(
      item.category
    );
    this.itemToEdit = item;
    this.displayUpdateCategoryForm = true;
  }

  openAddCategoryForm() {
    this.displayAddCategoryForm = true;
  }

  closeUpdateCategoryForm() {
    this.UpdateCategoryForm.reset();
    this.displayUpdateCategoryForm = false;
  }

  closeAddCategoryForm() {
    this.AddCategoryForm.reset();
    this.displayAddCategoryForm = false;
  }

  AddCategory() {
    this.isAddCategoryFormSubmitted = true;
    if (this.AddCategoryForm.valid) {

      const data = this.AddCategoryForm.value;
      this.categoriesService.createCategory(data).subscribe(
        (success: any) => {
          this.utilityService.successMessage('Category Added');
          this.closeAddCategoryForm();
          this.initiateSearch();
        },
        error => {
          this.utilityService.routingAccordingToError(error);
        }
      );
    } else {
      validateAllFormFields(this.UpdateCategoryForm);
    }
  }
  UpdateCategory() {
    this.isUpdateCategoryFormSubmitted = true;
    if (this.UpdateCategoryForm.valid) {

      const data = this.UpdateCategoryForm.value;
      this.categoriesService.updateCategory(data, this.itemToEdit.id).subscribe(
        (success: any) => {
          if (success.code === 200) {
            this.utilityService.successMessage('category Updated');
            this.itemToEdit = null;
            this.closeUpdateCategoryForm();
            if (!this.searchBar) {
              this.getAllCategories(this.page);
            } else {
              this.getAllCategoriesSearch(this.page, this.searchBar);
            }
          }
        },
        error => {
          this.utilityService.routingAccordingToError(error);
        }
      );
    } else {
      validateAllFormFields(this.UpdateCategoryForm);
    }
  }

  resetForm() {
    this.isUpdateCategoryFormSubmitted = false;
    this.isAddCategoryFormSubmitted = false;
    this.UpdateCategoryForm.reset();
    this.AddCategoryForm.reset();
  }

  ActiveDeactiveCategory(item) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to change status?',
      accept: () => {
        this.utilityService.loaderStart();
        this.categoriesService
          .updateStatus({
            adminstatus: item.adminStatus == 1 ? 0 : 1,
            id: item.id
          })
          .subscribe((success: any) => {
            this.utilityService.successMessage('Category status updated');
            if (!this.searchBar) {
              this.getAllCategories(this.page);
            } else {
              this.getAllCategoriesSearch(this.page, this.searchBar);
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
      this.getAllCategories(this.page);
    } else {
      this.getAllCategoriesSearch(this.page, this.searchBar);
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
  
  openImportCsvForm(){
    this.displayImportCsvForm = true;
  }
  
  closeImportCsvForm() {
    this.CsvImportForm.reset();
    this.displayImportCsvForm = false;
  }

  importCsvData(){
    if (this.CsvImportForm.valid ) {
      if(!this.filetypestatus){
        this.utilityService.loaderStart();
        this.filetypeerror = '';
        this.categoriesService.importCsv(this.csvFile).subscribe(
          (success: any) => {
            setTimeout(() => {
              this.closeImportCsvForm();
              this.utilityService.successMessage(success.message);
              this.initiateSearch();
              this.utilityService.loaderStop();
            }, 5000);
          },
          error => {
            this.utilityService.routingAccordingToError(error);
          }
        );        
      }else{
        this.filetypeerror = "Only csv file formats are allowed.";
      }
    } else {
      validateAllFormFields(this.CsvImportForm);
    }
  }

  fileChangeEvent(fileInput: any) {    
    this.csvFile = fileInput.target.files[0];
    console.log('this.csvFile.type', this.csvFile.type);
    if (this.csvFile.type === "text/csv") {
      this.filetypestatus = 0;
      this.filetypeerror = '';      
    } else {
      this.filetypeerror = "Only csv file formats are allowed.";
      this.filetypestatus = 1;
    }
  }
}
