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
getAllproductSearch(page?, searchKey?, exportAll?, countryId?, sellerId?, categoryId?) 
  {
    const params = { page: page, searchKey: searchKey , exportAll: exportAll ,countryId: countryId,sellerId: sellerId, categoryId: categoryId }
    console.log(params);
    return this.http.get(this.baseUrl + 'admin/product',
      { params: params }).pipe(
        
        catchError(this.errorHandler.handleError)
      );
}
getvariantDetails(id)
{
  return this.http.get(this.baseUrl + 'admin/productVariant/' + id)
  .pipe(
    
    catchError(this.errorHandler.handleError)
  );
}
updateVariant(data){
  return this.http.put(this.baseUrl + 'admin/productVariant', data).pipe(
    
    catchError(this.errorHandler.handleError)
  );
}
deletevariant(id) {
  return this.http.delete(this.baseUrl + 'admin/productVariant/' + id)
  .pipe(
    
    catchError(this.errorHandler.handleError)
  );
} 
updateproductStatus(statusData: {id: Number; adminStatus: Number }){
  return this.http.put(this.baseUrl + 'admin/product', statusData)
  .pipe(
    
    catchError(this.errorHandler.handleError)
  );
}
deleteProduct(id) {
  return this.http.delete(this.baseUrl + 'admin/product/' + id)
  .pipe(
    
    catchError(this.errorHandler.handleError)
  );
} 
getAllproduct(page) 
{
  
  const params = { page: page }
  return this.http.get(this.baseUrl + 'admin/product',
    { params: params }).pipe(
      
      catchError(this.errorHandler.handleError)
    );
}
}
