import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UtilityService } from 'app/shared/utility/utility.service';
import { SystemSettingsService } from '../../../shared/services/systemSetting/system-settings.service';
import { Table } from 'primeng/table';
import { Subject } from 'rxjs';
import { takeUntil, startWith, debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { LazyLoadEvent, ConfirmationService } from 'primeng/api';

interface Action {
  name: string,
  code: string
}

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.scss']
})
export class CountryComponent implements OnInit {

  countriesList: any[];
  page: number = 0;
  categories: any;
  totalCount: number;
  action: string;
  id: number;
  status: string
  countries: any[];

  @ViewChild(Table) tableComponent: Table;
  @ViewChild(Table) primeNGTable: Table;


  // Real time search
  searchTerms$ = new Subject<string>();
  searchBar: any = "";
  private _unsubscribe = new Subject<boolean>();
  countryId: any = null;

  constructor(
    private router: Router,
    private activateRoute: ActivatedRoute,
    private utilityService: UtilityService,
    private systemSettingsService: SystemSettingsService,
    private confirmationService: ConfirmationService,
  ) { }
  setStatus(id: Number, adminStatus: Number) {

    let statusData = { id, adminStatus }

    this.systemSettingsService.updateCountryStatus(statusData).subscribe(
      (success: any) => {

        this.ngOnInit()
      })
  }

  ngOnInit() {
    this.initiateSearch();
  }

  loadDataLazy(event: LazyLoadEvent) {
    this.page = event.first / 10;
    // if there is a search term present in the search bar, then paginate with the search term
    if (!this.searchBar) {
      this.getAllCountries(this.page);
    }
    else {
      this.getAllCountrySearch(this.page, this.searchBar);
    }
  }
  
  initiateSearch() {
    
    this.searchTerms$.pipe(
      takeUntil(this._unsubscribe),
      startWith(''),
      distinctUntilChanged(),
      // switch to new search observable each time the term changes
      switchMap((term: string) => this.systemSettingsService.getAllCountriesSearch(this.page, term
      ))
    )
      .subscribe((success: any) => {
        
        this.countriesList = success.data.results;

        this.totalCount = success.data.total;
        this.utilityService.resetPage();
      })
  }

  getAllCountries(page) {

    this.systemSettingsService.getAllCountries(page).subscribe(
      (success: any) => {
        
        this.countriesList = success.data.results;

        this.totalCount = success.data.total;
      },
      error => {

        this.utilityService.resetPage();
      }
    );
  }

  getAllCountrySearch(page, searchBar) {
    

    this.systemSettingsService.getAllCountriesSearch(page, searchBar)
      .pipe(
        takeUntil(this._unsubscribe)
      )
      .subscribe((success: any) => {
        
        this.countriesList = success.data.results;
        this.totalCount = success.data.total;
        this.utilityService.resetPage();
      })
  }

  filterGlobal(searchTerm) {
    
    // indexing starts from 0 in primeng
    this.primeNGTable.first = 0;
    this.page = 0;
    this.searchTerms$.next(searchTerm);
  }

  onAddcountry() {
    this.router.navigate(['../new-country'], { relativeTo: this.activateRoute })
  }

  getDropDownValue(event, id) {
    if (event.currentTarget.firstChild.data === 'Delete') {

      this.confirmationService.confirm({
        message: 'Are you sure that you want to perform this action?',
        accept: () => {
          this.systemSettingsService.deleteCountry(id).pipe(takeUntil(this._unsubscribe)).subscribe(
            (success: any) => {

              this.getAllCountries(this.page);
              
              this.countriesList = this.countriesList.filter((item: any) => {
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
    if (event.currentTarget.firstChild.data === 'Edit') {
      this.router.navigate(['../edit-country', id], { relativeTo: this.activateRoute })

    }
  }

}
