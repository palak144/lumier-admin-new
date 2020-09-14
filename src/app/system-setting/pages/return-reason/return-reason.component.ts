import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UtilityService } from '../../../shared/utility/utility.service';
import { ReturnReasonService } from '../../../shared/services/systemSetting/return-reason.service';
import { Table } from 'primeng/table';
import { Subject } from 'rxjs';
import { takeUntil, startWith, debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { LazyLoadEvent, ConfirmationService } from 'primeng/api';


interface Action { 
  name: string, 
  code: string
}

@Component({
  selector: 'app-return-reason',
  templateUrl: './return-reason.component.html',
  styleUrls: ['./return-reason.component.scss']
})
export class ReturnReasonComponent implements OnInit {
  searchTerms$ = new Subject<string>();
  searchBar: any = "";
  private _unsubscribe = new Subject<boolean>();
  page: number;
  returnList: any;
  totalCount: any;
  action: any;
  @ViewChild(Table) tableComponent: Table; 
  @ViewChild(Table) primeNGTable: Table;
  

  constructor( 
    private router: Router, 
    private activateRoute : ActivatedRoute,
    private utilityService: UtilityService,
    private returnReasonService: ReturnReasonService,
    private confirmationService: ConfirmationService,
  ) { }

  // setStatus(id: Number, adminStatus: Number) {
  //   let statusData = { id, adminStatus }
  //   this.returnReasonService.updateReturnStatus(statusData).subscribe(
  //     (success: any) => {
  //       this.ngOnInit()
  //     })
  // }
  ngOnInit() {
    this.initiateSearch();
    // this.getCountry();
  }
  onAddReturn(){
    this.router.navigate(['../new-return-reason'],{relativeTo : this.activateRoute})
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
      this.getAllReturn(this.page);
    }
    else {
      this.getAllReturnSearch(this.page, this.searchBar);
    }
  }
  initiateSearch() {
    this.searchTerms$.pipe(
    takeUntil(this._unsubscribe),
    startWith(''),
    distinctUntilChanged(),
    // switch to new search observable each time the term changes
    switchMap((term: string) => this.returnReasonService.getAllReturnSearch(this.page, term
    ))
  )
    .subscribe((success: any) => {
      
      this.returnList = success.data.results;

      this.totalCount = success.data.total;
      this.utilityService.resetPage();
    })
}
getAllReturn(page) {
  this.returnReasonService.getAllReturn(page).subscribe(
    (success: any) => {
      this.returnList = success.data.results;

      this.totalCount = success.data.total;
    },
    error => {

      this.utilityService.resetPage();
    }
  );
}

getAllReturnSearch(page, searchBar) {
  
  this.returnReasonService.getAllReturnSearch(page, searchBar)
    .pipe(
      takeUntil(this._unsubscribe)
    )
    .subscribe((success: any) => {
      console.log(success);
      this.returnList = success.data.results;
      this.totalCount = success.data.total;
      this.utilityService.resetPage();
    })
}

getDropDownValue(event, id) {


  this.confirmationService.confirm({
    message: 'Are you sure that you want to perform this action?',
    accept: () => {
      this.returnReasonService.deleteReturn(id).pipe(takeUntil(this._unsubscribe)).subscribe(
        (success: any) => {

          this.getAllReturn(this.page);
          
          this.returnList = this.returnList.filter((item: any) => {
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
