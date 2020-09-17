import { Component, OnInit ,ViewChild} from '@angular/core';
import { Validators, FormControl, FormBuilder, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {NgbTabsetConfig} from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { UtilityService } from '../../../shared/utility/utility.service'; 
import { CategoryService } from '../../../shared/services/catalogue/category.service';
import { ProductService } from '../../../shared/services/catalogue/product.service';
import { Table } from 'primeng/table';
import { Subject } from 'rxjs';
import { takeUntil, startWith, debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { LazyLoadEvent, ConfirmationService } from 'primeng/api';
import { ExcelServiceService } from '../../../shared/services/excel-service.service';
import { CommonServiceService } from '../../../shared/services/common-service.service';
import { trigger,state,style,transition,animate } from '@angular/animations';
import { NgbModal, ModalDismissReasons, NgbAccordionConfig } from '@ng-bootstrap/ng-bootstrap';
interface Country {
  _id:string, 
  country:string
}
interface seller {
  _id:string, 
  seller:string
}
@Component({
  selector: 'app-quotation',
  templateUrl: './quotation.component.html',
  styleUrls: ['./quotation.component.scss'],
  animations: [
    trigger('rowExpansionTrigger', [
        state('void', style({
            transform: 'translateX(-10%)',
            opacity: 0
        })),
        state('active', style({
            transform: 'translateX(0)',
            opacity: 1
        })),
        transition('* <=> *', animate('400ms cubic-bezier(0.86, 0, 0.07, 1)'))
    ])
],
providers: [NgbTabsetConfig,NgbAccordionConfig]
})
export class QuotationComponent implements OnInit {
  searchTerms$ = new Subject<string>();
  searchBar: any = "";
  private _unsubscribe = new Subject<boolean>();
  page:number = 0;
  @ViewChild(Table) tableComponent: Table;
  @ViewChild(Table) primeNGTable: Table;
  constructor(config: NgbTabsetConfig, private router:Router, 
    private activateRoute : ActivatedRoute,
    private utilityService:UtilityService,
    private categoryService:CategoryService,
    private ProductService:ProductService,
    private modalService: NgbModal,
    private toastr: ToastrService,
    private confirmationService: ConfirmationService,
    private commonService : CommonServiceService,
    private excelService:ExcelServiceService,) {
    // customize default values of tabsets used by this component tree
    // config.justify = 'center';
    config.type = 'pills';  }

  ngOnInit() {
  }
  loadDataLazy(event: LazyLoadEvent) {
    this.page = event.first / 10;
  }
  onChange(deviceValue) {
    console.log(deviceValue);
  }
  filterGlobal(searchTerm) {
    console.log(searchTerm);
       this.primeNGTable.first = 0;
       this.page = 0; 
       this.searchTerms$.next(searchTerm);

     }
}
