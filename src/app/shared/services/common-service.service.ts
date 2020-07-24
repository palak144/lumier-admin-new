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
  getparentCategory(languageId)
  {
    const params = { languageId: languageId }
    return this.http.get(this.baseUrl + 'admin/parentCategoryList' , { params: params })
      .pipe(
        retry(3),
        catchError(this.errorHandler.handleError)
      );
    
  }
  getCategory(languageId)
  {
    const params = { languageId: languageId }
    return this.http.get(this.baseUrl + 'admin/categoryList' ,{ params: params })
    .pipe(
      retry(3),
      catchError(this.errorHandler.handleError)
    );
  }
 
  getSupplyType(country){
    
    const params = { countryId: country }
    return this.http.get(this.baseUrl + 'admin/supplyTypeList',
      { params: params }).pipe(
        retry(3),
        catchError(this.errorHandler.handleError)
      );
  }
  getAllCountries()
  {
    return this.http.get(this.baseUrl + 'web/countries')
      .pipe(
        retry(3),
        catchError(this.errorHandler.handleError)
      );
    
  }
  getLanguage() {
    
    return this.http.get(this.baseUrl + 'admin/language').pipe(
      retry(3),
      catchError(this.errorHandler.handleError)
    );
  }
  getCountryLanguage(country) {
    return this.http.get(this.baseUrl + 'admin/getCountryLanguage/' + country ).pipe(
      retry(3),
      catchError(this.errorHandler.handleError)
    );
  }
  getCurrency() {
    
    return this.http.get(this.baseUrl + 'admin/currency').pipe(
      retry(3),
      catchError(this.errorHandler.handleError)
    );
  }
}
