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

   // get all categories
   getAllCustomers(page) {

    const params = { page: page }
    return this.http.get(this.baseUrl + 'admin/customer',
      { params: params }).pipe(
        retry(3),
        catchError(this.errorHandler.handleError)
      );
  }
<<<<<<< HEAD
  addCustomer(data){
    debugger
    return this.http.post(this.baseUrl + 'admin/customer',
    {  data}).pipe(
       retry(3),
       catchError(this.errorHandler.handleError)
    )
  }

}
=======
  
  getAllCustomers(page, searchKey?) {
    const params = { page: page, searchKey: searchKey }
    return this.http.get(this.baseUrl + 'admin/customer',
      { params: params }).pipe(
        retry(3),
        catchError(this.errorHandler.handleError)
      );
  }

}

   
>>>>>>> d55323642e8eee6ba2b3d7b53b78e604e8c0a335
