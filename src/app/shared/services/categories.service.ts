import { Injectable } from '@angular/core';
import { ErrorHandlerService } from './error-handler.service';
import { map } from 'rxjs/operators';
import { BaseService } from './base.service';
import { HttpClient } from '@angular/common/http';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  baseUrl: string;
  constructor(
    private errorHandler: ErrorHandlerService,
    private http: HttpClient,
    private baseSevice: BaseService
  ) {
    this.baseUrl = this.baseSevice.baseUrl;
  }

  // get all categories
  getAllCategories(page) {

    const params = { page: page }
    return this.http.get(this.baseUrl + 'categories',
      { params: params }).pipe(
        retry(3),
        catchError(this.errorHandler.handleError)
      );
  }

  getAllCategoriesSearch(page, searchKey) {
    const params = { page: page, searchKey: searchKey }
    return this.http.get(this.baseUrl + 'categories',
      { params: params }).pipe(
        retry(3),
        catchError(this.errorHandler.handleError)
      );
  }
  
  // update category
  updateCategory(data, categoryId) {
    return this.http.put(this.baseUrl + 'category/' + categoryId, data).pipe(
      retry(3),
      catchError(this.errorHandler.handleError)
    );
  }

  createCategory(data) {
    return this.http.post(this.baseUrl + 'category', data).pipe(
      retry(3),
      catchError(this.errorHandler.handleError)
    );
  }

  updateStatus(data) {
    return this.http.put(this.baseUrl + 'categoryStatus/', data).pipe(
      retry(3),
      catchError(this.errorHandler.handleError)
    );
  }

  importCsv(file) {
    const d = new FormData();
    d.append('category_file', file);
    return this.http.post(this.baseUrl + 'import-category/', d).pipe(
        retry(3),
        catchError(this.errorHandler.handleError)
    );
  }

}
