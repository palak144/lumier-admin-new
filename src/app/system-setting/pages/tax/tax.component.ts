import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UtilityService } from 'app/shared/utility/utility.service';
import { TaxService } from '../../../shared/services/systemSetting/tax.service';
import { Table } from 'primeng/table';
import { Subject } from 'rxjs';
import { takeUntil, startWith, debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { LazyLoadEvent, ConfirmationService } from 'primeng/api';
import { CommonServiceService } from 'app/shared/services/common-service.service';

interface Action { 
  name: string, 
  code: string
}

@Component({
  selector: 'app-tax',
  templateUrl: './tax.component.html',
  styleUrls: ['./tax.component.scss']
})
export class TaxComponent implements OnInit {
  searchTerms$ = new Subject<string>();
  searchBar: any = "";
  private _unsubscribe = new Subject<boolean>();
  page: number;
  taxList: any; 
  totalCount: any;
  action: any;
  id: number;
  countries:any[];
  countryId : number = null;
  @ViewChild(Table) tableComponent: Table; 
  @ViewChild(Table) primeNGTable: Table;


  constructor(
    private router: Router, 
    private activateRoute : ActivatedRoute,
    private utilityService: UtilityService,
    private taxService: TaxService,
    private confirmationService: ConfirmationService,
    private commonService:CommonServiceService,
  ) { }

  setStatus(id: Number, adminStatus: Number) {
    let statusData = { id, adminStatus }
    this.taxService.updateTaxStatus(statusData).subscribe(
      (success: any) => {
        this.ngOnInit()
      })
  }

  ngOnInit() {
    this.initiateSearch();
    this.getCountry();
  }

  onAddTax(){
    this.router.navigate(['../new-tax'],{relativeTo : this.activateRoute})
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
    if (!this.searchBar && !this.countryId) {
      this.getAllTax(this.page);
    }
    else if(!this.countryId){
      this.getAllTax(this.page);
          }
    else {
      this.getAllTaxSearch(this.page, this.searchBar , this.countryId);
    }
  }

  initiateSearch() {
    this.searchTerms$.pipe(
    takeUntil(this._unsubscribe),
    startWith(''),
    distinctUntilChanged(),
    // switch to new search observable each time the term changes
    switchMap((term: string) => this.taxService.getAllTaxSearch(this.page, term , this.countryId
    ))
  )
    .subscribe((success: any) => {
      
      this.taxList = success.data.results;

      this.totalCount = success.data.total;
      this.utilityService.resetPage();
    })
}

getAllTax(page) {
  this.taxService.getAllTax(page).subscribe(
    (success: any) => {
      this.taxList = success.data.results;

      this.totalCount = success.data.total;
    },
    error => {

      this.utilityService.resetPage();
    }
  );
}

getAllTaxSearch(page, searchBar, countryId) {
  
  this.taxService.getAllTaxSearch(page, searchBar, countryId)
    .pipe(
      takeUntil(this._unsubscribe)
    )
    .subscribe((success: any) => {
      console.log(success);
      this.taxList = success.data.results;
      this.totalCount = success.data.total;
      this.utilityService.resetPage();
    })
}

getDropDownValue(event, id) {
  if (event.currentTarget.firstChild.data === 'Delete') {

    this.confirmationService.confirm({
      message: 'Are you sure that you want to perform this action?',
      accept: () => {
        this.taxService.deleteTax(id).pipe(takeUntil(this._unsubscribe)).subscribe(
          (success: any) => {

            this.getAllTax(this.page);
            
            this.taxList = this.taxList.filter((item: any) => {
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
    this.router.navigate(['../edit-tax', id], { relativeTo: this.activateRoute })

  }
}

getCountry()
 {
   this.commonService.getCountry().pipe(takeUntil(this._unsubscribe)).subscribe(
     (success:any) => {
       this.countries = success.data;
     },
     error => {
     }
   )
 }
 
onChange(deviceValue) {
  if(deviceValue)
  { 
    this.countryId=deviceValue;
  }
  else  {
  }
  this.getAllTaxSearch(this.page, this.searchBar , this.countryId);
  }

}
