import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { takeUntil, startWith, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Table } from 'primeng/table';
import { UtilityService } from 'app/shared/utility/utility.service';
import { BannerService } from 'app/shared/services/website-element/banner.service';
import { ConfirmationService, LazyLoadEvent } from 'primeng/api';

@Component({
  selector: 'app-banners',
  templateUrl: './banners.component.html',
  styleUrls: ['./banners.component.scss']
})
export class BannersComponent implements OnInit {
  searchTerms$ = new Subject<string>();
  searchBar: any = "";
  private _unsubscribe = new Subject<boolean>();
  page: number;
  bannerList: any;
  totalCount: any;
  action: any;
  Date = new Date();
  @ViewChild(Table) tableComponent: Table; 
  @ViewChild(Table) primeNGTable: Table;
  

  constructor( 
    private router: Router, 
    private activateRoute : ActivatedRoute,
    private utilityService: UtilityService,
    private bannerService: BannerService,
    private confirmationService: ConfirmationService,
  ) { }

  setStatus(id: Number, adminStatus: Number) {
    let statusData = { id, adminStatus }
    this.bannerService.updateBannerStatus(statusData).subscribe(
      (success: any) => {
        this.ngOnInit()
      })
  }
  ngOnInit() {
    this.initiateSearch();
  }
  onAddBanner(){
    this.router.navigate(['../new-banner'],{relativeTo : this.activateRoute})
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
      this.getAllBanners(this.page);
    }
    else {
      this.getAllBannersSearch(this.page, this.searchBar);
    }
  }
  initiateSearch() {
    this.searchTerms$.pipe(
    takeUntil(this._unsubscribe),
    startWith(''),
    distinctUntilChanged(),
    // switch to new search observable each time the term changes
    switchMap((term: string) => this.bannerService.getAllBannersSearch(this.page, term
    ))
  )
    .subscribe((success: any) => {
      this.bannerList = success.data.results;

      this.totalCount = success.data.total;
      this.utilityService.resetPage();
    })
}
getAllBanners(page) {
  this.bannerService.getAllBanners(page).subscribe(
    (success: any) => {
      
      this.bannerList = success.data.results;

      this.totalCount = success.data.total;
    },
    error => {

      this.utilityService.resetPage();
    }
  );
}

getAllBannersSearch(page, searchBar) {
  
  this.bannerService.getAllBannersSearch(page, searchBar)
    .pipe(
      takeUntil(this._unsubscribe)
    )
    .subscribe((success: any) => {
      
      this.bannerList = success.data.results;
      this.totalCount = success.data.total;
      this.utilityService.resetPage();
    })
}

getDropDownValue(event, id) {
  if (event.currentTarget.firstChild.data === 'Delete') {

    this.confirmationService.confirm({
      message: 'Are you sure that you want to perform this action?',
      accept: () => {
        this.bannerService.deleteBanner(id).pipe(takeUntil(this._unsubscribe)).subscribe(
          (success: any) => {

            this.getAllBanners(this.page);
            
            this.bannerList = this.bannerList.filter((item: any) => {
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
     this.router.navigate(['../edit-banner', id], { relativeTo: this.activateRoute })

   }
}

}
