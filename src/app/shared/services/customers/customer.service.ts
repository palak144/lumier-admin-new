import { Injectable } from '@angular/core';
import { BaseService } from '../base.service';
import { ErrorHandlerService } from '../error-handler.service';
import { retry, catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  baseUrl: string;

  constructor(
    private baseService: BaseService,
    private errorHandler: ErrorHandlerService,
    private http: HttpClient
  ) {
    this.baseUrl = this.baseService.baseUrl;

  }

  addCustomer(data) {
    return this.http.post(this.baseUrl + 'admin/customer', data).pipe(
      
      catchError(this.errorHandler.handleError)
    );
  }

  addCustomerGroup(data) {
    
    return this.http.post(this.baseUrl + 'admin/customerGroup', data).pipe(
      
      catchError(this.errorHandler.handleError)
    );
  }

  updateCustomer(data) {
    
    return this.http.put(this.baseUrl + 'admin/customer', data).pipe(
      
      catchError(this.errorHandler.handleError)
    );
  }c

  getAllCustomers(page) {
    const params = { page: page }
    return this.http.get(this.baseUrl + 'admin/customer',
      { params: params }).pipe(
        
        catchError(this.errorHandler.handleError)
      );
  } 
 
  getAllCustomersSearch(page?, searchKey? , exportAll?) {
    
    const params = { page: page, searchKey: searchKey, exportAll: exportAll }
    return this.http.get(this.baseUrl + 'admin/customer',
      { params: params }).pipe(
        
        catchError(this.errorHandler.handleError)
      );
  } 
  getCustomerId(id) {
    
    return this.http.get(this.baseUrl + 'admin/getCustomerDetail/' + id).pipe(
      
      catchError(this.errorHandler.handleError)
    );
  }
  getCustomerGroupId(id) {
    
    return this.http.get(this.baseUrl + 'admin/getCustomerGroupDetail/' + id).pipe(
      
      catchError(this.errorHandler.handleError)
    );
  }

  getCustomerGroup(page) {
    const params = { page: page }
    return this.http.get(this.baseUrl + 'admin/customerGroup' ,  
    { params: params }).pipe(
        
        catchError(this.errorHandler.handleError)
      );
  }

  getCustomerGroupParams(page?, searchKey?, exportAll?) {
    const params = { page: page, searchKey: searchKey, exportAll:exportAll }
    return this.http.get(this.baseUrl + 'admin/customerGroup',
      { params: params }).pipe(
        
        catchError(this.errorHandler.handleError)
      );
  }

  deleteCustomer(id) {
    debugger
    return this.http.delete(this.baseUrl + 'admin/customer/' + id)
      .pipe(
        
        catchError(this.errorHandler.handleError)
      );
  }
  deleteCustomerGroup(id) {	
    return this.http.delete(this.baseUrl + 'admin/deleteGroup/' +id)	
    .pipe(	
       	
       catchError(this.errorHandler.handleError)	
     );	
  }
  getAssignGroup() {
    
    return this.http.get(this.baseUrl + 'admin/getCustomerGroup')
      .pipe(
        
        catchError(this.errorHandler.handleError)
      );
  }
  updateCustomerStatus(statusData: { customerId: Number; adminStatus: Number }){
    
    return this.http.put(this.baseUrl + 'admin/customerStatus', statusData)
      .pipe(
        
        catchError(this.errorHandler.handleError)
      );
  }
}


