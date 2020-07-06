import { Component, OnInit, ViewChild } from '@angular/core';
import { Table } from 'primeng/table';
import { Subject } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { UtilityService } from 'app/shared/utility/utility.service';
import { ExcelServiceService } from 'app/shared/services/excel-service.service';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationService, LazyLoadEvent } from 'primeng/api';
import { takeUntil, startWith, debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { UsersPermissionsService } from 'app/shared/services/users-permissions.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  userList:any[];
  totalCount: number;
  page: number = 0;
  searchKey: string;
  searchValue: string;
  action:string;
  Date = new Date();

  @ViewChild(Table) tableComponent: Table;
  @ViewChild(Table) primeNGTable: Table;

   // Real time search
   searchTerms$ = new Subject<string>();
   searchBar: any;
   private _unsubscribe = new Subject<boolean>();

  constructor(
    private router: Router, 
    private route : ActivatedRoute,
    private usersPermissionsService: UsersPermissionsService,
    private utilityService: UtilityService,
    private excelService:ExcelServiceService,
    private toastr: ToastrService,

    private confirmationService: ConfirmationService
    ) {}
    setStatus(id:Number,adminStatus:Number){

      let statusData = {id,adminStatus}   
   this.usersPermissionsService.updateUserStatus(statusData).subscribe(
     (success:any)=>
     {
     
     this.ngOnInit()
} )
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
      switchMap((term: string) => this.usersPermissionsService.getUsersParams(this.page, term
      ))
    ).subscribe((success: any) => {
      
      this.userList = success.data.results;

      this.totalCount = success.data.total;
      this.utilityService.resetPage();
    }, error => {
      this.utilityService.routingAccordingToError(error);
    })
  }


  getAllUsers(page) {
    this.usersPermissionsService.getUsersGroup(page).subscribe(
      (success: any) => {
        
        this.userList = success.data.results;
        this.totalCount = success.data.total;
      },
      error => {
        this.utilityService.routingAccordingToError(error);
        this.utilityService.resetPage();
      }
    );
  }

  getAllUsersSearch(page, searchBar) {
    this.usersPermissionsService.getUsersParams(page, searchBar)
      .pipe(
        takeUntil(this._unsubscribe)
      )
      .subscribe((success: any) => {
        
        this.userList = success.data.results;
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


  onAddUser(){
    
    this.router.navigate(['../new'],{relativeTo : this.route})
  }

  getDropDownValue(event, id) {
    
    if(event.currentTarget.firstChild.data === 'Delete') {

      
      this.confirmationService.confirm({
        message: 'Are you sure that you want to perform this action?',
        accept: () => {
          this.usersPermissionsService.deleteUser(id).pipe(takeUntil(this._unsubscribe)).subscribe(
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
      
          this.router.navigate(['../','edit',id], {relativeTo: this.route})
          
    }
  }

  exportAsXLSX():void {
    this.excelService.exportAsExcelFile(this.userList, 'Customer Group List');
  }
}
