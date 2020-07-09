import { Injectable } from '@angular/core';
import { ErrorHandlerService } from './error-handler.service';
import { HttpClient } from '@angular/common/http';
import { BaseService } from './base.service';
import { Router } from '@angular/router';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CommonServiceService {

  baseUrl: string;
  constructor(
    private errorHandler: ErrorHandlerService,
    private http: HttpClient,
    private baseSevice: BaseService,
    private router: Router
  ) {
    this.baseUrl = this.baseSevice.baseUrl;
  }
  getCountry()
  {
    return this.http.get(this.baseUrl + 'admin/country')
      .pipe(
        retry(3),
        catchError(this.errorHandler.handleError)
      );
    
  }
  getSupplyType()
  {
  
    return this.http.get(this.baseUrl + 'admin/supplyTypeList')
      .pipe(
        retry(3),
        catchError(this.errorHandler.handleError)
      );
    
  }
}
