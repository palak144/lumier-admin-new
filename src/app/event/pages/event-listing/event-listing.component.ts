import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {
  noWhitespaceValidator,
  validateAllFormFields
} from 'app/shared/utility/custom-validators';
import { ConfirmationService, MessageService, LazyLoadEvent } from 'primeng/api';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { UtilityService } from 'app/shared/utility/utility.service';
import { EventService } from 'app/shared/services/event.service';
import { switchMap, distinctUntilChanged, debounceTime, takeUntil, delay, startWith } from 'rxjs/operators';
import { Table } from 'primeng/table';
import { Observable, Subject } from 'rxjs';

@Component({
  selector: 'app-event-listing',
  templateUrl: './event-listing.component.html',
  styleUrls: ['./event-listing.component.scss']
})
export class EventListingComponent implements OnInit, OnDestroy {

  eventList: any[] = [];
  totalCount: number;
  page: number = 0;
  searchKey: string;
  searchValue: string;
  val: string;
  readMoreFlag: boolean = false;
  desc: string;
  eventName: string;
  userName: string;
  profilePic: string;

  @ViewChild(Table) tableComponent: Table;
  @ViewChild(Table) primeNGTable: Table;

  // Real time search
  searchTerms$ = new Subject<string>();
  searchBar: any;
  private _unsubscribe = new Subject<boolean>();

  constructor(
    private confirmationService: ConfirmationService,
    private utilityService: UtilityService,
    private EventService: EventService
  ) { }

  ngOnInit() {
    this.initiateSearch();
  }

  // Open description dialog
  readMoreDialog(item) {
    this.readMoreFlag = true;
    if (item) {
      this.desc = item.description;
      this.eventName = item.eventName;
      this.userName = item.userdata.firstName + ' ' + item.userdata.lastName;
      this.profilePic = item.userdata.profilepic ? item.userdata.profilepic : 'assets/img/default-user-square.svg';
    }
  }

  initiateSearch() {
    this.searchTerms$.pipe(
      takeUntil(this._unsubscribe),
      startWith(''),
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),
      distinctUntilChanged(),
      // switch to new search observable each time the term changes
      switchMap((term: string) => this.EventService.getEventSearch(this.page, term
      ))
    ).subscribe((success: any) => {
      console.log(success, 'success');
      this.eventList = success.data.results.map(eventData => eventData);
      this.totalCount = success.data.total;
      this.utilityService.resetPage();
    }, error => {
      this.utilityService.routingAccordingToError(error);
    })
  }
  getAllEvents(page) {
    // this.utilityService.loaderStart();
    this.EventService.getEvent(page).subscribe(
      (success: any) => {
        this.eventList = success.data.results.map(eventData => eventData);
        this.totalCount = success.data.total;
        this.utilityService.resetPage();
      },
      error => {
        this.utilityService.routingAccordingToError(error);
        this.utilityService.resetPage();
      }
    );
  }

  getEventSearch(page, searchBar) {
    // this.utilityService.loaderStart();
    this.EventService.getEventSearch(page, searchBar).subscribe(
      (success: any) => {
        this.eventList = success.data.results.map(eventData => eventData);
        this.totalCount = success.data.total;
        this.utilityService.resetPage();
      },
      error => {
        this.utilityService.routingAccordingToError(error);
        this.utilityService.resetPage();
      }
    );
  }

  ActiveDeactiveEvent(item) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to change status?',
      accept: () => {
        this.utilityService.loaderStart();
        this.EventService
          .updateStatus({
            adminstatus: item.adminStatus === 1 ? 0 : 1,
            id: item.id
          })
          .subscribe((success: any) => {
            this.utilityService.successMessage('Event status updated');
            if (!this.searchBar) {
              this.getAllEvents(this.page);
            } else {
              this.getEventSearch(this.page, this.searchBar);
            };
          });
      }
    });
  }

  loadDataLazy(event: LazyLoadEvent) {
    this.utilityService.loaderStart();
    this.page = event.first / 10;
    // if there is a search term present in the search bar, then paginate with the search term
    if (!this.searchBar) {
      this.getAllEvents(this.page);
    } else {
      this.getEventSearch(this.page, this.searchBar);
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
