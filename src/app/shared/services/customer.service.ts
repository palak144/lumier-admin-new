import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { ErrorHandlerService } from './error-handler.service';
import { retry, catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  baseUrl:string;
  constructor(
    private baseService:BaseService,
    private errorHandler:ErrorHandlerService,
    private http: HttpClient
  ) {
    this.baseUrl = this.baseService.baseUrl;

  }



  addCustomer(data){

    return this.http.post(this.baseUrl + 'admin/customer',
    {  data}).pipe(
       retry(3),
       catchError(this.errorHandler.handleError)
    )
  }


  getAllCustomers(page, searchKey?) {
    const params = { page: page, searchKey: searchKey }
    return this.http.get(this.baseUrl + 'admin/customer',
      { params: params }).pipe(
        retry(3),
        catchError(this.errorHandler.handleError)
      );
  }

  getCustomerGroup() {
    return this.http.get(this.baseUrl + 'admin/customerGroup').pipe(
        retry(3),
        catchError(this.errorHandler.handleError)
      );
  }

  getCustomerGroupParams(page?, searchKey?) {
    const params = { page: page, searchKey: searchKey }
    return this.http.get(this.baseUrl + 'admin/customerGroup',
      { params: params }).pipe(
        retry(3),
        catchError(this.errorHandler.handleError)
      );
  }

  deleteCustomer(id) {
    return this.http.delete(this.baseUrl + 'admin/customer/' +id)
   .pipe(
      retry(3),
      catchError(this.errorHandler.handleError)
    );
  }

}

