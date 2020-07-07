import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UtilityService } from 'app/shared/utility/utility.service'; 
import { SellerService } from '../../../shared/services/seller.service';
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
  @ViewChild(Table) tableComponent: Table;
  @ViewChild(Table) primeNGTable: Table;
  constructor(
    private router:Router, 
    private activateRoute : ActivatedRoute,
    private utilityService:UtilityService,
    private sellerService:SellerService,
    private confirmationService: ConfirmationService,
    private excelService:ExcelServiceService,
  ) { }

  ngOnInit() {
  }
  loadDataLazy(event)
  {
console.log(event);
  }
}
