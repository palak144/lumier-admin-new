import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UtilityService } from 'app/shared/utility/utility.service';
import { SystemSettingsService } from '../../../shared/services/systemSetting/system-settings.service';
import { Table } from 'primeng/table';
import { Subject } from 'rxjs';
import { takeUntil, startWith, debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { LazyLoadEvent, ConfirmationService } from 'primeng/api';
import { CancelReasonService } from '../../../shared/services/systemSetting/cancel-reason.service';
@Component({
  selector: 'app-cancelreason',
  templateUrl: './cancelreason.component.html',
  styleUrls: ['./cancelreason.component.scss']
})
export class CancelreasonComponent implements OnInit {
  @ViewChild(Table) tableComponent: Table;
  @ViewChild(Table) primeNGTable: Table;
  searchTerms$ = new Subject<string>();
  searchBar: any = "";
  private _unsubscribe = new Subject<boolean>();
  page:number = 0;
  cancelList: any;
  totalCount: any;
  action: any;
  constructor(
    private router: Router,
    private activateRoute: ActivatedRoute,
    private utilityService: UtilityService,
    private systemSettingsService: SystemSettingsService,
    private confirmationService: ConfirmationService,
    private CancelReasonService: CancelReasonService,
  ) { }
  setStatus(id: Number, adminStatus: Number) {

    let statusData = { id, adminStatus }

    this.CancelReasonService.updateCancelStatus(statusData).subscribe(
      (success: any) => {

        this.ngOnInit()
      })
  }
  ngOnInit() {
    this.initiateSearch();
  }
  onAddcancel() {
    this.router.navigate(['../new-cancel'], { relativeTo: this.activateRoute })
  }
  filterGlobal(searchTerm) {
    // indexing starts from 0 in primeng
    this.primeNGTable.first = 0;
    this.page = 0;
    this.searchTerms$.next(searchTerm);
  }
  loadDataLazy(event: LazyLoadEvent) {
    this.page = event.first / 10;
    // if there is a search term present in the search bar, then paginate with the search term
    if (!this.searchBar) {
      this.getAllCancel(this.page);
    }
    else {
      this.getAllCancelSearch(this.page, this.searchBar);
    }
  }
  initiateSearch() {
      this.searchTerms$.pipe(
      takeUntil(this._unsubscribe),
      startWith(''),
      distinctUntilChanged(),
      // switch to new search observable each time the term changes
      switchMap((term: string) => this.CancelReasonService.getAllCancelSearch(this.page, term
      ))
    )
      .subscribe((success: any) => {
        
        this.cancelList = success.data.results;

        this.totalCount = success.data.total;
        this.utilityService.resetPage();
      })
  }
  getAllCancel(page) {

    this.CancelReasonService.getAllCancel(page).subscribe(
      (success: any) => {
        this.cancelList = success.data.results;

        this.totalCount = success.data.total;
      },
      error => {

        this.utilityService.resetPage();
      }
    );
  }
  getAllCancelSearch(page, searchBar) {
    

    this.CancelReasonService.getAllCancelSearch(page, searchBar)
      .pipe(
        takeUntil(this._unsubscribe)
      )
      .subscribe((success: any) => {
        this.cancelList = success.data.results;
        this.totalCount = success.data.total;
        this.utilityService.resetPage();
      })
  }

  getDropDownValue(event, id) {


      this.confirmationService.confirm({
        message: 'Are you sure that you want to perform this action?',
        accept: () => {
          this.systemSettingsService.deleteCancel(id).pipe(takeUntil(this._unsubscribe)).subscribe(
            (success: any) => {

              this.getAllCancel(this.page);
              
              this.cancelList = this.cancelList.filter((item: any) => {
                return id !== item.countryId
              })
            },
            error => {
            }
          )
        },
        reject: () => {
          this.action = null;
        }
      });

 
   
  }
}
