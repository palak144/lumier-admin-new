import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UtilityService } from 'app/shared/utility/utility.service'; 
import { SystemSettingsService } from '../../../shared/services/systemSettings.service';
import { Table } from 'primeng/table';
import { Subject } from 'rxjs';
import { takeUntil, startWith, debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { LazyLoadEvent, ConfirmationService } from 'primeng/api';
import { ExcelServiceService } from 'app/shared/services/excel-service.service';

interface Action {
  name:string, 
  code:string
} 

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.scss']
})
export class CountryComponent implements OnInit {

  countriesList:any[];
  actions:Action[];
  actionListFromAPI:string[];
  page:number = 0;
  categories:any;
  totalCount: number;
  action:string;
  id: number;
  status:string
  countries:any[];

  @ViewChild(Table) tableComponent: Table;
  @ViewChild(Table) primeNGTable: Table;

    
   // Real time search
   searchTerms$ = new Subject<string>();
   searchBar: any = "";
   private _unsubscribe = new Subject<boolean>();
  exportAll: string = "false";
  //  countryId: any = null ;

   constructor(
    private router:Router, 
    private activateRoute : ActivatedRoute,
    private utilityService:UtilityService,
    private systemSettingsService:SystemSettingsService,
    private confirmationService: ConfirmationService,
    private excelService:ExcelServiceService,
    ) {}
    setStatus(id:Number,adminStatus:Number){

      let statusData = {id,adminStatus}
      
   this.systemSettingsService.updateCountryStatus(statusData).subscribe(
     (success:any)=>
     {
     
      this.ngOnInit()
} )
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
        switchMap((term: string) => this.systemSettingsService.getAllCountriesSearch(this.page, term ,this.exportAll
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
  
    getAllCountrySearch(page, searchBar , exportAll) {
    
      
      this.systemSettingsService.getAllCountriesSearch(page, searchBar , exportAll )
        .pipe(
          takeUntil(this._unsubscribe)
        )
        // .subscribe((success: any) => {
        //   this.countryList = success.data.results;
        //   this.totalCount = success.data.total;
        //   this.utilityService.resetPage();
        //   if(exportAll == "true"){
     
        //     this.excelService.exportAsExcelFile(this.countryList, 'Seller List')
        //     this.exportAll = "false"L
        //   }
        // })
    }

    filterGlobal(searchTerm) {
      // indexing starts from 0 in primeng
      this.primeNGTable.first = 0;
      this.page = 0;
      this.searchTerms$.next(searchTerm);
    }

  onAddcountry(){
    this.router.navigate(['../new-country'],{relativeTo : this.activateRoute})
  }

  getCountry()
  {
    this.systemSettingsService.getCountry().pipe(takeUntil(this._unsubscribe)).subscribe(
      (success:any) => {
        this.countries = success.data.result;
       
    
       
  
      },
      error => {
      }
    )
    this.getAllCountrySearch(this.page, this.searchBar , this.exportAll);
  }

}
