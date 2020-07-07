import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { ErrorHandlerService } from './error-handler.service';
import { HttpClient } from '@angular/common/http';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ManufactureService {


  baseUrl: string;

  constructor(    
    private baseService: BaseService,
    private errorHandler: ErrorHandlerService,
    private http: HttpClient
  ) {
    this.baseUrl = this.baseService.baseUrl;

  }
  addBrand(data) {
    return this.http.post(this.baseUrl + 'admin/manufacturer', data).pipe(
      retry(3),
      catchError(this.errorHandler.handleError)
    );
  }
  updateBrand(data)
  {
    return this.http.post(this.baseUrl + 'admin/manufacturer', data).pipe(
      retry(3),
      catchError(this.errorHandler.handleError)
    );
  }
  getAllBrands(page) {
    debugger
    const params = { page: page }
    return this.http.get(this.baseUrl + 'admin/manufacturer',
      { params: params }).pipe(
        retry(3),
        catchError(this.errorHandler.handleError)
      );
  }
  getCountry()
  {
    return this.http.get(this.baseUrl + 'admin/getCountry')
      .pipe(
        retry(3),
        catchError(this.errorHandler.handleError)
      );
    
  }
  getAllBrandsSearch(page?, searchKey?, exportAll?, countryId?) {
    debugger
    const params = { page: page, searchKey: searchKey , exportAll: exportAll ,countryId: countryId}
    return this.http.get(this.baseUrl + 'admin/manufacturer',
      { params: params }).pipe(
        retry(3),
        catchError(this.errorHandler.handleError)
      );
  }
  getBranddetails(id) {
    return this.http.get(this.baseUrl + 'admin/manufacturer/detail/' + id)
      .pipe(
        retry(3),
        catchError(this.errorHandler.handleError)
      );
  }

  deleteBrand(id) {
    return this.http.delete(this.baseUrl + 'admin/manufacturer/' + id)
      .pipe(
        retry(3),
        catchError(this.errorHandler.handleError)
      );
  }

  updateBrandStatus(statusData: {id: Number; adminStatus: Number }){
    
    return this.http.put(this.baseUrl + 'admin/manufacturer', statusData)
      .pipe(
        retry(3),
        catchError(this.errorHandler.handleError)
      );
  }}
