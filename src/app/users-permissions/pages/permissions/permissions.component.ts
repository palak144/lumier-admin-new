import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Table } from 'primeng/table';
import { Subject } from 'rxjs';
import { UsersPermissionsService } from 'app/shared/services/users-permissions.service';
import { UtilityService } from 'app/shared/utility/utility.service';
import { ExcelServiceService } from 'app/shared/services/excel-service.service';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationService, LazyLoadEvent } from 'primeng/api';
import { takeUntil, startWith, debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { NgbModal, ModalDismissReasons, NgbAccordionConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-permissions',
  templateUrl: './permissions.component.html',
  styleUrls: ['./permissions.component.scss'],
  providers: [NgbAccordionConfig]
})
export class PermissionsComponent implements OnInit {

  
  perGroupList:any[];
  totalCount: number;
  page: number = 0;
  searchKey: string;
  searchValue: string;
  action:string;
  Date = new Date();
  closeResult: string;

  @ViewChild(Table) tableComponent: Table;
  @ViewChild(Table) primeNGTable: Table;

   // Real time search
   searchTerms$ = new Subject<string>();
   searchBar: any;
   private _unsubscribe = new Subject<boolean>();
  countries: any;
  permissions: any;

  constructor(
    private router: Router, 
    private route : ActivatedRoute,
    private usersPermissionsService: UsersPermissionsService,
    private utilityService: UtilityService,
    private excelService:ExcelServiceService,
    private toastr: ToastrService,
    private modalService: NgbModal,
    private config: NgbAccordionConfig,
    private confirmationService: ConfirmationService
    ) {
      config.closeOthers = true;
    config.type = 'info';
    }

  ngOnInit() {
    
    this.initiateSearch();
  }


  initiateSearch() {
    this.searchTerms$.pipe(
      takeUntil(this._unsubscribe),
      startWith(''),
      // wait 300ms after each keystroke before considering the term
      distinctUntilChanged(),
      // switch to new search observable each time the term changes
      
      switchMap((term: string) => this.usersPermissionsService.getPerGroupParams(this.page, term
      ))
    ).subscribe((success: any) => {
      
      this.perGroupList = success.data.results;
      this.countries = success.data.results.countries
      this.totalCount = success.data.total;
      this.utilityService.resetPage();
    }, error => {
      this.utilityService.routingAccordingToError(error);
    })
  }


  getAllUsers(page) {
    this.usersPermissionsService.getPerGroup(page).subscribe(
      (success: any) => {
        
        this.perGroupList = success.data.results;
        this.totalCount = success.data.total;
      },
      error => {
        this.utilityService.routingAccordingToError(error);
        this.utilityService.resetPage();
      }
    );
  }

  getAllUsersSearch(page, searchBar) {
    this.usersPermissionsService.getPerGroupParams(page, searchBar)
      .pipe(
        takeUntil(this._unsubscribe)
      )
      .subscribe((success: any) => {
        
        this.perGroupList = success.data.results;
        this.totalCount = success.data.total;
        this.utilityService.resetPage();
        
      }, error => {
        
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
      this.getAllUsers(this.page);
      this.utilityService.loaderStop();

    } else {
      this.getAllUsersSearch(this.page, this.searchBar);
      this.utilityService.loaderStop();

    }
  }


  onAddPerGroup(){
    
    this.router.navigate(['../newPermission'],{relativeTo : this.route})
  }

  getDropDownValue(event, id) {
    if(event.currentTarget.firstChild.data === 'Delete') {

      this.confirmationService.confirm({
        message: 'Are you sure that you want to perform this action?',
        accept: () => {
          this.usersPermissionsService.deletePerGroup(id).pipe(takeUntil(this._unsubscribe)).subscribe(
            (success: any) => {
              
              this.getAllUsers(this.page);
              // this.initiateSearch();
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
    if(event.currentTarget.firstChild.data === 'Edit'){
      
          this.router.navigate(['../','editPermission',id], {relativeTo: this.route})
          
    }
  }

  exportAsXLSX():void {
    this.excelService.exportAsExcelFile(this.perGroupList, 'Customer Group List');
  }
  open(content , permission) {
    
    this.permissions = permission
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
