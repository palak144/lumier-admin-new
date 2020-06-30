import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { ErrorHandlerService } from './error-handler.service';
import { HttpClient } from '@angular/common/http';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsersPermissionsService {


  baseUrl: string;

  constructor(
    private baseService: BaseService,
    private errorHandler: ErrorHandlerService,
    private http: HttpClient
  ) {
    this.baseUrl = this.baseService.baseUrl;

  }

  getPermissionGroupList(){
    return this.http.get(this.baseUrl +'admin/permissionGroupList').pipe(
      retry(3),
      catchError(this.errorHandler.handleError)
    );
  }
  getCountryList(){
    return this.http.get(this.baseUrl +'admin/country').pipe(
      retry(3),
      catchError(this.errorHandler.handleError)
    )
  }
  getMenuList(){
    return this.http.get(this.baseUrl +'admin/getMenu').pipe(
      retry(3),
      catchError(this.errorHandler.handleError)
    );
  }
  addUser(data) {
    
    return this.http.post(this.baseUrl + 'admin/employee', data).pipe(
      retry(3),
      catchError(this.errorHandler.handleError)
    );
  }
  
  addPermissionGroup(data) {
    
    return this.http.post(this.baseUrl + 'admin/permissionGroup', data).pipe(
      retry(3),
      catchError(this.errorHandler.handleError)
    );
  }
  getUsersParams(page?, searchKey?) {
    const params = { page: page, searchKey: searchKey }
    return this.http.get(this.baseUrl + 'admin/employee',
      { params: params }).pipe(
        retry(3),
        catchError(this.errorHandler.handleError)
      );
  }
  getPerGroupParams(page?, searchKey?) {
    
    const params = { page: page, searchKey: searchKey }
    return this.http.get(this.baseUrl + 'admin/permissionGroup',
      { params: params }).pipe(
        retry(3),
        catchError(this.errorHandler.handleError)
      );
  }

  getPerGroup(page){
    const params = { page: page }
    return this.http.get(this.baseUrl + 'admin/permissionGroup',
      { params: params }).pipe(
        retry(3),
        catchError(this.errorHandler.handleError)
      );
  }
  
  updateUserStatus(statusData: { id: Number; adminStatus: Number }){
    debugger
    return this.http.put(this.baseUrl + 'admin/employee', statusData)
      .pipe(
        retry(3),
        catchError(this.errorHandler.handleError)
      );
  }
  //
  updateCustomer(data) {
    
    return this.http.put(this.baseUrl + 'admin/customer', data).pipe(
      retry(3),
      catchError(this.errorHandler.handleError)
    );
  }

 
  getUserId(id) {
    debugger
    return this.http.get(this.baseUrl + 'admin/employee/' + id).pipe(
      retry(3),
      catchError(this.errorHandler.handleError)
    );
  }
  getPerGroupId(id){
    debugger
    return this.http.get(this.baseUrl + 'admin/permissionGroup/' + id).pipe(
      retry(3),
      catchError(this.errorHandler.handleError)
    );
  }
  

  getUsersGroup(page) {
    const params = { page: page }
    return this.http.get(this.baseUrl + 'admin/employee' ,  
    { params: params }).pipe(
        retry(3),
        catchError(this.errorHandler.handleError)
      );
  }

  deleteUser(id) {	
    debugger
    return this.http.delete(this.baseUrl + 'admin/employee/' +id)	
    .pipe(	
       retry(3),	
       catchError(this.errorHandler.handleError)	
     );	
  }

  deletePerGroup(id) {	
    debugger
    return this.http.delete(this.baseUrl + 'admin/permissionGroup/' +id)	
    .pipe(	
       retry(3),	
       catchError(this.errorHandler.handleError)	
     );	
  }
 
}
