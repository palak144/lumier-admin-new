import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { ErrorHandlerService } from './error-handler.service';
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

  addBanner(data) {
    return this.http.post(this.baseUrl + 'admin/returnReason', data).pipe(
      retry(3),
      catchError(this.errorHandler.handleError)
    );
  }
}



