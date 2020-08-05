import { Injectable } from '@angular/core';
import { BaseService } from '../base.service';
import { ErrorHandlerService } from '../error-handler.service';
import { HttpClient } from '@angular/common/http';
import { retry, catchError } from 'rxjs/operators';
 
@Injectable({
  providedIn: 'root'
})
export class TaxService {

  baseUrl: string;

  constructor(
    private baseService: BaseService,
    private errorHandler: ErrorHandlerService,
    private http: HttpClient
  ) { 
    this.baseUrl = this.baseService.baseUrl;
  }

  addtax(data) {
    return this.http.post(this.baseUrl + 'admin/tax', data).pipe(
      retry(3),
      catchError(this.errorHandler.handleError)
    );
  }

  updateTaxStatus(statusData: {id: Number; adminStatus: Number }){
    return this.http.put(this.baseUrl + 'admin/tax', statusData)
    .pipe(
      retry(3),
      catchError(this.errorHandler.handleError)
    );
  }

  getAllTaxSearch(page?, searchKey?, countryId?) {
    const params = { page: page, searchKey: searchKey ,countryId: countryId }
    return this.http.get(this.baseUrl + 'admin/tax', { params: params })
    .pipe(
      retry(3),
      catchError(this.errorHandler.handleError)
    );
  } 

  getAllTax(page) {
    const params = { page: page }
    return this.http.get(this.baseUrl + 'admin/tax',
      { params: params }).pipe(
        retry(3),
        catchError(this.errorHandler.handleError)
      );
  }

  deleteTax(id){ 
    return this.http.delete(this.baseUrl + 'admin/tax/' + id)
    .pipe(
      retry(3),
      catchError(this.errorHandler.handleError)
    );
  }

  getAllTaxdetails(id) { 
    
    return this.http.get(this.baseUrl + 'admin/tax/' + id)
      .pipe(
        retry(3),
        catchError(this.errorHandler.handleError)
      );
  }

  updateTax(data)
  {
    return this.http.post(this.baseUrl + 'admin/tax', data).pipe(
      retry(3),
      catchError(this.errorHandler.handleError)
    );
  }


}
