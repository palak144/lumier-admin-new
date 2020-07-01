import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { ErrorHandlerService } from './error-handler.service';
import { retry, catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class SellerService {

  baseUrl: string;

  constructor(    
    private baseService: BaseService,
    private errorHandler: ErrorHandlerService,
    private http: HttpClient
  ) {
    this.baseUrl = this.baseService.baseUrl;

  }

  getAllSellers(page) {
    const params = { page: page }
    return this.http.get(this.baseUrl + 'admin/seller',
      { params: params }).pipe(
        retry(3),
        catchError(this.errorHandler.handleError)
      );
  }
 
  getAllSellersSearch(page?, searchKey?) {
    const params = { page: page, searchKey: searchKey }
    return this.http.get(this.baseUrl + 'admin/seller',
      { params: params }).pipe(
        retry(3),
        catchError(this.errorHandler.handleError)
      );
  }

  deleteSeller(id) {
    return this.http.delete(this.baseUrl + 'admin/seller/' + id)
      .pipe(
        retry(3),
        catchError(this.errorHandler.handleError)
      );
  }

  updateSellerStatus(statusData: {id: Number; adminStatus: Number }){
    
    return this.http.put(this.baseUrl + 'admin/seller', statusData)
      .pipe(
        retry(3),
        catchError(this.errorHandler.handleError)
      );
  }
}