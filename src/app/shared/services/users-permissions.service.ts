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
      
      catchError(this.errorHandler.handleError)
    );
  }
  getMenuList(){
    return this.http.get(this.baseUrl +'admin/getMenu').pipe(
      
      catchError(this.errorHandler.handleError)
    );
  }
  addUser(data) {
    
    return this.http.post(this.baseUrl + 'admin/employee', data).pipe(
      
      catchError(this.errorHandler.handleError)
    );
  }
  
  addPermissionGroup(data) {
    
    return this.http.post(this.baseUrl + 'admin/permissionGroup', data).pipe(
      
      catchError(this.errorHandler.handleError)
    );
  }
  getUsersParams(page?, searchKey?) {
    const params = { page: page, searchKey: searchKey }
    return this.http.get(this.baseUrl + 'admin/employee',
      { params: params }).pipe(
        
        catchError(this.errorHandler.handleError)
      );
  }
  getPerGroupParams(page?, searchKey?) {
    
    const params = { page: page, searchKey: searchKey }
    return this.http.get(this.baseUrl + 'admin/permissionGroup',
      { params: params }).pipe(
        
        catchError(this.errorHandler.handleError)
      );
  }

  getPerGroup(page){
    const params = { page: page }
    return this.http.get(this.baseUrl + 'admin/permissionGroup',
      { params: params }).pipe(
        
        catchError(this.errorHandler.handleError)
      );
  }
  
  updateUserStatus(statusData: { id: Number; adminStatus: Number }){
    
    return this.http.put(this.baseUrl + 'admin/employee', statusData)
      .pipe(
        
        catchError(this.errorHandler.handleError)
      );
  }
  //
  updateCustomer(data) {
    
    return this.http.put(this.baseUrl + 'admin/customer', data).pipe(
      
      catchError(this.errorHandler.handleError)
    );
  }

 
  getUserId(id) {
    
    return this.http.get(this.baseUrl + 'admin/employee/' + id).pipe(
      
      catchError(this.errorHandler.handleError)
    );
  }
  getPerGroupId(id){
    
    return this.http.get(this.baseUrl + 'admin/permissionGroup/' + id).pipe(
      
      catchError(this.errorHandler.handleError)
    );
  }
  

  getUsersGroup(page) {
    const params = { page: page }
    return this.http.get(this.baseUrl + 'admin/employee' ,  
    { params: params }).pipe(
        
        catchError(this.errorHandler.handleError)
      );
  }

  deleteUser(id) {	
    
    return this.http.delete(this.baseUrl + 'admin/employee/' +id)	
    .pipe(	
       	
       catchError(this.errorHandler.handleError)	
     );	
  }

  deletePerGroup(id) {	
    
    return this.http.delete(this.baseUrl + 'admin/permissionGroup/' +id)	
    .pipe(	
       	
       catchError(this.errorHandler.handleError)	
     );	
  }
 
}
