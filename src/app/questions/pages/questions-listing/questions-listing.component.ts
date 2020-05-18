import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {
  noWhitespaceValidator,
  validateAllFormFields
} from 'app/shared/utility/custom-validators';
import { ConfirmationService, MessageService, LazyLoadEvent } from 'primeng/api';
import { UtilityService } from 'app/shared/utility/utility.service';
import { QuestionService } from 'app/shared/services/question.service';
import { Router } from '@angular/router';
import { switchMap, distinctUntilChanged, debounceTime, takeUntil, delay, startWith } from 'rxjs/operators';
import { Table } from 'primeng/table';
import { Observable, Subject } from 'rxjs';
@Component({
  selector: 'app-questions-listing',
  templateUrl: './questions-listing.component.html',
  styleUrls: ['./questions-listing.component.scss']
})
export class QuestionsListingComponent implements OnInit, OnDestroy {

  userList: any[] = [];
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
    private QuestionService: QuestionService
  ) { }

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
      switchMap((term: string) => this.QuestionService.getUserListSearch(this.page, term
      ))
    ).subscribe((success: any) => {
      this.userList = success.data.results.map(questionData => questionData);
      this.totalCount = success.data.total;
      this.utilityService.resetPage();
    }, error => {
      this.utilityService.routingAccordingToError(error);
    })
  }

  getAllUserSearch(page, searchBar) {
    // this.utilityService.loaderStart();
    this.QuestionService.getUserListSearch(page, searchBar).subscribe(
      (success: any) => {
        this.userList = success.data.results.map(questionData => questionData);
        this.totalCount = success.data.total;
        this.utilityService.resetPage();
      },
      error => {
        this.utilityService.routingAccordingToError(error);
        this.utilityService.resetPage();
      }
    );
  }

  getAllUser(page) {
    // this.utilityService.loaderStart();
    this.QuestionService.getUserList(page).subscribe(
      (success: any) => {
        this.userList = success.data.results.map(questionData => questionData);
        this.totalCount = success.data.total;
        this.utilityService.resetPage();
      },
      error => {
        this.utilityService.routingAccordingToError(error);
        this.utilityService.resetPage();
      }
    );
  }

  loadDataLazy(event: LazyLoadEvent) {
    this.utilityService.loaderStart();
    this.page = event.first / 10;
    // if there is a search term present in the search bar, then paginate with the search term
    if (!this.searchBar) {
      this.getAllUser(this.page);
    } else {
      this.getAllUserSearch(this.page, this.searchBar);
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
