import { Component, OnInit } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Router, ActivatedRoute } from '@angular/router';
import { UtilityService } from 'app/shared/utility/utility.service'; 
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
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {

  categoriesList:any[];
  actions:Action[];
  actionListFromAPI:string[];
  page:number = 0;
  categories:any;
  totalCount: number;
  action:string;
  id: number;
  status:string
  countries:any[];


  
   // Real time search
   searchTerms$ = new Subject<string>();
   searchBar: any = "";
   private _unsubscribe = new Subject<boolean>();
  exportAll: string = "false";
   countryId: any = null ;

   constructor(
    private router:Router, 
    private activateRoute : ActivatedRoute,
    private utilityService:UtilityService,
    // private catalogueService:CatalogueService,
    private confirmationService: ConfirmationService,
    private excelService:ExcelServiceService,
    ) {}
    setStatus(id:Number,adminStatus:Number){

      let statusData = {id,adminStatus}
      
//    this.sellerService.updateSellerStatus(statusData).subscribe(
//      (success:any)=>
//      {
     
//       this.ngOnInit()
// } )
    }

  ngOnInit() {
  }

  onAddCategories(){
    this.router.navigate(['../new-category'],{relativeTo : this.activateRoute})
  }
  
}
