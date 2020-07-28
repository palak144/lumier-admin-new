import { Component, OnInit, ViewChild , Inject,LOCALE_ID} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Table } from 'primeng/table';
import { Subject } from 'rxjs';
import { takeUntil, startWith, debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { CustomerService } from '../../../shared/services/customer.service';
import { UtilityService } from '../../../shared/utility/utility.service';
import { ExcelServiceService } from 'app/shared/services/excel-service.service';
import { ToastrService } from 'ngx-toastr';
import { LazyLoadEvent, ConfirmationService } from 'primeng/api';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-customer-group',
  templateUrl: './customer-group.component.html',
  styleUrls: ['./customer-group.component.scss']
})
export class CustomerGroupComponent implements OnInit {


  customerList: any[];
  totalCount: number;
  page: number = 0;
  searchKey: string;
  searchValue: string;
  action: string;
  Date = new Date();
  selectLang: string = "English";

  @ViewChild(Table) tableComponent: Table;
  @ViewChild(Table) primeNGTable: Table;

  // Real time search
  searchTerms$ = new Subject<string>();
  searchBar: any = "";
  private _unsubscribe = new Subject<boolean>();
  exportAll: string = "false";
  closeResult: string;
  groups: any;
  exportAllData: any;
  exportData: any;
  customerListExport: any[];

  constructor(
    @Inject(LOCALE_ID) private locale: string,
    private router: Router,
    private route: ActivatedRoute,
    private customerService: CustomerService,
    private utilityService: UtilityService,
    private excelService: ExcelServiceService,
    private toastr: ToastrService,
    private modalService: NgbModal,
    private confirmationService: ConfirmationService
  ) { }

  ngOnInit() {
    this.exportData = [];
    this.exportAllData = [];
    this.initiateSearch();
  }


  initiateSearch() {
    this.searchTerms$.pipe(
      takeUntil(this._unsubscribe),
      startWith(''),
      distinctUntilChanged(),
      // switch to new search observable each time the term changes
      switchMap((term: string) => this.customerService.getCustomerGroupParams(this.page, term
      ))
    ).subscribe((success: any) => {
      this.customerList = success.data.results;

      this.totalCount = success.data.total;
      this.utilityService.resetPage();
    }, error => {
      this.toastr.error(error.message)
      this.utilityService.routingAccordingToError(error);
    })
  }


  getAllCustomers(page) {
    this.customerService.getCustomerGroup(page).subscribe(
      (success: any) => {
        this.customerList = success.data.results;
        this.totalCount = success.data.total;
        
      },
      error => {
        this.toastr.error(error.message)
        this.utilityService.routingAccordingToError(error);
        this.utilityService.resetPage();
      }
    );
  }

  getAllCustomersSearch(page, searchBar, exportAll) {
    this.customerService.getCustomerGroupParams(page, searchBar, exportAll)
      .pipe(
        takeUntil(this._unsubscribe)
      )
      .subscribe((success: any) => {
        

        if(exportAll == "true"){
          this.customerListExport = [];
          this.customerListExport = success.data.results;
          this.customerListExport.forEach(element=>{
              this.exportAllData.push({
                Group_Name : element.groupName,
                Group_Email : element.groupEmail,
                Customer_Group_Id : element.id,
                Registration_Date : formatDate(element.created_at,'yyyy-MM-dd',this.locale),
                Admin_Status : element.adminStatus,
                isDelete : element.isDelete,
                Updated_at : formatDate(element.updated_at,'yyyy-MM-dd',this.locale),
              })
          })
          
          this.exportAll = "false"  
          this.excelService.exportAsExcelFile(this.exportAllData, 'Customer-Group List')
          this.exportAllData= [];
        }
        else{
          this.customerList = success.data.results;
        this.totalCount = success.data.total;
        this.utilityService.resetPage();
        }
      }, error => {
        this.toastr.error(error.message)
        this.utilityService.routingAccordingToError(error);
      })
  }

  filterGlobal(searchTerm) {
    // indexing starts from 0 in primeng
    this.primeNGTable.first = 0;
    this.page = 0;
    this.searchTerms$.next(searchTerm);
  }


  loadDataLazy(event: LazyLoadEvent) {
    this.utilityService.loaderStart();
    this.page = event.first / 10;
    // if there is a search term present in the search bar, then paginate with the search term
    if (!this.searchBar) {
      this.getAllCustomers(this.page);
      this.utilityService.loaderStop();

    } else {
      this.getAllCustomersSearch(this.page, this.searchBar, this.exportAll);
      this.utilityService.loaderStop();

    }
  }


  onAddCustomerGroup() {
    this.router.navigate(['../newGroup'], { relativeTo: this.route })
  }

  getDropDownValue1(event, id) {
    if (event.currentTarget.firstChild.data === 'Delete') {

      this.confirmationService.confirm({
        message: 'Are you sure that you want to perform this action?',
        accept: () => {
          this.customerService.deleteCustomerGroup(id).pipe(takeUntil(this._unsubscribe)).subscribe(
            (success: any) => {
              this.getAllCustomers(this.page);
              // this.initiateSearch();
            },
            error => {
              this.toastr.error(error.message)
            }
          )
        },
        reject: () => {
          this.action = null;
        }

      });

    }
    if (event.currentTarget.firstChild.data === 'Edit') {

      this.router.navigate(['../', 'editGroup', id], { relativeTo: this.route })

    }
  }

  exportAsXLSX(id: number) {

    if (id == 0) {

      this.customerList.forEach(element=>{
          this.exportData.push({
            Group_Name: element.groupName,
            Group_Email : element.groupEmail,
            Customer_Group_Id : element.id,
            Registration_Date : formatDate(element.created_at,'yyyy-MM-dd',this.locale),
            Admin_Status : element.adminStatus,
            isDelete : element.isDelete,
            Updated_at : formatDate(element.updated_at,'yyyy-MM-dd',this.locale),
          })
      })
      
      this.excelService.exportAsExcelFile(this.exportData, 'Customer-Group List')
      this.exportData= [];
        }
    else {

      this.exportAll = "true"
      this.getAllCustomersSearch(this.page, this.searchBar, this.exportAll);
    }
  }
  open(content , group) {
    
    this.groups = group
    this.modalService.open(content).result.then((result) => {
        this.closeResult = `Closed with: ${result}`;
        
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
  });
}

// This function is used in open
private getDismissReason(reason: any): string {
  if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
  } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
  } else {
      return `with: ${reason}`;
  }
}
}
