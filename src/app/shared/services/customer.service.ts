import { Injectable } from '@angular/core';
import { ErrorHandlerService } from './error-handler.service';
import { HttpClient } from '@angular/common/http';
import { BaseService } from './base.service';
import { retry, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  baseUrl: string;
  constructor(
      private errorHandler: ErrorHandlerService,
      private http: HttpClient,
      private baseSevice: BaseService,
      private router: Router
  ) {
      this.baseUrl = this.baseSevice.baseUrl;
  }

  // get all stats
  addCustomer() {
      return this.http.get(this.baseUrl + 'customer').pipe(
          retry(3),
          catchError(this.errorHandler.handleError)
      );
  }}
