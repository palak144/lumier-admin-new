import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { UtilityService } from 'app/shared/utility/utility.service';
import { UserService } from 'app/shared/services/user.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ConfirmationService, MessageService, LazyLoadEvent } from 'primeng/api';
import {
  noWhitespaceValidator,
  validateAllFormFields
} from 'app/shared/utility/custom-validators';

import { switchMap, distinctUntilChanged, debounceTime, takeUntil, delay, startWith } from 'rxjs/operators';
import { resetComponentState } from '@angular/core/src/render3/instructions';
import { Table } from 'primeng/table';
import { Subject, fromEvent } from 'rxjs';
@Component({
  selector: 'app-expert-listing',
  templateUrl: './expert-listing.component.html',
  styleUrls: ['./expert-listing.component.scss']
})

export class ExpertListingComponent implements OnInit, OnDestroy {

  expert: any;
  totalCount: number;
  page: number = 0;
  searchKey: string;
  searchValue: string = '';
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
      switchMap((term: string) => this.userService.getAllExpertSearch(this.page, term
      ))
    ).subscribe((success: any) => {
      this.expert = success.data.results.map(expertData => expertData);
      this.totalCount = success.data.total;
      this.utilityService.resetPage();
    }, error => {
      this.utilityService.routingAccordingToError(error);
    })
  }

  getAllExpert(page) {
    this.userService.getAllExpert(page).subscribe(
      (success: any) => {
        // this.utilityService.loaderStop();
        this.expert = success.data.results.map(expertData => expertData);
        this.totalCount = success.data.total;
        this.utilityService.resetPage();
      },
      error => {
        this.utilityService.routingAccordingToError(error);
        this.utilityService.resetPage();
      }
    );
  }

  getAllExpertSearch(page, searchBar) {
    this.userService.getAllExpertSearch(page, searchBar)
      .pipe(
        takeUntil(this._unsubscribe)
      )
      .subscribe((success: any) => {
        this.expert = success.data.results.map(expertData => expertData);
        this.totalCount = success.data.total;
        this.utilityService.resetPage();
      }, error => {
        this.utilityService.routingAccordingToError(error);
      })
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
            this.utilityService.successMessage('Expert status updated');
            if (!this.searchBar) {
              this.getAllExpert(this.page);
            } else {
              this.getAllExpertSearch(this.page, this.searchBar);
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
      this.getAllExpert(this.page);
    } else {
      this.getAllExpertSearch(this.page, this.searchBar);
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
