import { Injectable } from '@angular/core';
import { BaseService } from '../base.service';
import { ErrorHandlerService } from '../error-handler.service';
import { retry, catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  baseUrl: string;

  constructor(
    private baseService: BaseService,
    private errorHandler: ErrorHandlerService,
    private http: HttpClient
  ) {
    this.baseUrl = this.baseService.baseUrl;
   }
   addCategory(data) {
    return this.http.post(this.baseUrl + 'admin/category', data).pipe(
      retry(3),
      catchError(this.errorHandler.handleError)
    );
  }
  updateCategory(data)
  {
    return this.http.post(this.baseUrl + 'admin/category', data).pipe(
      retry(3),
      catchError(this.errorHandler.handleError)
    );
  }

  getAllCategories(page) 
  {
    debugger
    const params = { page: page }
    return this.http.get(this.baseUrl + 'admin/category',
      { params: params }).pipe(
        retry(3),
        catchError(this.errorHandler.handleError)
      );
  }

  getCategory() 
  {
    return this.http.get(this.baseUrl + 'admin/category')
      .pipe(
        retry(3),
        catchError(this.errorHandler.handleError)
      );
  }

  getAllCategoriesSearch(page?, searchKey?, exportAll?) 
  {
    const params = { page: page, searchKey: searchKey , exportAll: exportAll }
    return this.http.get(this.baseUrl + 'admin/category')
    .pipe(
      retry(3),
      catchError(this.errorHandler.handleError)
    );
}
deleteCategory(id) {
  return this.http.delete(this.baseUrl + 'admin/category/' + id)
  .pipe(
    retry(3),
    catchError(this.errorHandler.handleError)
  );
} 
updateCategoryStatus(statusData: {id: Number; adminStatus: Number }){
  return this.http.put(this.baseUrl + 'admin/category', statusData)
  .pipe(
    retry(3),
    catchError(this.errorHandler.handleError)
  );
}
}
 