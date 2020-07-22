import { Component, OnInit, ViewChild } from '@angular/core';
import { Table } from 'primeng/table';
import { Subject } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { UtilityService } from 'app/shared/utility/utility.service';
import { SellerService } from 'app/shared/services/seller.service';
import { ConfirmationService, LazyLoadEvent } from 'primeng/api';
import { ExcelServiceService } from 'app/shared/services/excel-service.service';
import { takeUntil, startWith, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { ManufactureService } from 'app/shared/services/manufacture.service';
import { CommonServiceService } from 'app/shared/services/common-service.service';

interface Action {
  name: string,
  code: string
}

@Component({
  selector: 'app-manufacturing-brand',
  templateUrl: './manufacturing-brand.component.html',
  styleUrls: ['./manufacturing-brand.component.scss']
})
export class ManufacturingBrandComponent implements OnInit {


  brandList: any[];
  actions: Action[];
  page: number = 0;
  brand: any;
  totalCount: number;
  action: string;
  id: number;
  Date = new Date();
  status: string
  countries: any[];

  @ViewChild(Table) tableComponent: Table;
  @ViewChild(Table) primeNGTable: Table;

  // Real time search
  searchTerms$ = new Subject<string>();
  searchBar: any = "";
  private _unsubscribe = new Subject<boolean>();
  exportAll = "false";
  countryId: number = null;


  constructor(
    private router: Router,
    private activateRoute: ActivatedRoute,
    private utilityService: UtilityService,
    private manufactureService: ManufactureService,
    private confirmationService: ConfirmationService,
    private excelService: ExcelServiceService,
    private commonService: CommonServiceService
  ) { }
  setStatus(id: Number, adminStatus: Number) {

    let statusData = { id, adminStatus }

    this.manufactureService.updateBrandStatus(statusData).subscribe(
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
      switchMap((term: string) => this.manufactureService.getAllBrandsSearch(this.page, term, this.exportAll, this.countryId
      ))
    ).subscribe((success: any) => {
      debugger
      this.brandList = success.data.results;
      this.totalCount = success.data.total;
      this.utilityService.resetPage();
    })
  }

  getAllBrands(page) {
    this.manufactureService.getAllBrands(page).subscribe(
      (success: any) => {

        this.brandList = success.data.results;
        this.totalCount = success.data.total;
      },
      error => {

        this.utilityService.resetPage();
      }
    );
  }

  getAllBrandsSearch(page, searchBar, exportAll, countryId) {


    this.manufactureService.getAllBrandsSearch(page, searchBar, exportAll, countryId)
      .pipe(
        takeUntil(this._unsubscribe)
      )
      .subscribe((success: any) => {

        this.brandList = success.data.results;
        this.totalCount = success.data.total;
        this.utilityService.resetPage();
        if (exportAll == "true") {

          this.excelService.exportAsExcelFile(this.brandList, 'Seller List')
          this.exportAll = "false"
        }
      })
  }

  loadDataLazy(event: LazyLoadEvent) {

    this.page = event.first / 10;
   
    if (!this.searchBar && !this.countryId) {

      this.getAllBrands(this.page);

    }
    else if (!this.countryId) {

      this.getAllBrands(this.page);

    }
    else {

      this.getAllBrandsSearch(this.page, this.searchBar, this.exportAll, this.countryId);
    }
  }
  filterGlobal(searchTerm) {
    // indexing starts from 0 in primeng
    this.primeNGTable.first = 0;
    this.page = 0;
    this.searchTerms$.next(searchTerm);
  }

  onAddBrand() {
    this.router.navigate(['../new'], { relativeTo: this.activateRoute })
  }

  getDropDownValue1(event, id) {

    if (event.currentTarget.firstChild.data === 'Delete') {

      this.confirmationService.confirm({
        message: 'Are you sure that you want to perform this action?',
        accept: () => {
          this.manufactureService.deleteBrand(id).pipe(takeUntil(this._unsubscribe)).subscribe(
            (success: any) => {
              this.getAllBrands(this.page);
              // this.customerList = this.customerList.filter((item: any) => {
              //   return id !== item.customerId
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
      this.router.navigate(['../edit', id], { relativeTo: this.activateRoute })

    }
  }

  exportAsXLSX(id: number) {

    if (id == 0) {

      this.excelService.exportAsExcelFile(this.brandList, 'Brand List')
    }
    else {

      this.exportAll = "true"
      this.getAllBrandsSearch(this.page, this.searchBar, this.exportAll, this.countryId);
    }
  }
  getCountry() {
    this.commonService.getCountry().pipe(takeUntil(this._unsubscribe)).subscribe(
      (success: any) => {
        this.countries = success.data;
      },
      error => {
      }
    )
  }
  onChange(deviceValue) {
    if (deviceValue) {
      this.countryId = deviceValue;
    }
    else {
    }

    this.getAllBrandsSearch(this.page, this.searchBar, this.exportAll, this.countryId);
  }
}
