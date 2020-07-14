import { Injectable } from '@angular/core';
import { ErrorHandlerService } from './error-handler.service';
import { HttpClient } from '@angular/common/http';
import { BaseService } from './base.service';
import { retry, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl: string;
  constructor(
    private errorHandler: ErrorHandlerService,
    private http: HttpClient,
    private baseSevice: BaseService,
    private router: Router
  ) {
    this.baseUrl = this.baseSevice.baseUrl;
  }

  login(data) {
    return this.http
      .post(this.baseUrl + 'admin/login', data, { observe: 'response' })
      .pipe(
        retry(3),
        catchError(this.errorHandler.handleError)
      );
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigateByUrl('/auth/login');
  }

  recoverPassword(data) {
    return this.http.post(this.baseUrl + 'requestForPassword', data).pipe(
      retry(3),
      catchError(this.errorHandler.handleError)
    );
  }

  resetPassword(data, verificationLink) {
    return this.http
      .post(this.baseUrl + 'verify/' + verificationLink, data)
      .pipe(
        retry(3),
        catchError(this.errorHandler.handleError)
      );
  }
  changePassword(data) {
    return this.http.post(this.baseUrl + 'admin/changePassword', data).pipe(
      retry(3),
      catchError(this.errorHandler.handleError)
    );
  }
}
