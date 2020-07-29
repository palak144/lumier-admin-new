import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UtilityService } from 'app/shared/utility/utility.service';
import { ReturnReasonService } from '../../../shared/services/return-reason.service';
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
  countriesList: any[];
  page: number = 0;
  totalCount: number;
  action: string;
  id: number;
  status: string;
  countries: any[];

  // @ViewChild(Table) tableComponent: Table;
  // @ViewChild(Table) primeNGTable: Table;

  // Real time search
  searchTerms$ = new Subject<string>();
  searchBar: any = "";
  private _unsubscribe = new Subject<boolean>();
  countryId: any = null;
  

  constructor( 
    private router: Router, 
    private route : ActivatedRoute,
    private utilityService: UtilityService,
    private returnReasonService: ReturnReasonService,
    private confirmationService: ConfirmationService,
  ) { }

  onAddReturn(){
    
    this.router.navigate(['../new-return-reason'],{relativeTo : this.route})
  }

  ngOnInit() {
  }

}
