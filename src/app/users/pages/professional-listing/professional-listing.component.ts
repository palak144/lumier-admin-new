import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { UtilityService } from 'app/shared/utility/utility.service';
import { UserService } from 'app/shared/services/user.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ConfirmationService, MessageService, LazyLoadEvent } from 'primeng/api';
import {
  noWhitespaceValidator,
  validateAllFormFields
} from 'app/shared/utility/custom-validators';
import { Observable, Subject } from 'rxjs';
import { switchMap, distinctUntilChanged, debounceTime, takeUntil, delay, startWith } from 'rxjs/operators';
import { Table } from 'primeng/table';

@Component({
  selector: 'app-professional-listing',
  templateUrl: './professional-listing.component.html',
  styleUrls: ['./professional-listing.component.scss']
})

export class ProfessionalListingComponent implements OnInit, OnDestroy {

  professional: any;
  totalCount: number;
  page: number = 0;
  searchKey: string = '';
  searchValue: string;
  val: string;

  @ViewChild(Table) tableComponent: Table;
  @ViewChild(Table) primeNGTable: Table;

  // Real time search
  searchTerms$ = new Subject<string>();
  searchBar: any;

  private _unsubscribe = new Subject<boolean>();

  constructor(private confirmationService: ConfirmationService,
    private utilityService: UtilityService,
    private userService: UserService) { }

  ngOnInit() {
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
      switchMap((term: string) => this.userService.getAllProfessionalSearch(this.page, term
      ))
    ).subscribe((success: any) => {
      this.professional = success.data.results.map(professionalData => professionalData);
      this.totalCount = success.data.total;
      this.utilityService.resetPage();
    }, error => {
      this.utilityService.routingAccordingToError(error);
    })
  }

  getAllProfessional(page) {
    this.userService.getAllProfessional(page).subscribe(
      (success: any) => {
        // this.utilityService.loaderStop();
        this.professional = success.data.results.map(expertData => expertData);
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

  getAllProfessionalSearch(page, searchBar) {
    this.userService.getAllProfessionalSearch(page, searchBar)
      .pipe(
        takeUntil(this._unsubscribe)
      )
      .subscribe((success: any) => {
        this.professional = success.data.results.map(professionalData => professionalData);
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
      this.getAllProfessional(this.page);
    } else {
      this.getAllProfessionalSearch(this.page, this.searchBar);
    }
  }
  filterGlobal(searchTerm) {
    // indexing starts from 0 in primeng
    this.primeNGTable.first = 0;
    this.page = 0;
    this.searchTerms$.next(searchTerm);
  }

  ChangeStatus(item) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to change status?',
      accept: () => {
        this.utilityService.loaderStart();
        this.userService
          .updateStatus({
            adminstatus: item.adminStatus == 1 ? 0 : 1,
            id: item.id
          })
          .subscribe((success: any) => {
            this.utilityService.successMessage('Professional status updated');
            if (!this.searchBar) {
              this.getAllProfessional(this.page);
            } else {
              this.getAllProfessionalSearch(this.page, this.searchBar);
            }
          });
      }
    });
  }

  ngOnDestroy() {
    this._unsubscribe.next(true);
    this._unsubscribe.complete();
  }
}
