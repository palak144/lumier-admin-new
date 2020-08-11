import { Injectable } from '@angular/core';
import { BaseService } from '../base.service';
import { ErrorHandlerService } from '../error-handler.service';
import { retry, catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  baseUrl: string;

  constructor(
    private baseService: BaseService,
    private errorHandler: ErrorHandlerService,
    private http: HttpClient
  ) {
    this.baseUrl = this.baseService.baseUrl;
   }
   getAllproductSearch(page?, searchKey?, exportAll?, countryId?) 
  {
    debugger
    const params = { page: page, searchKey: searchKey , exportAll: exportAll ,countryId: countryId}
    return this.http.get(this.baseUrl + 'admin/product',
      { params: params }).pipe(
        retry(3),
        catchError(this.errorHandler.handleError)
      );
}
deleteProduct(id) {
  return this.http.delete(this.baseUrl + 'admin/product/' + id)
  .pipe(
    retry(3),
    catchError(this.errorHandler.handleError)
  );
} 
getAllproduct(page) 
{
  
  const params = { page: page }
  return this.http.get(this.baseUrl + 'admin/product',
    { params: params }).pipe(
      retry(3),
      catchError(this.errorHandler.handleError)
    );
}
}
