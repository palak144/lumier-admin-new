import { Injectable } from '@angular/core';
import { BaseService } from '../base.service';
import { ErrorHandlerService } from '../error-handler.service';
import { HttpClient } from '@angular/common/http';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ReturnReasonService {

  baseUrl: string;

  constructor(
    private baseService: BaseService,
    private errorHandler: ErrorHandlerService,
    private http: HttpClient
  ) { 
    this.baseUrl = this.baseService.baseUrl;
  }

  addReturn(data) {
    return this.http.post(this.baseUrl + 'admin/returnReason', data).pipe(
      
      catchError(this.errorHandler.handleError)
    );
  }

  updateReturnStatus(statusData: {id: Number; adminStatus: Number }){
    return this.http.put(this.baseUrl + 'admin/returnReason', statusData)
    .pipe(
      
      catchError(this.errorHandler.handleError)
    );
  }

  getAllReturnSearch(page?, searchKey?) {
    const params = { page: page, searchKey: searchKey  }
    return this.http.get(this.baseUrl + 'admin/returnReason', { params: params })
    .pipe(
      
      catchError(this.errorHandler.handleError)
    );
  } 

  getAllReturn(page) {
    const params = { page: page }
    return this.http.get(this.baseUrl + 'admin/returnReason',
      { params: params }).pipe(
        
        catchError(this.errorHandler.handleError)
      );
  }

  deleteReturn(id){ 
    return this.http.delete(this.baseUrl + 'admin/returnReason/' + id)
    .pipe(
      
      catchError(this.errorHandler.handleError)
    );
  }
}
