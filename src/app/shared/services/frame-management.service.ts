import { Injectable } from '@angular/core';
import { ErrorHandlerService } from './error-handler.service';
import { BaseService } from './base.service';
import { retry, catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FrameManagementService {
  baseUrl: string;
  constructor(
    private errorHandler: ErrorHandlerService,
    private http: HttpClient,
    private baseSevice: BaseService
  ) {
    this.baseUrl = this.baseSevice.baseUrl;
  }

  // --------------------------------------------- COLORS ---------------------------------------------

  getColorsList() {
    return this.http.get(this.baseUrl + 'fetchCategories').pipe(
      retry(3),
      catchError(this.errorHandler.handleError)
    );
  }

  addUpdateColor(data) {
    return this.http.post(this.baseUrl + 'fetchCategories', data).pipe(
      retry(3),
      catchError(this.errorHandler.handleError)
    );
  }

  deleteColor(data) {
    return this.http.post(this.baseUrl + 'fetchCategories', data).pipe(
      retry(3),
      catchError(this.errorHandler.handleError)
    );
  }

  // --------------------------------------------- MAT ---------------------------------------------

  getMatList() {
    return this.http.get(this.baseUrl + 'fetchCategories').pipe(
      retry(3),
      catchError(this.errorHandler.handleError)
    );
  }

  addUpdateMat(data) {
    return this.http.post(this.baseUrl + 'fetchCategories', data).pipe(
      retry(3),
      catchError(this.errorHandler.handleError)
    );
  }

  deleteMat(data) {
    return this.http.post(this.baseUrl + 'fetchCategories', data).pipe(
      retry(3),
      catchError(this.errorHandler.handleError)
    );
  }

  // --------------------------------------------- FRAME STYLES ---------------------------------------------

  getFrameStylesList() {
    return this.http.get(this.baseUrl + 'fetchCategories').pipe(
      retry(3),
      catchError(this.errorHandler.handleError)
    );
  }

  addUpdateFrameStyle(data) {
    return this.http.post(this.baseUrl + 'fetchCategories', data).pipe(
      retry(3),
      catchError(this.errorHandler.handleError)
    );
  }

  deleteFrameStyle(data) {
    return this.http.post(this.baseUrl + 'fetchCategories', data).pipe(
      retry(3),
      catchError(this.errorHandler.handleError)
    );
  }

  // --------------------------------------------- ACRYLIC ---------------------------------------------
  getAcrylicList() {
    return this.http.get(this.baseUrl + 'fetchCategories').pipe(
      retry(3),
      catchError(this.errorHandler.handleError)
    );
  }

  // add/update acrylic
  addUpdateAcrylic(data) {
    return this.http.post(this.baseUrl + 'fetchCategories', data).pipe(
      retry(3),
      catchError(this.errorHandler.handleError)
    );
  }

  deleteAcrylic(data) {
    return this.http.post(this.baseUrl + 'fetchCategories', data).pipe(
      retry(3),
      catchError(this.errorHandler.handleError)
    );
  }
}
