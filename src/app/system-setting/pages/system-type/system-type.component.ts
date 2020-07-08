import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UtilityService } from 'app/shared/utility/utility.service'; 
import { SystemSettingsService } from '../../../shared/services/system-settings.service';
import { Table } from 'primeng/table';
import { Subject } from 'rxjs';
import { takeUntil, startWith, debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { LazyLoadEvent, ConfirmationService } from 'primeng/api';
import { ExcelServiceService } from 'app/shared/services/excel-service.service';

@Component({
  selector: 'app-system-type',
  templateUrl: './system-type.component.html',
  styleUrls: ['./system-type.component.scss']
})
export class SystemTypeComponent implements OnInit {
  
  
  page:number = 0;
  @ViewChild(Table) tableComponent: Table;
  @ViewChild(Table) primeNGTable: Table;
  supplyList:any[];
  totalCount: any;
  constructor(
    private router:Router, 
    private activateRoute : ActivatedRoute,
    private utilityService:UtilityService,
    private SupplyTypeService:SupplyTypeService,
    private confirmationService: ConfirmationService,
    private excelService:ExcelServiceService,
  ) { }

  ngOnInit() {
  }
  loadDataLazy(event)
  {
console.log(event);
 this.page = event.first / 10;
 this.getAllSupplyType(this.page );
  }
  getAllSupplyType(page) {
    this.SupplyTypeService.getAllSupplyType(page).subscribe(
      (success: any) => {
        console.log(success);
        this.supplyList = success.data.results;
        this.totalCount = success.data.total;
      },
      error => {
      
        this.utilityService.resetPage();
      }
    );
  }
}
