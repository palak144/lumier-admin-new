import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UtilityService } from 'app/shared/utility/utility.service';
import { DeliveryChargeService } from '../../../shared/services/delivery-charge.service';
import { Table } from 'primeng/table';
import { Subject } from 'rxjs';
import { takeUntil, startWith, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { LazyLoadEvent, ConfirmationService } from 'primeng/api';
import { CommonServiceService } from 'app/shared/services/common-service.service';

interface Action {
  name: string, 
  code: string
}

@Component({ 
  selector: 'app-delivery-charge',
  templateUrl: './delivery-charge.component.html',
  styleUrls: ['./delivery-charge.component.scss']
})
export class DeliveryChargeComponent implements OnInit {
  searchTerms$ = new Subject<string>();
  searchBar: any = "";
  private _unsubscribe = new Subject<boolean>();
  page: number = 0;
  deliverychargeList: any[];
  deliverycharge: any;
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
    private deliveryChargeService: DeliveryChargeService,
    private confirmationService: ConfirmationService,
    private commonService:CommonServiceService,
  ) { }

  setStatus(id: Number, adminStatus: Number) {

    let statusData = { id, adminStatus }
    
    this.deliveryChargeService.updateDeliveryChargeStatus(statusData).subscribe(
      
      (success: any) => {
       
        this.ngOnInit() 
      }) 
  }

  ngOnInit() {
    this.initiateSearch();
    this.getCountry();
  }

  initiateSearch() {
    this.searchTerms$.pipe(
    takeUntil(this._unsubscribe),
    startWith(''),
    distinctUntilChanged(),
    // switch to new search observable each time the term changes
    switchMap((term: string) => this.deliveryChargeService.getAllDeliveryChargeSearch(this.page, term , this.countryId
    ))
  )
    .subscribe((success: any) => {

      this.deliverychargeList = success.data.results;
      
      this.totalCount = success.data.total;
      this.utilityService.resetPage();
    })
}
  onAddDeliverycharge(){
    this.router.navigate(['../new-delivery-charge'],{relativeTo : this.activateRoute})
  }


  loadDataLazy(event: LazyLoadEvent) {
    this.page = event.first / 10;
    // if there is a search term present in the search bar, then paginate with the search term
    if (!this.searchBar && !this.countryId) {
      this.getAllDeliveryCharge(this.page);
    }
    else if(!this.countryId){
      this.getAllDeliveryCharge(this.page);
          }
    else {
      this.getAllDeliveryChargeSearch(this.page, this.searchBar , this.countryId);
    }
  } 
  
  filterGlobal(searchTerm) {
    // indexing starts from 0 in primeng
    this.primeNGTable.first = 0;
    this.page = 0;
    this.searchTerms$.next(searchTerm);
  }

getAllDeliveryCharge(page) {
  this.deliveryChargeService.getAllDeliveryCharge(page).subscribe(

    (success: any) => {
      this.deliverychargeList = success.data.results;

      this.totalCount = success.data.total;

    },
                                                      
    error => {

      this.utilityService.resetPage();
    }
  );
}

getAllDeliveryChargeSearch(page, searchBar, countryId) {
  this.deliveryChargeService.getAllDeliveryChargeSearch(page, searchBar, countryId)
    .pipe(
      takeUntil(this._unsubscribe)
    )
    .subscribe((success: any) => {
      console.log(success);
      this.deliverychargeList = success.data.results;
      this.totalCount = success.data.total;
      this.utilityService.resetPage();
    })
}

getDropDownValue(event, id) {
  if (event.currentTarget.firstChild.data === 'Delete') {

    this.confirmationService.confirm({
      message: 'Are you sure that you want to perform this action?',
      accept: () => {
        this.deliveryChargeService.deleteDeliveryCharge(id).pipe(takeUntil(this._unsubscribe)).subscribe(
          (success: any) => {

            this.getAllDeliveryCharge(this.page);

            // this.deliverychargeList = this.deliverychargeList.filter((item: any) => {
            //   return id !== item.countryId
            // })
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
    this.router.navigate(['../edit-delivery-charge', id], { relativeTo: this.activateRoute })
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
  this.getAllDeliveryChargeSearch(this.page, this.searchBar , this.countryId);
  }
}
