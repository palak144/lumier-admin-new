import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {
  noWhitespaceValidator,
  validateAllFormFields
} from 'app/shared/utility/custom-validators';
import { ConfirmationService, MessageService, LazyLoadEvent } from 'primeng/api';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { UtilityService } from 'app/shared/utility/utility.service';
import { CompaniesService } from 'app/shared/services/companies.service';
import { switchMap, distinctUntilChanged, debounceTime, takeUntil, delay, startWith } from 'rxjs/operators';
import { Table } from 'primeng/table';
import { Observable, Subject } from 'rxjs';

@Component({
  selector: 'app-company-listing',
  templateUrl: './company-listing.component.html',
  styleUrls: ['./company-listing.component.scss']
})

export class CompanyListingComponent implements OnInit, OnDestroy {
  UpdateCompanyForm: FormGroup;
  AddCompanyForm: FormGroup;
  CsvImportForm: FormGroup;

  isUpdateCompanyFormSubmitted = false;
  isAddCompanyFormSubmitted = false;
  displayUpdateCompanyForm = false;
  displayAddCompanyForm = false;
  displayImportCsvForm:boolean = false;
  infoMsgsInFileUpload: any[] = [];
  basePathToUploadFiles = 'basePath/';
  companyList: any[] = [];
  fileUrlFromUploader: string;
  itemToEdit: any;
  company: any;
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
  csvFile: any;
  filetypestatus: number;
  filetypeerror: string;

  constructor(
    private confirmationService: ConfirmationService,
    private utilityService: UtilityService,
    private companiesService: CompaniesService
  ) { }

  ngOnInit() {
    this.UpdateCompanyForm = new FormGroup({
      companyName: new FormControl('', [
        Validators.required,
        Validators.pattern('[a-zA-Z0-9][a-zA-Z0-9 ]*'),
        noWhitespaceValidator
      ]),
    });
    
    this.AddCompanyForm = new FormGroup({
      companyName: new FormControl('', [
        Validators.required,
        Validators.pattern('[a-zA-Z0-9][a-zA-Z0-9 ]*'),
        noWhitespaceValidator
      ]),
    });

    this.CsvImportForm = new FormGroup({
      company_file: new FormControl('', [
        Validators.required,
      ]),
    })
    
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
      switchMap((term: string) => this.companiesService.getAllCompaniesSearch(this.page, term
      ))
    ).subscribe((success: any) => {
      this.company = success.data.results.map(companyData => companyData);
      this.totalCount = success.data.total;
      this.utilityService.resetPage();
    }, error => {
      this.utilityService.routingAccordingToError(error);
    })
  }
  getAllCompanies(page) {
    // this.utilityService.loaderStart();
    this.companiesService.getCompanies(page).subscribe(
      (success: any) => {
        this.company = success.data.results.map(companyData => companyData);
        this.totalCount = success.data.total;
        this.utilityService.resetPage();
      },
      error => {
        this.utilityService.routingAccordingToError(error);
        this.utilityService.resetPage();
      }
    );
  }

  /**Get data by search value with paging */
  getAllCompaniesSearch(page, searchBar) {
    this.companiesService.getAllCompaniesSearch(page, searchBar)
      .pipe(
        takeUntil(this._unsubscribe)
      )
      .subscribe((success: any) => {
        this.company = success.data.results.map(companyData => companyData);
        this.totalCount = success.data.total;
        this.utilityService.resetPage();
      }, error => {
        this.utilityService.routingAccordingToError(error);
      })
  }

  loadDataLazy(event: LazyLoadEvent) {
    this.utilityService.loaderStart();
    this.page = event.first / 10;
    // if there is a search term present in the search bar, then paginate with the search term
    if (!this.searchBar) {
      this.getAllCompanies(this.page);
    } else {
      this.getAllCompaniesSearch(this.page, this.searchBar);
    }
  }
  filterGlobal(searchTerm) {
    // indexing starts from 0 in primeng
    this.primeNGTable.first = 0;
    this.page = 0;
    this.searchTerms$.next(searchTerm);
  }
  openUpdateCompanyForm(item) {
    this.UpdateCompanyForm.controls.companyName.patchValue(
      item.companyName
    );
    this.itemToEdit = item;
    this.displayUpdateCompanyForm = true;
  }

  openAddCompanyForm() {
    this.displayAddCompanyForm = true;
  }

  closeUpdateCompanyForm() {
    this.UpdateCompanyForm.reset();
    this.displayUpdateCompanyForm = false;
  }

  closeAddCompanyForm() {
    this.AddCompanyForm.reset();
    this.displayAddCompanyForm = false;
  }

  AddCompany() {
    this.isAddCompanyFormSubmitted = true;
    if (this.AddCompanyForm.valid) {

      const data = this.AddCompanyForm.value;
      this.companiesService.add(data).subscribe(
        (success: any) => {
          this.utilityService.successMessage('Company Added');
          this.closeAddCompanyForm();
          this.initiateSearch();
        },
        error => {
          this.utilityService.routingAccordingToError(error);
        }
      );
    } else {
      validateAllFormFields(this.UpdateCompanyForm);
    }
  }

  UpdateCompany() {
    this.isUpdateCompanyFormSubmitted = true;
    if (this.UpdateCompanyForm.valid) {

      const data = this.UpdateCompanyForm.value;
      this.companiesService.update(data, this.itemToEdit.id).subscribe(
        (success: any) => {
          if (success.code === 200) {
            this.utilityService.successMessage('Company Updated');
            this.itemToEdit = null;
            this.closeUpdateCompanyForm();

            if (!this.searchBar) {
              this.getAllCompanies(this.page);
            } else {
              this.getAllCompaniesSearch(this.page, this.searchBar);
            }
          }
        },
        error => {
          this.utilityService.routingAccordingToError(error);
        }
      );
    } else {
      validateAllFormFields(this.UpdateCompanyForm);
    }
  }

  resetForm() {
    this.isUpdateCompanyFormSubmitted = false;
    this.isAddCompanyFormSubmitted = false;
    this.UpdateCompanyForm.reset();
    this.AddCompanyForm.reset();
  }

  ActiveDeactiveCategory(item) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to change status?',
      accept: () => {
        this.utilityService.loaderStart();
        this.companiesService
          .updateStatus({
            adminstatus: item.adminStatus == 1 ? 0 : 1,
            id: item.id
          })
          .subscribe((success: any) => {
            this.utilityService.successMessage('Company status updated');
            if (!this.searchBar) {
              this.getAllCompanies(this.page);
            } else {
              this.getAllCompaniesSearch(this.page, this.searchBar);
            }
          });
      }
    });
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
        this.companiesService.importCsv(this.csvFile).subscribe(
          (success: any) => {
            setTimeout(() => {
              this.closeImportCsvForm();
              this.utilityService.successMessage(success.message);
              this.initiateSearch();
              this.utilityService.loaderStop();
            }, 5000)
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
    if (this.csvFile.type === "text/csv") {
      this.filetypestatus = 0;
      this.filetypeerror = '';      
    } else {
      this.filetypeerror = "Only csv file formats are allowed.";
      this.filetypestatus = 1;
    }
  }
  
  ngOnDestroy() {
    this._unsubscribe.next(true);
    this._unsubscribe.complete();
  }
}
