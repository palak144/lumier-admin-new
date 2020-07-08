import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { ErrorHandlerService } from './error-handler.service';
import { retry, catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SystemSettingsService {
  baseUrl: string;

  constructor(    
    private baseService: BaseService,
    private errorHandler: ErrorHandlerService,
    private http: HttpClient
  ) {
    this.baseUrl = this.baseService.baseUrl;

  }
  getAllSupplyType(page) {
    const params = { page: page }
    return this.http.get(this.baseUrl + 'admin/supplyType',
      { params: params }).pipe(
        retry(3),
        catchError(this.errorHandler.handleError)
      );
  }
}
